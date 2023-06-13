import axios from "axios";

export const getTranslation = async (
  input: string,
  language: string
): Promise<string> => {
  const response = await axios.post("/api/translate", { input, language });
  return response.data.translation;
};
