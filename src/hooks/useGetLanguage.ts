import { getLanguage } from "@/requests/language";
import { useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "react-query";

export const GET_LANGUAGE_QUERY_KEY = ["getLanguage"];

export function useGetLanguage(options?: {
  onSuccess?: (language: string) => void;
}) {
  const user = useUser();

  return useQuery(
    [GET_LANGUAGE_QUERY_KEY, user!.id],
    () => getLanguage(user!.id),
    {
      enabled: !!user,
      ...options,
    }
  );
}
