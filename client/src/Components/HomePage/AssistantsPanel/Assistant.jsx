import React from "react";
import "./Assistant.scoped.css";

function Assistant({ assistant, setSelectedHeader, selectedHeader }) {
  return (
    <div
      className={`${
        selectedHeader.id === assistant.id
          ? "active-assistant-container"
          : "assistant-container"
      }`}
    >
      <button
        className={`assistant-button ${
          assistant.id === selectedHeader.id && "selected-assistant-button"
        }`}
        onClick={() => setSelectedHeader(assistant)}
      >
        <img src={assistant.img} alt="" className="assistant-image" />
        <div className="assistant-title-container">
          <span className="assistant-title">{assistant.name}</span>
        </div>
      </button>
      <button className="extra-options">
        <span
          className={`${
            selectedHeader.id !== assistant.id && "hover-assistant-ellipsis"
          }`}
        >
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </span>
      </button>
    </div>
  );
}

export default Assistant;
