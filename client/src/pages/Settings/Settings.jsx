import { useEffect, useState } from "react";
import { useHeader } from "../../Context/HeaderProvider";
import Navbar from "../../Components/Navbar/Navbar";
import Options from "../../Components/Settings/SettingOptions/Options";
import ExtraOptions from "../../Components/Settings/ExtraOptions/ExtraOptions";
import Header from "../../Components/Settings/Header/Header";

import "./Settings.scoped.css";
import SettingsContainer from "../../Components/Settings/SettingsContainer/SettingsContainer";

function Settings() {
  const { setSelectedSettingsHeader } = useHeader();

  const [isSettingsExpanded, setIsSettingsExpanded] = useState(
    window.innerWidth > 1024 ? false : true
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024) {
        setIsSettingsExpanded(true);
      } else {
        setIsSettingsExpanded(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setSelectedSettingsHeader({
      name: "User Details",
      icon: "fa-solid fa-user",
      id: 1,
    });
  }, []);

  return (
    <div className="settingpage-container">
      <Navbar buttonType={{ icon: "fa-solid fa-message", text: "Chat" }} />
      <div className="settings-container">
        {!isSettingsExpanded && (
          <div className="settings-leftside">
            <Options />
            <ExtraOptions />
          </div>
        )}
        <div className="settings-right">
          <Header isSettingsExpanded={isSettingsExpanded} />
          <SettingsContainer />
        </div>
      </div>
    </div>
  );
}

export default Settings;
