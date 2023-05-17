import { Chat } from "@/components/Chat";
import { Highlighter } from "@/components/Highlighter";
import { Toolbox } from "@/components/Toolbox";
import { TOOLBOX_ANIMATION } from "@/constants/toolbox";
import { useGetLanguage } from "@/hooks/useGetLanguage";
import { getLanguageNameFromCode } from "@/utils/language";
import { useState } from "react";
import { Tool } from "react-feather";

function ChatPage() {
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);

  const { data: language } = useGetLanguage();

  return (
    <>
      <div
        className={`h-full max-h-screen flex flex-col ${
          isToolboxOpen ? `mr-80` : `mr-0`
        } ${TOOLBOX_ANIMATION}`}
      >
        <div className="flex justify-between">
          <p>Chatting in {getLanguageNameFromCode(language!)}...</p>
          {!isToolboxOpen && (
            <button
              className="m-2 py-2 px-2 bg-blue-200 hover:bg-blue-300 rounded"
              onClick={() => setIsToolboxOpen(!isToolboxOpen)}
            >
              <Tool />
            </button>
          )}
        </div>
        <Highlighter className="flex-1 overflow-scroll">
          <Chat />
        </Highlighter>
      </div>
      <Toolbox isOpen={isToolboxOpen} onClose={() => setIsToolboxOpen(false)} />
    </>
  );
}

export default ChatPage;
