import { SyntheticEvent, useState } from "react";
import { Button } from "../buttons/Button";
import { BaseModal } from "./BaseModal";
import { useRouter } from "next/router";
import Select from "react-select";
import { LANGUAGE_OPTIONS } from "@/constants/chatOptions";
import { Option } from "@/types/select";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function NewChatModal({ isOpen, onClose }: Props) {
  const [language, setLanguage] = useState<Option | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const user = useUser();
  const client = useSupabaseClient();

  const handleCreate = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    let { error } = await client
      .from("profiles")
      .update({ language: language!.value })
      .eq("id", user!.id);

    if (error) {
      alert("Something went wrong! Please check your console.");
      console.error(error);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    onClose();
    router.push("/chat");
  };

  return (
    <BaseModal
      title="Create new chat"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleCreate}
      buttons={
        <>
          <Button
            variant="primary"
            type="submit"
            disabled={!language || isSubmitting}
          >
            Create
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </>
      }
    >
      <div className="min-h-[200px]">
        <label className="flex items-center gap-8 text-md">
          Language
          <Select
            placeholder="Select language"
            options={LANGUAGE_OPTIONS}
            value={language}
            onChange={setLanguage}
          />
        </label>
      </div>
    </BaseModal>
  );
}

export { NewChatModal };
