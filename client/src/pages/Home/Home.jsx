import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import AssistantsPanel from "../../Components/HomePage/AssistantsPanel/AssistantsPanel";
import UserRoles from "../../Components/HomePage/UserRoles/UserRoles";
import ChatboxHeader from "../../Components/HomePage/ChatboxHeader/ChatboxHeader";
import Chatbox from "../../Components/HomePage/Chatbox/Chatbox";
import AnimatedChevron from "../../Components/HomePage/Chatbox/AnimatedChevron";

import "./Home.scoped.css";

function Home() {
  const [isChatboxExpanded, setIsChatboxExpanded] = useState(
    window.innerWidth > 1024 ? false : true
  );
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024) {
        setIsChatboxExpanded(true);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="homepage-container">
      <Navbar
        buttonType={{ icon: "fa-solid fa-gear settings", text: "Settings" }}
      />
      <div
        className={`chatpage-container ${isChatboxExpanded && "edit-margin"}`}
      >
        {!isChatboxExpanded && (
          <div className="chatpage-leftside">
            <AssistantsPanel />
            <UserRoles />
          </div>
        )}
        <div className="chatpage-middle">
          <AnimatedChevron
            isChatboxExpanded={isChatboxExpanded}
            setIsChatboxExpanded={setIsChatboxExpanded}
          />
        </div>
        <div className="chatpage-right">
          <ChatboxHeader
            isChatboxExpanded={isChatboxExpanded}
            isChatHistoryEmpty={chatHistory.length === 0}
            setChatHistory={setChatHistory}
          />
          <Chatbox
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            isChatboxExpanded={isChatboxExpanded}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
