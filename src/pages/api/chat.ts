import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ConversationLog } from "@/utils/conversationLog";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { PROMPT_RESPONSE_TEMPLATE } from "@/utils/templates";
import { ConsoleCallbackHandler } from "langchain/callbacks";

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
  const userId = user!.id;

  // Retrieve the conversation log and save the user's prompt
  const prompt = req.body.input as string;
  const conversationLog = new ConversationLog(userId);
  const conversationHistory = await conversationLog.getConversation({
    limit: 10,
  });
  await conversationLog.addMessage({ speaker: "USER", content: prompt });

  // Generate a response
  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
    verbose: true,
    callbacks: [new ConsoleCallbackHandler()],
  });
  const promptTemplate = new PromptTemplate({
    template: PROMPT_RESPONSE_TEMPLATE,
    inputVariables: ["conversationHistory", "prompt"],
  });
  const chain = new LLMChain({
    llm,
    prompt: promptTemplate,
  });
  const response = await chain.call({
    conversationHistory,
    prompt,
  });

  // Add response to conversation log
  await conversationLog.addMessage({ speaker: "BOT", content: response.text });

  res.status(200).json(response);
}
