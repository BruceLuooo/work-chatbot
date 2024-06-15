import { useState, useRef, useEffect } from "react";
import "./DropdownField.scoped.css";
import DropdownMenu from "../../../DropdownMenu/DropdownMenu";

function DropdownField({ label, updateUser, options, selectedOption }) {
  const [selectedDropdownMenu, setSelectedDropdownMenu] = useState(false);

  const teamDropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (!teamDropdownRef.current.contains(event.target)) {
      setSelectedDropdownMenu("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="info-container">
      <span className="info-label">{label}</span>
      <div className="dropdown-container" ref={teamDropdownRef}>
        <div
          className="info-input dropdown-menu"
          onClick={() => setSelectedDropdownMenu(!selectedDropdownMenu)}
        >
          <span>{selectedOption}</span>
          <i
            className={`fa-solid fa-chevron-down position-icon ${
              selectedDropdownMenu && "invert"
            }`}
            aria-hidden="true"
          ></i>
        </div>
        {selectedDropdownMenu && (
          <DropdownMenu
            options={options}
            updateUser={updateUser}
            field={label.toLowerCase()}
            setSelectedDropdownMenu={setSelectedDropdownMenu}
          />
        )}
      </div>
    </div>
  );
}

export default DropdownField;
