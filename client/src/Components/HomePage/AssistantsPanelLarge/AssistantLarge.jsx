import "./AssistantLarge.scoped.css";

function AssistantLarge({ assistant, changeAssistantHeader, selectedHeader }) {
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
          selectedHeader.id === assistant.id && "selected-assistant-button"
        }`}
        onClick={() => changeAssistantHeader(assistant)}
      >
        <img src={assistant.img} alt="" className="assistant-image" />
        <div className="assistant-title-container">
          <span className="assistant-title">{assistant.name}</span>
        </div>
      </button>
      <button className={`extra-options extra-options-large-position`}>
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

export default AssistantLarge;
