import { Sidebar } from "@/components/Sidebar";
import { Chat } from "@/components/Chat";

function ChatPage() {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="container">
        <Chat />
      </div>
    </div>
  );
}

export default ChatPage;
