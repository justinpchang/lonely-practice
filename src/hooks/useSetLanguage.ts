import { useUser } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "react-query";
import { GET_LANGUAGE_QUERY_KEY } from "./useGetLanguage";
import { setLanguage } from "@/requests/language";

export function useSetLanguage(options?: {
  onSuccess?: (language: string) => void;
}) {
  const user = useUser();
  const queryClient = useQueryClient();

  return useMutation((language: string) => setLanguage(user!.id, language), {
    onSuccess: (language: string) => {
      queryClient.setQueryData(GET_LANGUAGE_QUERY_KEY, language);
      options?.onSuccess && options.onSuccess(language);
    },
    onError: (error) => {
      alert("Something went wrong! Please check your console.");
      console.error(error);
    },
  });
}
