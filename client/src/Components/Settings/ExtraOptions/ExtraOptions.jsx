import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GlobalSignOutCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "../../../utils/Cognito";
import { useHeader } from "../../../Context/HeaderProvider";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../../reducers/authSlice.js";

import "./ExtraOptions.scoped.css";

function ExtraOptions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedSettingsHeader, setSelectedSettingsHeader } = useHeader();

  const appInformationPage = {
    name: "App Information",
    icon: "fa-solid fa-circle-info",
    id: 11,
  };

  const logout = async () => {
    const accessToken = Cookies.get("token");
    const input = {
      AccessToken: accessToken,
    };
    const command = new GlobalSignOutCommand(input);
    await cognitoClient.send(command);
    dispatch(setLoggedIn(false));
    Cookies.remove("token");
    Cookies.remove("idtoken");
    navigate("/login");
  };

  return (
    <div className="extra-options-container">
      <button
        onClick={() => {
          setSelectedSettingsHeader(appInformationPage);
        }}
        disabled={selectedSettingsHeader.id === appInformationPage.id}
        className="extra-option-button"
      >
        <i class="fa-solid fa-circle-info"></i>
        <span>App Information</span>
      </button>
      <button onClick={logout} className="logout-button">
        <i class="fa-solid fa-person-walking"></i>
        <span>Logout</span>
      </button>
    </div>
  );
}

export default ExtraOptions;
