import { useEffect, useState } from "react";
import axios from "axios";
import {
  ChatContainer,
  MessageList,
  MessageInput,
  Message,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

function Chat() {
  const [messages, setMessages] = useState<
    { content: string; isFromUser: boolean }[]
  >([]);
  const [corrections, setCorrections] = useState<{
    [original: string]: string;
  }>({});
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Clear conversation history
    axios.delete("/api/chat");
  }, []);

  const sendMessage = async (message: string) => {
    setIsTyping(true);
    const newMessages = [...messages, { content: message, isFromUser: true }];
    setMessages(newMessages);

    // Get correction async
    axios
      .post("/api/correction", { input: message })
      .then(({ data: { text } }) => {
        setCorrections({
          ...corrections,
          [message]: text,
        });
      });

    // Get response sync
    const response = (
      await axios.post("/api/chat", {
        input: message,
      })
    ).data.text;
    setIsTyping(false);
    setMessages([...newMessages, { content: response, isFromUser: false }]);
  };

  return (
    <div className="position-relative h-full">
      <ChatContainer>
        <MessageList
          typingIndicator={
            isTyping && <TypingIndicator content="Partner is typing" />
          }
        >
          {messages.map((message, i) => (
            <>
              <Message
                key={i}
                model={{
                  message: message.content,
                  direction: message.isFromUser ? "outgoing" : "incoming",
                  position: "single",
                }}
              />
              {message.isFromUser && corrections[message.content] && (
                <Message
                  key={`correction-${i}`}
                  className="correction"
                  model={{
                    message: `Correction: ${corrections[message.content]}`,
                    direction: "outgoing",
                    position: "last",
                  }}
                />
              )}
            </>
          ))}
        </MessageList>
        <MessageInput
          placeholder="Type message here"
          attachButton={false}
          onSend={(innerHtml, textContent) => sendMessage(textContent)}
        />
      </ChatContainer>
    </div>
  );
}

export { Chat };
