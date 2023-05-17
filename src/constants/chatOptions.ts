import { Option } from "@/types/select";
import { getLanguageNameFromCode } from "@/utils/language";
import { SUPPORTED_LANGUAGES } from "./languages";

export const LANGUAGE_OPTIONS: Option[] = SUPPORTED_LANGUAGES.map((code) => ({
  value: code,
  label: getLanguageNameFromCode(code),
}));
