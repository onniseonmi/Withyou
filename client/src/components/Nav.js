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
      <div className="nav-container">
        <div className="nav-left"></div>
        <div className="title">
          <Link to="/">
            <img src={title} alt="title"></img>
          </Link>
        </div>
        {!isLogin ? (
          <div className="nav-box nav-right">
            <div id="login" onClick={handleClick}>
              Login
            </div>
            <div id="join" onClick={handleClick}>
              Join
            </div>
          </div>
        ) : (
          <div className="nav-box nav-right">
            <div>Logout</div>
            <div>
              <Link to="/mypage">Mypage</Link>
            </div>
          </div>
        )}
        <div>
          <Link to="/editpage">editpage</Link>
        </div>
      </div>
      {loginBtnOn ? (
        <Login
          setLoginBtnOn={setLoginBtnOn}
          signupBtnOn={signupBtnOn}
          setSignupBtnOn={setSignupBtnOn}
        />
      ) : null}
    </>
  );
};

export default Nav;
