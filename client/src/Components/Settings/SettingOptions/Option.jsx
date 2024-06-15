import { useHeader } from "../../../Context/HeaderProvider";
import "./Option.scoped.css";

function Option({ option }) {
  const { selectedSettingsHeader, setSelectedSettingsHeader } = useHeader();

  return (
    <button
      onClick={() => setSelectedSettingsHeader(option)}
      disabled={option.id === selectedSettingsHeader.id}
      className="option-button"
    >
      <i class={option.icon} />
      <span className="option-title">{option.name}</span>
    </button>
  );
}

export default Option;
