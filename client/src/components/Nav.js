import React, { useState } from "react";
import { Link } from "react-router-dom";
import title from "../images/title.png";
import "../css/Nav.css";
import Login from "./modals/auth/Login";

const Nav = ({
  isLogin,
  setIsLogin,
  userInfo,
  setUserInfo,
  setAccessToken,
}) => {
  const [loginBtnOn, setLoginBtnOn] = useState(false);
  const [signupBtnOn, setSignupBtnOn] = useState(false);
  const handleClick = (e) => {
    if (e.target.id === "login") {
      setLoginBtnOn(true);
    } else if (e.target.id === "join") {
      setLoginBtnOn(true);
      setSignupBtnOn(true);
    } else if (e.target.id === "logout") {
      setIsLogin(false);
      setUserInfo({
        username: "",
        email: "",
        mobile: "",
        image: "",
        type: "",
      });
      sessionStorage.clear();
      window.location.assign("http://localhost:3000");
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
            <div>
              <Link to="/mypage">Mypage</Link>
            </div>
            <div id="logout" onClick={handleClick}>
              Logout
            </div>
          </div>
        )}
        <div>
          <Link to="/editpage">editpage</Link>
        </div>
      </div>
      {loginBtnOn ? (
        <Login
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setLoginBtnOn={setLoginBtnOn}
          signupBtnOn={signupBtnOn}
          setSignupBtnOn={setSignupBtnOn}
          setAccessToken={setAccessToken}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      ) : null}
    </>
  );
};

export default Nav;
