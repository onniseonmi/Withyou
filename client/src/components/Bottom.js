import React, { useState } from "react";
import { Link } from "react-router-dom";
import title from "../images/title.png";
import "../css/Nav.css";
import Login from "./modals/auth/Login";
import Signup from "./modals/auth/Signup";

const Nav = ({ isLogin }) => {
  const [loginBtnOn, setLoginBtnOn] = useState(false);
  const [signupBtnOn, setSignupBtnOn] = useState(false);
  const handleClick = (e) => {
    if (e.target.id === "login") {
      setLoginBtnOn(true);
    } else if (e.target.id === "join") {
      setSignupBtnOn(true);
    }
  };
  return (
    <>

    </>
  );
};

export default Nav;
