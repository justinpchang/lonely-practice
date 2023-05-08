import type { NextApiRequest, NextApiResponse } from "next";
import { ChatOpenAI } from "langchain/chat_models";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const chat = new ChatOpenAI({ temperature: 0.7 });
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "Pretend you are a friendly French conversation practice tutor. Only reply with French that a 5-year-old would understand."
    ),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);
  const chain = new ConversationChain({
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
    prompt: chatPrompt,
    llm: chat,
  });

  const response = await chain.call({
    input: req.query.input,
  });

  res.status(200).json(response);
}
