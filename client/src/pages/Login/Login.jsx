import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "../../utils/Cognito.js";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../reducers/authSlice.js";
import { useNavigate } from "react-router-dom";
import vosynLogo from "../../assets/full-vosyn-logo.png";

import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

import "./Login.scoped.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordTextVisible, setIsPasswordTextVisible] = useState(false);
  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

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

  const forgotPassword = (e) => {
    e.preventDefault();
  };

  const login = async (e) => {
    e.preventDefault();
    //temp credentials USERNAME: test123@gmail.com, PASSWORD: Test@123

    try {
      const credentials = {
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
        ClientId: process.env.REACT_APP_COGINTO_CLIENT_ID,
      };

      const authCommand = new InitiateAuthCommand(credentials);
      const authResponse = await cognitoClient.send(authCommand);
      console.log(authResponse, "hi");

      if (authResponse?.ChallengeName === "NEW_PASSWORD_REQUIRED") {
        navigate(
          `/finalize-account?session=${authResponse.Session}&email=${email}`
        );
      } else {
        // TODO: Switch to store as secure cookies
        Cookies.set("token", authResponse.AuthenticationResult.AccessToken, {
          expires: 1,
        });
        Cookies.set("idtoken", authResponse.AuthenticationResult.IdToken, {
          expires: 1,
        });

        dispatch(setLoggedIn(true));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setIsErrorPopupVisible(true);
    }
  };

  const emailValidation = (inputEmail) => {
    let testEmail = inputEmail;
    if (typeof testEmail !== "string") {
      testEmail = email;
    }

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!regex.test(testEmail)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  const passwordValidation = (inputPassword) => {
    let testPassword = inputPassword;
    if (typeof testPassword !== "string") {
      testPassword = password;
    }

    // Only check for a minimum length of 8 characters
    const regex = /^.{8,}$/;
    if (!regex.test(testPassword)) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  };

  return (
    <div className="test">
      <div className="login-container">
        <div className="login-left">
          <div className="login-logo">
            <img src={vosynLogo} alt="Vosyn Logo" />
            <span>Enterprise LLM</span>
          </div>
        </div>
        <div className="login-right">
          <span className="form-title">Sign In</span>
          <form className="login-form" onSubmit={login}>
            <div
              className={`form-section email-form-section ${
                !isEmailValid && "invalid-form-section"
              }`}
            >
              <label
                htmlFor="email"
                className={`form-section-label ${
                  email.length === 0
                    ? "invalid-form-section-label"
                    : "valid-form-section-label"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="Input your email here"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!isEmailValid) {
                    emailValidation(e.target.value);
                  }
                }}
                onBlur={emailValidation}
              />
              <p className="login-input-error-text">
                {!isEmailValid ? "Please input a valid email" : "\u00A0"}
              </p>
            </div>
            <div className="form-section password-form-section">
              <label
                htmlFor="password"
                className={`form-section-label ${
                  password.length === 0
                    ? "invalid-form-section-label"
                    : "valid-form-section-label"
                }`}
              >
                Password
              </label>
              <div
                className={`form-section password-input-form-section ${
                  !isPasswordValid && "invalid-form-section"
                }`}
              >
                <input
                  type={isPasswordTextVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder="Input your password here"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (!isPasswordValid) {
                      passwordValidation(e.target.value);
                    }
                  }}
                  onBlur={passwordValidation}
                />
                <button
                  className="show-hide-password"
                  type="button"
                  onClick={() =>
                    setIsPasswordTextVisible((prevState) => {
                      return !prevState;
                    })
                  }
                >
                  <i
                    class={`fa-solid ${
                      isPasswordTextVisible ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
              <p className="login-input-error-text">
                {!isPasswordValid
                  ? "Password must be at least 8 characters"
                  : "\u00A0"}
              </p>
            </div>
            <div className="form-section">
              <button
                className="forgot-password"
                type="button"
                onClick={forgotPassword}
              >
                Forgot Password?
              </button>
              <button
                className="login-button"
                type="submit"
                disabled={
                  email.length === 0 || !isEmailValid || !isPasswordValid
                }
              >
                <span>Login</span>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>
          <p className="form-footer">No Account? Contact P&C</p>
        </div>
      </div>
      <AnimatePresence>
        {isErrorPopupVisible && (
          <motion.div
            initial={{ opacity: 0, y: "24px" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "24px" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="invalid-credentials-popup"
          >
            <div className="invalid-credentials-popup-header">
              <div className="invalid-credentials-popup-header-start">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>Invalid Login Credentials</span>
              </div>
              <button
                className="close-popup"
                onClick={() => setIsErrorPopupVisible(false)}
              >
                <i class="fa-solid fa-close"></i>
              </button>
            </div>
            <span className="invalid-credentials-text">
              Please enter valid login information
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;
