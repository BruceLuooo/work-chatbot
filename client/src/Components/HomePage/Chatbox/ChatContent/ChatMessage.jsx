import ChatResponse from "./ChatResponse";
import "./ChatMessage.scoped.css";

function ChatMessage({ messageData, scrollMessageContainer, scrollToBottom }) {
  return (
    <div className="chat-message-container">
      <span className="message-header">You</span>
      <p className="user-message">{messageData.inputMessage}</p>
      <span className="message-header">{messageData.assistant}</span>
      <ChatResponse
        messageData={messageData}
        scrollMessageContainer={scrollMessageContainer}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
}

export default ChatMessage;
