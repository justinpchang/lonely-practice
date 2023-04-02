import { useEffect, useRef, useState } from "react";
import Message from "./Message";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { content: string; isFromUser: boolean }[]
  >([
    { content: "Hi, how are you?", isFromUser: true },
    { content: "I'm doing well, thanks for asking.", isFromUser: false },
    { content: "What have you been up to lately?", isFromUser: true },
    { content: "Not much, just working on some projects.", isFromUser: false },
    {
      content: "That sounds interesting. What kind of projects?",
      isFromUser: true,
    },
    {
      content: "Just some web development stuff. How about you?",
      isFromUser: false,
    },
    { content: "I'm studying computer science.", isFromUser: true },
    { content: "Oh cool, what are you learning right now?", isFromUser: false },
    {
      content: "I'm learning about algorithms and data structures.",
      isFromUser: true,
    },
    {
      content:
        "That's really interesting! I wish I had more experience with that.",
      isFromUser: false,
    },
  ]);

  const messagesBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

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
        <div className="w-[90vw] mx-auto flex justify-between p-3 m-3 bg-white border border-slate-200 rounded-md shadow-2xl">
          <input
            className="grow focus:outline-none"
            type="text"
            placeholder="Send a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={() => setInputValue("")}>Send</button>
        </div>
      </div>
    </div>
  );
}
