import { supabase } from "./supabaseClient";

class ConversationLog {
  constructor(public profileId: string) {
    this.profileId = profileId;
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
      .insert({ speaker, content, profile_id: this.profileId });
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
      .eq("profile_id", this.profileId)
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
      .eq("profile_id", this.profileId);

    if (error) {
      console.error(`Error deleting conversation: ${error.toString()}`);
    }
  }
}

export { ConversationLog };
