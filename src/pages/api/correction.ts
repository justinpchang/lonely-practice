import { MESSAGE_CORRECTION_TEMPLATE } from "@/constants/templates";
import { getLanguageNameFromCode } from "@/utils/language";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ConsoleCallbackHandler } from "langchain/callbacks";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get user info from session
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();
  // TODO: Reject unauthenticated requests

  const prompt = req.body.input as string;
  const language = getLanguageNameFromCode(req.body.language as string);

  // Get correction
  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
    verbose: true,
    callbacks: [new ConsoleCallbackHandler()],
  });
  const promptTemplate = new PromptTemplate({
    template: MESSAGE_CORRECTION_TEMPLATE,
    inputVariables: ["prompt", "language"],
  });
  const chain = new LLMChain({ llm, prompt: promptTemplate });
  const response = await chain.call({ prompt, language });

  res.status(200).json(response);
}
