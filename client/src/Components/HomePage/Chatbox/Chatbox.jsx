import { useState, useRef } from "react";
import { useHeader } from "../../../Context/HeaderProvider.jsx";
import ChatMessage from "./ChatContent/ChatMessage.jsx";
import { mockAddToChatHistory } from "./mockFunctions.js";
import { useScrollToBottom } from "../../../Hooks/useScrollToBottom.jsx";
import { chatAPI } from "../../../api/chatAPI.js";

import "./Chatbox.scoped.css";

function Chatbox({ chatHistory, setChatHistory, isChatboxExpanded }) {
  const [inputPrompt, setInputPrompt] = useState("");
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const { selectedAssistantHeader } = useHeader();

  const { scrollToBottom } = useScrollToBottom(messagesEndRef, 200);

  const addToChatHistory = (e) => {
    e.preventDefault();
    const messageID = Math.floor(Date.now() / 100);

    setChatHistory((prevState) => {
      return [
        ...prevState,
        {
          messageID: messageID,
          inputMessage: inputPrompt,
          outputMessage: "",
          isOutputLoading: true,
          assistant: selectedAssistantHeader.name,
          files: [
            {
              fileName: "Cras-vehicula-semper.pdf",
              fileSize: "195.5 KB",
            },
            {
              fileName: "Maecenas-sollicitudin-orci-condimentum.pdf",
              fileSize: "2.2 MB",
            },
          ],
        },
      ];
    });

    chatAPI(inputPrompt).then(({ data }) => {
      setChatHistory((prevState) => {
        const messageIdx = prevState.findIndex((message) => {
          return message.messageID === messageID;
        });
        if (messageIdx !== -1) {
          let updatedState = [...prevState];
          updatedState[messageIdx].isOutputLoading = false;
          updatedState[messageIdx].outputMessage = data.body;

          return updatedState;
        } else {
          return prevState;
        }
      });
    });
    // mockAddToChatHistory(messageID, setChatHistory);

    setInputPrompt("");
    scrollToBottom();
  };

  const scrollMessageContainer = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="chatbox-container">
      <div
        className={`chat-messages ${isChatboxExpanded && "chat-messages-xl"}`}
        ref={messageContainerRef}
      >
        {chatHistory.map((messageData) => {
          return (
            <ChatMessage
              key={messageData.messageID}
              messageData={messageData}
              scrollMessageContainer={scrollMessageContainer}
              scrollToBottom={scrollToBottom}
            />
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>
      <form
        onSubmit={addToChatHistory}
        className={`prompt-input-bar ${
          isChatboxExpanded && "prompt-input-bar-xl"
        }`}
      >
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          className="prompt-input"
        />
        <button
          type="submit"
          disabled={inputPrompt.length === 0}
          className="submit-prompt-button"
        >
          <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
        </button>
      </form>
    </div>
  );
}

export default Chatbox;
