import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Nav.css";
import "../css/LandingPage.css";
import Login from "./login/Login";
const client_url = "http://localhost:3000";
const Nav = ({ isLogin, setIsLogin, accessToken, setAccessToken }) => {
  const [loginBtn, setLoginBtn] = useState(false);
  const [signupBtn, setSignupBtn] = useState(false);

  const handleClick = (e) => {
    if (e.target.id === "login") {
      setLoginBtn(true);
    } else if (e.target.id === "join") {
      setLoginBtn(true);
      setSignupBtn(true);
    }
    if (e.target.id === "logout") {
      sessionStorage.clear();
      setAccessToken("");
      setIsLogin(false);
      setLoginBtn(false);
      window.location.assign(client_url);
    }
  };
  return (
    <>
      <div className="nav-container">
        <div className="nav-left"></div>
        <div className="title">
          <a href="/">
            <div className="logo">Withyou</div>
          </a>
        </div>
        {!isLogin ? (
          <div className="nav-box nav-right">
            <div id="login" onClick={handleClick}>
              Login
            </div>
            <div id="join" onClick={handleClick}>
              Join
            </div>
            <span className="burger_bar"></span>
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
      </div>
      {loginBtn ? (
        <Login
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          loginBtn={loginBtn}
          setLoginBtn={setLoginBtn}
          signupBtn={signupBtn}
          setSignupBtn={setSignupBtn}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
        />
      ) : null}
    </>
  );
};

export default Nav;
