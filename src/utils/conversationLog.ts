import { supabase } from "./supabaseClient";

class ConversationLog {
  constructor(public userId: string) {
    this.userId = userId;
  }

  public async addMessage({
    speaker,
    content,
  }: {
    speaker: string;
    content: string;
  }) {
    const { error } = await supabase
      .from("conversations")
      .insert({ speaker, content, user_id: this.userId });
    if (error) {
      console.error(`Error adding message: ${error.toString()}`);
    }
  }

  public async getConversation({
    limit,
  }: {
    limit: number;
  }): Promise<string[]> {
    const { data, error } = await supabase
      .from("conversations")
      .select("speaker, content")
      .eq("user_id", this.userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error(`Error getting conversation: ${error.toString()}`);
      return [];
    }

    return data
      .map(({ speaker, content }) => `${speaker.toUpperCase()}: ${content}`)
      .reverse();
  }

  public async clearConversation() {
    const { error } = await supabase
      .from("conversations")
      .delete()
      .eq("user_id", this.userId);

    if (error) {
      console.error(`Error deleting conversation: ${error.toString()}`);
    }
  }
}

export { ConversationLog };
