import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  axios.defaults.withCredentials = true;

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8000/user/login", inputs);
    console.log(res.data);
    setCurrentUser(res.data);
    // console.log(currentUser);
  };
  const logout = async (inputs) => {
    await axios.post("http://localhost:8000/user/logout");
    // console.log(res.data);
    setCurrentUser(null);
  };
  const signup = async (inputs) => {
    const res = await axios.post("http://localhost:8000/user/singUp", inputs);
    // navigate("/");
    console.log(res);
    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
