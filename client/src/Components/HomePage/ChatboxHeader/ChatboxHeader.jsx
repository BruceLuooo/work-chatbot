import { useEffect, useState } from "react";
import { useHeader } from "../../../Context/HeaderProvider";
import AssistantsPanelLarge from "../AssistantsPanelLarge/AssistantsPanelLarge";

import "./ChatboxHeader.scoped.css";

function ChatboxHeader({
  isChatboxExpanded,
  isChatHistoryEmpty,
  setChatHistory,
}) {
  const { selectedAssistantHeader } = useHeader();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (isChatboxExpanded === false) {
      setIsModalVisible(false);
    }
  }, [isChatboxExpanded]);

  const clearChatHistory = () => {
    setChatHistory([]);
  };

  return (
    <div>
      {isModalVisible && (
        <div className="overlay" onClick={() => setIsModalVisible(false)} />
      )}
      <div className="chatbox-header">
        <button
          onClick={() =>
            setIsModalVisible((prevState) => {
              return !prevState;
            })
          }
          disabled={!isChatboxExpanded}
          className="chatbox-assistant"
        >
          <img
            src={selectedAssistantHeader.img}
            alt="Assistant"
            className="assistant-image"
          />
          <span>{selectedAssistantHeader.name}</span>
          {isChatboxExpanded && (
            <i
              className={`fa-solid fa-circle-chevron-down ${
                isModalVisible && "invert"
              }`}
              aria-hidden="true"
            ></i>
          )}
        </button>
        <button
          onClick={clearChatHistory}
          disabled={isModalVisible || isChatHistoryEmpty}
          className="clear-chat-button"
        >
          <i class="fa-solid fa-trash" aria-hidden="true"></i>
          <span>Clear Chat</span>
        </button>
        {isModalVisible && (
          <div className="modal">
            <AssistantsPanelLarge setIsModalVisible={setIsModalVisible} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatboxHeader;
