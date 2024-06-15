import Option from "./Option";

import "./Options.scoped.css";

function Options() {
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

  return (
    <div className="settings-panel-wrapper">
      <div className="settings-panel-container">
        <span className="settings-header">User Settings</span>
        <div className="settings-options-list settings-options-margin-bottom">
          {userOptions.map((option) => (
            <div key={option.id}>
              <Option option={option} />
            </div>
          ))}
        </div>
        <span className="settings-header">Admin Settings</span>
        <div className="settings-options-list">
          {adminOptions.map((option) => (
            <div key={option.id}>
              <Option option={option} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Options;
