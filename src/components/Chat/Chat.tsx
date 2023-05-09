import { SyntheticEvent, useRef, useState } from "react";
import axios from "axios";
import Message from "./Message";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { content: string; isFromUser: boolean }[]
  >([]);

  const messagesBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e: SyntheticEvent, message: string) => {
    e.preventDefault();
    setInputValue("");
    const newMessages = [...messages, { content: message, isFromUser: true }];
    setMessages(newMessages);
    scrollToBottom();
    const response = (
      await axios.post("/api/chat", {
        input: message,
      })
    ).data.text;
    setMessages([...newMessages, { content: response, isFromUser: false }]);
    scrollToBottom();
  };

  return (
    <div className="border border-slate-300 grow min-h-0 overflow-y-auto relative">
      <div className="divide-y divide-slate-300 mb-24 overflow-y-auto">
        {messages.map((message, i) => (
          <Message key={i} isFromUser={message.isFromUser}>
            {message.content}
          </Message>
        ))}
      </div>
      <div ref={messagesBottomRef} />
      <div className="fixed bottom-6 flex items-center w-full">
        <form
          onSubmit={(e) => sendMessage(e, inputValue)}
          className="w-[90vw] mx-auto flex justify-between p-3 m-3 bg-white border border-slate-200 rounded-md shadow-2xl"
        >
          <input
            className="grow focus:outline-none"
            type="text"
            placeholder="Send a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
