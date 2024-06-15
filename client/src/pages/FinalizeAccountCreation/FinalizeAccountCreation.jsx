import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { RespondToAuthChallengeCommand } from "@aws-sdk/client-cognito-identity-provider";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { cognitoClient } from "../../utils/Cognito.js";
import { setLoggedIn } from "../../reducers/authSlice.js";

import "./FinalizeAccountCreation.scoped.css";

function FinalizeAccountCreation() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isGivenNameValid, setIsGivenNameValid] = useState(true);
  const [isFamilyNameValid, setIsFamilyNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const isFormValid =
    givenName.length > 0 &&
    familyName.length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    isGivenNameValid &&
    isFamilyNameValid &&
    isPasswordValid &&
    isConfirmPasswordValid;
  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // Hide error popup after a set period of time
  useEffect(() => {
    let hidePopupTimeout = undefined;
    if (isErrorPopupVisible) {
      hidePopupTimeout = setTimeout(() => {
        setIsErrorPopupVisible(false);
      }, 3000);
    }

    return () => {
      if (hidePopupTimeout !== undefined) {
        clearTimeout(hidePopupTimeout);
        setIsErrorPopupVisible(false);
      }
    };
  }, [isErrorPopupVisible]);

  const givenNameValidation = (inputGivenName) => {
    let givenNameToValidate = inputGivenName;
    if (typeof givenNameToValidate !== "string") {
      givenNameToValidate = givenName;
    }

    if (givenNameToValidate.length > 0) {
      setIsGivenNameValid(true);
    } else {
      setIsGivenNameValid(false);
    }
  };

  const familyNameValidation = (inputFamilyName) => {
    let familyNameToValidate = inputFamilyName;
    if (typeof familyNameToValidate !== "string") {
      familyNameToValidate = familyName;
    }

    if (familyNameToValidate.length > 0) {
      setIsFamilyNameValid(true);
    } else {
      setIsFamilyNameValid(false);
    }
  };

  const passwordValidation = (inputPassword) => {
    let passwordToValidate = inputPassword;
    if (typeof passwordToValidate !== "string") {
      passwordToValidate = password;
    }

    // Only check for a minimum length of 8 characters
    const regex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    if (!regex.test(passwordToValidate)) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  };

  const confirmPasswordValidation = (inputConfirmPassword) => {
    let confirmPasswordToValidate = inputConfirmPassword;
    if (typeof confirmPasswordToValidate !== "string") {
      confirmPasswordToValidate = confirmPassword;
    }

    if (confirmPasswordToValidate === password) {
      setIsConfirmPasswordValid(true);
    } else {
      setIsConfirmPasswordValid(false);
    }
  };

  const handleFinalizeAccount = async (e) => {
    e.preventDefault();

    const requestData = {
      ClientId: process.env.REACT_APP_COGINTO_CLIENT_ID,
      ChallengeName: "NEW_PASSWORD_REQUIRED",
      Session: searchParams.get("session"),
      ChallengeResponses: {
        NEW_PASSWORD: password,
        USERNAME: searchParams.get("email"),
        "userAttributes.given_name": givenName,
        "userAttributes.family_name": familyName,
      },
    };

    const command = new RespondToAuthChallengeCommand(requestData);
    try {
      const response = await cognitoClient.send(command);
      Cookies.set("token", response.AuthenticationResult.AccessToken, {
        expires: 1,
      });
      Cookies.set("idtoken", response.AuthenticationResult.IdToken, {
        expires: 1,
      });
      dispatch(setLoggedIn(true));
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsErrorPopupVisible(true);
    }
  };

  return (
    <div className="page-container">
      <div className="panel-container">
        <h1>Finish Account Creation</h1>
        <p>
          To be able to login, please provide your given name (i.e. first name),
          your family name (i.e. last name), and a permanent password for your
          account.
        </p>
        <form onSubmit={handleFinalizeAccount} className="panel-form-container">
          <label
            htmlFor="given-name"
            className={`form-label ${
              givenName.length > 0 && "valid-form-label"
            }`}
          >
            Given Name
          </label>
          <input
            type="text"
            id="given-name"
            name="given-name"
            autoComplete="given-name"
            placeholder="Input your given name here"
            value={givenName}
            onChange={(e) => {
              setGivenName(e.target.value);
              if (!isGivenNameValid) {
                givenNameValidation(e.target.value);
              }
            }}
            onBlur={givenNameValidation}
            className={`form-input ${
              !isGivenNameValid && "invalid-form-input"
            }`}
          />
          <span className="form-error-text form-gap-small">
            {isGivenNameValid ? "\u00A0" : "Given name must not be empty"}
          </span>
          <label
            htmlFor="family-name"
            className={`form-label ${
              familyName.length > 0 && "valid-form-label"
            }`}
          >
            Family Name
          </label>
          <input
            type="text"
            id="family-name"
            name="family-name"
            autoComplete="family-name"
            placeholder="Input your family name here"
            value={familyName}
            onChange={(e) => {
              setFamilyName(e.target.value);
              if (!isFamilyNameValid) {
                familyNameValidation(e.target.value);
              }
            }}
            onBlur={familyNameValidation}
            className={`form-input ${
              !isFamilyNameValid && "invalid-form-input"
            }`}
          />
          <span className="form-error-text form-gap-large">
            {isFamilyNameValid ? "\u00A0" : "Family name must not be empty"}
          </span>
          <label
            htmlFor="password"
            className={`form-label ${
              password.length > 0 && "valid-form-label"
            }`}
          >
            Password
          </label>
          <div className="password-input">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Input your password here"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (!isPasswordValid) {
                  passwordValidation(e.target.value);
                }
              }}
              onBlur={passwordValidation}
              className={`form-input password-form-input ${
                !isPasswordValid && "invalid-form-input"
              }`}
            />
            <button
              type="button"
              onClick={() => {
                setIsPasswordVisible((prevState) => {
                  return !prevState;
                });
              }}
              className="toggle-password-visibility-button"
            >
              <i
                class={`fa-solid ${
                  isPasswordVisible ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </button>
          </div>
          <span className="form-error-text form-gap-small">
            {isPasswordValid
              ? "\u00A0"
              : "Password must be at least 8 characters, contains at least 1 number, 1 special character, 1 uppercase letter, and 1 lowercase letter"}
          </span>
          <label
            htmlFor="confirm-password"
            className={`form-label ${
              confirmPassword.length > 0 && "valid-form-label"
            }`}
          >
            Confirm Password
          </label>
          <div className="password-input">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              id="confirm-password"
              name="confirm-password"
              autoComplete="new-password"
              placeholder="Input your password again"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (!isConfirmPasswordValid) {
                  confirmPasswordValidation(e.target.value);
                }
              }}
              onBlur={confirmPasswordValidation}
              className={`form-input password-form-input ${
                !isConfirmPasswordValid && "invalid-form-input"
              }`}
            />
            <button
              type="button"
              onClick={() => {
                setIsConfirmPasswordVisible((prevState) => {
                  return !prevState;
                });
              }}
              className="toggle-password-visibility-button"
            >
              <i
                class={`fa-solid ${
                  isConfirmPasswordVisible ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </button>
          </div>
          <span className="form-error-text">
            {isConfirmPasswordValid
              ? "\u00A0"
              : "Input does not match first password"}
          </span>
          <button
            type="submit"
            disabled={!isFormValid}
            className="finalize-account-button"
          >
            <span>Finalize Account</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </form>
      </div>
      <AnimatePresence>
        {isErrorPopupVisible && (
          <motion.div
            initial={{ opacity: 0, y: "24px" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "24px" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="failed-request-popup"
          >
            <div className="failed-request-popup-header">
              <div className="failed-request-popup-header-start">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>Error Finalizing Account</span>
              </div>
              <button
                className="close-popup"
                onClick={() => setIsErrorPopupVisible(false)}
              >
                <i class="fa-solid fa-close"></i>
              </button>
            </div>
            <span className="failed-request-text">
              Please try again or go back to login
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FinalizeAccountCreation;
