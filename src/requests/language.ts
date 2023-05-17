import { supabase } from "@/utils/supabaseClient";

export const getLanguage = async (userId: string): Promise<string> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("language")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data?.language;
};

export const setLanguage = async (
  userId: string,
  language: string
): Promise<string> => {
  const { error } = await supabase
    .from("profiles")
    .update({ language })
    .eq("id", userId);

  if (error) throw error;

  return language;
};
