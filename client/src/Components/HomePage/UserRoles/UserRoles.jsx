import React from "react";
import "./UserRoles.scoped.css";

function UserRoles() {
  const dummyData = [
    { role: "Vosyn Employee", image: "fa-solid fa-pen" },
    { role: "SW Team", image: "fa-solid fa-file-code" },
    { role: "Admin User", image: "fa-solid fa-person" },
  ];

  return (
    <div className="roles-container">
      <h3 className="roles-header">Your Roles</h3>
      <div className="roles">
        {dummyData.map((role, index) => (
          <div key={index} className="role">
            <i class={role.image}></i>
            <span>{role.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRoles;
