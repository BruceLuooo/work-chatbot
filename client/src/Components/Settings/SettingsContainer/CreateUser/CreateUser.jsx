import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import {
  roles,
  assistants,
  teams,
  userInfoDefault,
} from "../../../../Constants/UserOptions";
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import Field from "./Field";
import DropdownField from "./DropdownField";
import MultiSelectField from "./MultiSelectField";

import "./CreateUser.scoped.css";

function CreateUser() {
  const [userInfo, setUserInfo] = useState(userInfoDefault);
  const [isDisplayModal, setDisplayModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    let hidePopupTimeout = undefined;
    if (isDisplayModal) {
      hidePopupTimeout = setTimeout(() => {
        setDisplayModal(false);
      }, 3000);
    }

    return () => {
      if (hidePopupTimeout !== undefined) {
        clearTimeout(hidePopupTimeout);
        setDisplayModal(false);
      }
    };
  }, [isDisplayModal]);

  const updateUser = (field, input) => {
    if (field.toLowerCase() === "assistants") {
      setUserInfo((prev) => ({
        ...prev,
        [field.toLowerCase()]: [...prev[field.toLowerCase()], input],
      }));
    } else {
      setUserInfo((prev) => ({
        ...prev,
        [field.toLowerCase()]: input,
      }));
    }
  };

  const getAWSCredentials = async () => {
    let COGNITO_ID = `cognito-idp.${process.env.REACT_APP_COGNITO_REGION}.amazonaws.com/${process.env.REACT_APP_USER_POOL_ID}`;
    let loginData = {
      [COGNITO_ID]: Cookies.get("idtoken"),
    };

    const getCredentials = fromCognitoIdentityPool({
      clientConfig: { region: process.env.REACT_APP_COGNITO_REGION },
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
      logins: loginData,
    });

    const credentials = await getCredentials();

    return credentials;
  };

  const createNewUser = async (e) => {
    e.preventDefault();
    try {
      const credentials = getAWSCredentials();

      const cognitoClient = new CognitoIdentityProviderClient({
        region: process.env.REACT_APP_COGNITO_REGION,
        credentials: credentials,
      });

      const input = {
        DesiredDeliveryMediums: ["EMAIL"],
        MessageAction: "SUPPRESS",
        TemporaryPassword: "Test@123",
        UserAttributes: [
          {
            Name: "name",
            Value: userInfo.name,
          },
          {
            Name: "email",
            Value: userInfo.email,
          },
          {
            Name: "custom:Role",
            Value: userInfo.role,
          },
          {
            Name: "custom:Team",
            Value: userInfo.team,
          },
          {
            Name: "custom:Assistants",
            Value: userInfo.assistants.join(", "),
          },
        ],
        UserPoolId: "us-east-1_ozijXGPMA",
        Username: userInfo.email,
      };
      const command = new AdminCreateUserCommand(input);
      await cognitoClient.send(command);

      setUserInfo(userInfoDefault);

      setModalContent({
        message: "User Created Successfully",
        icon: "fa-solid fa-check",
        backgroundColor: "green",
      });
      setDisplayModal(true);
    } catch (error) {
      setModalContent({
        message: error.message,
        icon: "fa-solid fa-triangle-exclamation",
        backgroundColor: "#c92a20",
      });
      setDisplayModal(true);
    }
  };

  return (
    <>
      <form className="account-details-container" onSubmit={createNewUser}>
        <Field
          label="Name"
          updateUser={updateUser}
          currentInput={userInfo.name}
        />
        <Field
          label="Email"
          updateUser={updateUser}
          currentInput={userInfo.email}
        />
        <Field
          label="Password"
          updateUser={updateUser}
          currentInput={userInfo.password}
        />
        <DropdownField
          label="Team"
          updateUser={updateUser}
          options={teams}
          selectedOption={userInfo.team}
        />
        <MultiSelectField
          label="Assistants"
          updateUser={updateUser}
          options={assistants}
          selectedOption={userInfo.assistants}
        />
        <DropdownField
          label="Role"
          updateUser={updateUser}
          options={roles}
          selectedOption={userInfo.role}
        />
        <button type="submit" className="create-account-button">
          Create Account
        </button>
      </form>
      <AnimatePresence>
        {isDisplayModal && (
          <motion.div
            initial={{ opacity: 0, y: "24px" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "24px" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="invalid-credentials-popup"
          >
            <div
              className="invalid-credentials-popup-header"
              style={{ backgroundColor: modalContent.backgroundColor }}
            >
              <div className="invalid-credentials-popup-header-start">
                <i class={`${modalContent.icon}`}></i>
                <span> {modalContent.message}</span>
              </div>
              <button
                className="close-popup"
                onClick={() => setDisplayModal(false)}
              >
                <i class="fa-solid fa-close"></i>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CreateUser;
