import { SyntheticEvent, useState } from "react";
import { Button } from "../buttons/Button";
import { BaseModal } from "./BaseModal";
import { useRouter } from "next/router";
import Select from "react-select";
import { LANGUAGE_OPTIONS } from "@/constants/chatOptions";
import { Option } from "@/types/select";
import { getLanguageNameFromCode } from "@/utils/language";
import { useGetLanguage } from "@/hooks/useGetLanguage";
import { useSetLanguage } from "@/hooks/useSetLanguage";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function NewChatModal({ isOpen, onClose }: Props) {
  const [language, setLanguage] = useState<Option | null>(null);

  const router = useRouter();

  const { isLoading: isCurrentLanguageLoading } = useGetLanguage({
    onSuccess: (currentLanguage) =>
      setLanguage({
        value: currentLanguage,
        label: getLanguageNameFromCode(currentLanguage),
      }),
  });

  const { mutate, isLoading: isSubmitting } = useSetLanguage({
    onSuccess: () => {
      onClose();
      router.push("/chat");
    },
  });

  const handleCreate = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(language!.value);
  };

  return (
    <BaseModal
      title="Create new chat"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleCreate}
      buttons={
        <>
          <Button variant="primary" type="submit" disabled={!language}>
            Create
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </>
      }
    >
      <div className="min-h-[200px]">
        {isCurrentLanguageLoading ? (
          <p>Loading...</p>
        ) : (
          <label className="flex items-center gap-8 text-md">
            Language
            <Select
              placeholder="Select language"
              options={LANGUAGE_OPTIONS}
              value={language}
              onChange={setLanguage}
            />
          </label>
        )}
      </div>
    </BaseModal>
  );
}

export { NewChatModal };
