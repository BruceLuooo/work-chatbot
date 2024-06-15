import { useState } from "react";

import "./DropdownMenu.scoped.css";

function DropdownMenu({ options, updateUser, field, setSelectedDropdownMenu }) {
  const updateform = (option) => {
    updateUser(field, option);
    setSelectedDropdownMenu(false);
  };

  return (
    <div className="dropdown-menu">
      {options.map((option, index) => (
        <div key={index} className="option" onClick={() => updateform(option)}>
          {option}
        </div>
      ))}
    </div>
  );
}

export default DropdownMenu;
