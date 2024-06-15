import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { userProfile } from "./api/profile.js";
import PrivateRoute from "./utils/PrivateRoutes.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "./reducers/authSlice.js";
import Home from "./pages/Home/Home.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import HeaderProvider from "./Context/HeaderProvider.jsx";
import Login from "./pages/Login/Login.jsx";
import FinalizeAccountCreation from "./pages/FinalizeAccountCreation/FinalizeAccountCreation.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      await userProfile().then((res) => {
        if (res) {
          dispatch(setLoggedIn(true));
          setLoading(false);
        }
      });
    } catch (err) {
      dispatch(setLoggedIn(false));
      setLoading(false);
    }
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <HeaderProvider>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />
          <Route
            path="/finalize-account"
            element={<FinalizeAccountCreation />}
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HeaderProvider>
    </>
  );
}

export default App;
