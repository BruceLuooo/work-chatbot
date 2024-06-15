import React from "react";
import { useHeader } from "../../../Context/HeaderProvider";
import UserDetails from "./UserDetails/UserDetails";
import CreateUser from "./CreateUser/CreateUser";

import "./SettingsContainer.scoped.css";

function SettingsContainer() {
  const { selectedSettingsHeader } = useHeader();

  return (
    <div className="setting-information-wrapper">
      {selectedSettingsHeader.name === "User Details" && <UserDetails />}
      {selectedSettingsHeader.name === "Create User Accounts" && <CreateUser />}
      <div></div>
      <div></div>
    </div>
  );
}

export default SettingsContainer;
