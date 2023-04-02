import { useEffect, useRef, useState } from "react";
import Message from "./Message";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");

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
        <Message isFromUser={true}>
          This is a test message from the user.
        </Message>
        <Message isFromUser={false}>
          This is a test message from the AI.
        </Message>
        <Message isFromUser={true}>
          This is a test message from the user.
        </Message>
        <Message isFromUser={false}>
          This is a test message from the AI.
          <br />
          Even a two line message.
          <br />
          Or a third.
        </Message>
        <Message isFromUser={true}>
          This is a test message from the user.
        </Message>
        <Message isFromUser={false}>
          This is a test message from the AI.
        </Message>
        <Message isFromUser={true}>
          This is a test message from the User.
          <br />
          Even a two line message.
          <br />
          Or a third.
        </Message>
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
