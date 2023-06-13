import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
const { Translate } = require("@google-cloud/translate").v2;

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

  const text = req.body.input as string;
  const source = req.body.language as string;

  // Use Google Translate API
  const translate = new Translate({ projectId: "lonely-practice" });
  const [translation] = await translate.translate(text, {
    from: source,
    to: "en",
  });

  res.status(200).json({ translation });
}
