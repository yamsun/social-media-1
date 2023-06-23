import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext, useAuth } from "../../../context/auth-context";
// import { Navbar } from "../../../layout/Navbar";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const authValues = useAuth();
  console.log("authValues", authValues);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginAsTestUser = async () => {
    setEmail("adarshbalika");
    setPassword("adarshBalika123");
    try {
      const authRes = await authValues.loginHandler(
        "adarshbalika",
        "adarshBalika123"
      );
      console.log("authRes", authRes);
      if (authRes.status == 200) {
        navigate("/home");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  console.log("authValues", authValues);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.card}>
        <h3 className={styles.heading}>Sign In</h3>
        <div className={styles.form}>
          <label>
            <div>Email address</div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <div>Password</div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            onClick={() => {
              authValues.loginHandler(email, password);
            }}
            className={styles.loginBtn}
          >
            Login
          </button>
          <button
            className={`${styles.loginBtn} ${styles.testLoginBtn}`}
            onClick={() => {
              loginAsTestUser();
            }}
          >
            Login as test user
          </button>
          <div>Create New Account ></div>
        </div>
      </div>
    </div>
  );
};
