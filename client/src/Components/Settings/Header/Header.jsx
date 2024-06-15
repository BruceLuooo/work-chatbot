import { useEffect, useState } from "react";
import { useHeader } from "../../../Context/HeaderProvider";
import Modal from "../Modal/Modal";

import "./Header.scoped.css";

function Header({ isSettingsExpanded }) {
  const { selectedSettingsHeader, setSelectedSettingsHeader } = useHeader();

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (isSettingsExpanded === false) {
      setIsModalVisible(false);
    }
  }, [isSettingsExpanded]);

  const changeSettingsPage = (page) => {
    setSelectedSettingsHeader(page);
    setIsModalVisible(false);
  };

  return (
    <div className="settings-header">
      <div className="settings-assistant">
        <i class={`${selectedSettingsHeader.icon} iconic`} />
        <span>{selectedSettingsHeader.name}</span>
      </div>
      {isSettingsExpanded && (
        <button
          className="hamburger-menu"
          onClick={() => setIsModalVisible(!isModalVisible)}
        >
          <i class="fa-solid fa-bars" />
        </button>
      )}
      {isModalVisible && (
        <Modal
          changeSettingsPage={changeSettingsPage}
          selectedSettingsHeader={selectedSettingsHeader}
        />
      )}
    </div>
  );
}

export default Header;
