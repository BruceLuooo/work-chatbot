import React from "react";
import "./Modal.scoped.css";

function Modal({ changeSettingsPage, selectedSettingsHeader }) {
  const userOptions = [
    { name: "User Details", icon: "fa-solid fa-user", id: 1 },
    { name: "Knowledge Bases", icon: "fa-solid fa-database", id: 2 },
    { name: "Assistants", icon: "fa-solid fa-message", id: 3 },
    { name: "App Perferences", icon: "fa-solid fa-gears", id: 4 },
  ];

  const adminOptions = [
    { name: "Create User Accounts", icon: "fa-solid fa-user-plus", id: 5 },
    { name: "Manage User Permissions", icon: "fa-solid fa-user-gear", id: 6 },
    { name: "Create Knowledge Bases", icon: "fa-solid fa-database", id: 7 },
    { name: "Create Assisants", icon: "fa-solid fa-message", id: 8 },
    { name: "File Management", icon: "fa-solid fa-folder", id: 9 },
    { name: "Admin Logs", icon: "fa-solid fa-book", id: 10 },
  ];

  const appInformationPage = {
    name: "App Information",
    icon: "fa-solid fa-circle-info",
    id: 11,
  };

  return (
    <div className="modal-container">
      {userOptions.map((option, index) => (
        <div
          key={index}
          className={`${
            selectedSettingsHeader.id === option.id && "active-page-container"
          }`}
        >
          <button onClick={() => changeSettingsPage(option)}>
            <i class={option.icon} />
            <span>{option.name}</span>
          </button>
        </div>
      ))}
      {adminOptions.map((option, index) => (
        <div
          key={index}
          className={`${
            selectedSettingsHeader.id === option.id && "active-page-container"
          }`}
        >
          <button onClick={() => changeSettingsPage(option)}>
            <i class={option.icon} />
            <span>{option.name}</span>
          </button>
        </div>
      ))}
      <div
        className={`${
          selectedSettingsHeader.id === appInformationPage.id &&
          "active-page-container"
        }`}
      >
        <button
          onClick={() => changeSettingsPage(appInformationPage)}
          className="option-button"
        >
          <i class={appInformationPage.icon} />
          <span>{appInformationPage.name}</span>
        </button>
      </div>
    </div>
  );
}

export default Modal;
