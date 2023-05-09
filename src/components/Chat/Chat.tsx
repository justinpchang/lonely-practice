import { useEffect, useState } from "react";
import axios from "axios";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  MessageList,
  MessageInput,
  Message,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

export default function Chat() {
  const [messages, setMessages] = useState<
    { content: string; isFromUser: boolean }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Clear conversation history
    axios.delete("/api/chat");
  }, []);

  const sendMessage = async (message: string) => {
    setIsTyping(true);
    const newMessages = [...messages, { content: message, isFromUser: true }];
    setMessages(newMessages);
    const response = (
      await axios.post("/api/chat", {
        input: message,
      })
    ).data.text;
    setIsTyping(false);
    setMessages([...newMessages, { content: response, isFromUser: false }]);
  };

  return (
    <div className="position-relative h-full mt-3">
      <ChatContainer>
        <MessageList
          typingIndicator={
            isTyping && <TypingIndicator content="Partner is typing" />
          }
        >
          {messages.map((message, i) => (
            <Message
              key={i}
              model={{
                message: message.content,
                direction: message.isFromUser ? "outgoing" : "incoming",
                position: "single",
              }}
            />
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
