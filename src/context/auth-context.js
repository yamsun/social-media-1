import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localAuthToken = localStorage.getItem("auth_token");
  const localUserDetail = JSON.parse(localStorage.getItem("current_user"));

  const [token, setToken] = useState(localAuthToken);
  const [currentUser, setCurrentUser] = useState(localUserDetail);

  const loginHandler = async (email, password) => {
    try {
      const res = await axios.post(`/api/auth/login`, {
        username: email,
        password,
      });
      console.log("login res", res);
      console.log("token", res?.data?.encodedToken);
      setToken(res?.data?.encodedToken);
      localStorage.setItem(
        "auth_token",
        JSON.stringify(res?.data?.encodedToken)
      );
      setCurrentUser(res?.data?.foundUser);
      localStorage.setItem(
        "current_user",
        JSON.stringify(res?.data?.foundUser)
      );
      return res;
    } catch (error) {
      console.log("login error", error);
      return error;
    }
  };

  const signupHandler = async (firstName, lastName, email, password, role) => {
    try {
      const res = await axios.post(`/api/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
        role,
      });
      setToken(res?.data?.encodedToken);
      localStorage.setItem(
        "auth_token",
        JSON.stringify(res?.data?.encodedToken)
      );
      setCurrentUser(res?.data?.createdUser);
      localStorage.setItem(
        "current_user",
        JSON.stringify(res?.data?.createdUser)
      );
      // user;
    } catch (error) {
      console.log("signup error", error);
      return error;
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("current_user");
    localStorage.removeItem("auth_token");
    setCurrentUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loginHandler,
        signupHandler,
        token,
        currentUser,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider, AuthContext };
