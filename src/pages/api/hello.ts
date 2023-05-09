import { Database } from "@/types/supabase";
import { ConversationLog } from "@/utils/conversationLog";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();
  const userId = user!.id;

  const log = new ConversationLog(userId);
  console.log(await log.getConversation({ limit: 10 }));

  res.status(200).json({ name: "John Doe" });
}
