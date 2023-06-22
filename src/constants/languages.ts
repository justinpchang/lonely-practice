export const SUPPORTED_LANGUAGES = ["fr", "it", "es", "de"] as const;

export const END_SENTENCE_PUNCTUATION: {
  [language: string]: string[];
} = {
  fr: [".", "!", "?"],
  it: [".", "!", "?"],
  es: [".", "!", "?", "¿"],
  de: [".", "!", "?"],
};
