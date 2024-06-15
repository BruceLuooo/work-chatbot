import { useHeader } from "../../../Context/HeaderProvider";
import "./AssistantsPanelLarge.scoped.css";
import AssistantsLarge from "./AssistantLarge";

function AssistantsPanelLarge({ setIsModalVisible }) {
  const { selectedAssistantHeader, setSelectedAssistantHeader, dummyData } =
    useHeader();

  const updateAssistant = (assistant) => {
    setSelectedAssistantHeader(assistant);
    setIsModalVisible(false);
  };

  return (
    <div className="assistants-panel-container">
      {dummyData.map((assistant) => (
        <div key={assistant.id}>
          <AssistantsLarge
            assistant={assistant}
            changeAssistantHeader={updateAssistant}
            selectedHeader={selectedAssistantHeader}
          />
        </div>
      ))}
    </div>
  );
}

export default AssistantsPanelLarge;
