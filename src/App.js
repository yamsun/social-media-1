import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/login";

const getUsers = () => {
  axios
    .get("/api/users")
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => console.log("err", err));
};

function App() {
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
