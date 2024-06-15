import React from "react";

import "./Field.scoped.css";

function Field({ label, updateUser, currentInput }) {
  return (
    <div className="info-container">
      <label for={label} className="info-label">
        {label}
      </label>
      <input
        type="text"
        className="info-input"
        name={label}
        id={label}
        placeholder={label}
        value={currentInput}
        onChange={(e) => updateUser(label, e.target.value)}
      />
    </div>
  );
}

export default Field;
