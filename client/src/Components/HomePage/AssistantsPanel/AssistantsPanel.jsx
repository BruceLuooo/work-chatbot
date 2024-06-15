import { useHeader } from "../../../Context/HeaderProvider";
import "./AssistantsPanel.scoped.css";
import Assistant from "./Assistant";

function AssistantsPanel({ displayModal }) {
  const { selectedAssistantHeader, setSelectedAssistantHeader, dummyData } =
    useHeader();

  return (
    <div className="assistants-panel-container">
      {!displayModal && <span className="assistants-header">Assistants</span>}
      {dummyData.map((assistant) => (
        <div key={assistant.id}>
          <Assistant
            assistant={assistant}
            selectedHeader={selectedAssistantHeader}
            setSelectedHeader={setSelectedAssistantHeader}
          />
        </div>
      ))}
    </div>
  );
}

export default AssistantsPanel;
