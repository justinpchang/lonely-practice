import { Option } from "@/types/select";
import { getLanguageNameFromCode } from "@/utils/language";

const LANGUAGES = ["fr", "it"];

export const LANGUAGE_OPTIONS: Option[] = LANGUAGES.map((code) => ({
  value: code,
  label: getLanguageNameFromCode(code),
}));
