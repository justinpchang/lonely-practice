import { useState } from "react";
import Message from "./Message";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="border border-slate-300 flex flex-col grow min-h-0">
      <div className="divide-y divide-slate-300  overflow-y-auto">
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
      <div className="flex justify-between p-3 m-3 border border-slate-200 rounded-md shadow-md">
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
  );
}
