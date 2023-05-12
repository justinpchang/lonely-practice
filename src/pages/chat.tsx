import { Chat } from "@/components/Chat";
import { Toolbox } from "@/components/Toolbox";
import { TOOLBOX_ANIMATION, TOOLBOX_WIDTH } from "@/constants/toolbox";
import { useState } from "react";

function ChatPage() {
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);

  return (
    <>
      <div
        className={`h-full flex flex-col ${
          isToolboxOpen && `mr-[${TOOLBOX_WIDTH}]`
        } ${TOOLBOX_ANIMATION}`}
      >
        <div className="text-right">
          <button
            className="m-2 py-2 px-2 bg-blue-200 rounded"
            onClick={() => setIsToolboxOpen(!isToolboxOpen)}
          >
            {isToolboxOpen ? "Close" : "Open"} toolbox
          </button>
        </div>
        <div className="flex-1">
          <Chat />
        </div>
      </div>
      <Toolbox isOpen={isToolboxOpen} />
    </>
  );
}

export default ChatPage;
