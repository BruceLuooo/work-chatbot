import React, { createContext, useContext, useState } from "react";
import frontend from "../assets/DummyImage/frontend-assistant.png";
import backend from "../assets/DummyImage/backend-assistant.png";
import people from "../assets/DummyImage/P&C-assistant.png";
import autodubbing from "../assets/DummyImage/autodubbing-assistant.png";

const HeaderContext = createContext();

export const useHeader = () => {
  return useContext(HeaderContext);
};

export const HeaderProvider = ({ children }) => {
  const dummyData = [
    {
      name: "Frontend Assistant",
      img: frontend,
      id: 1,
    },
    { name: "Backend Assistant", img: backend, id: 2 },
    { name: "Autodubbing Assistant", img: autodubbing, id: 3 },
    { name: "P&C Assistant", img: people, id: 4 },
  ];

  const [selectedAssistantHeader, setSelectedAssistantHeader] = useState({
    name: "Frontend Assistant",
    img: frontend,
    id: 1,
  });
  const [selectedSettingsHeader, setSelectedSettingsHeader] = useState({
    name: "User Details",
    icon: "fa-solid fa-user",
    id: 1,
  });

  return (
    <HeaderContext.Provider
      value={{
        selectedAssistantHeader,
        setSelectedAssistantHeader,
        selectedSettingsHeader,
        setSelectedSettingsHeader,
        dummyData,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
