import React from "react";
import logo from "../../assets/vosyn-logo-cleaned.svg";
import { useNavigate } from "react-router-dom";

import "./Navbar.scoped.css";

function Navbar({ buttonType }) {
  const navigate = useNavigate();

  const goToPage = () => {
    if (buttonType.text === "Chat") {
      navigate("/");
    } else {
      navigate("/settings");
    }
  };

  return (
    <div className="navbar-container">
      <button
        onClick={() => {
          navigate("/");
        }}
        className="logo-button"
      >
        <img src={logo} alt="" className="vosyn-logo" />
      </button>
      <div className="rightsideNav">
        <button className="settings-button" onClick={goToPage}>
          <span className="settings">
            <i class={buttonType.icon}></i>
          </span>
          <span>{buttonType.text}</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
