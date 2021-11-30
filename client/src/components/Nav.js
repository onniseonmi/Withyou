import React from "react";
import { Link } from "react-router-dom";
import "../css/Nav.css";
import "../css/LandingPage.css";
import Login from "./login/Login";

const Nav = ({
  userInfo,
  setUserInfo,
  isLogin,
  setIsLogin,
  accessToken,
  setAccessToken,
  loginBtn,
  setLoginBtn,
  signupBtn,
  setSignupBtn,
  landingOn,
  setLandingOn,
}) => {
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
      window.location.assign(process.env.client_url);
    }
  };
  return (
    <>
      <div
        className="nav-container"
        style={{
          backgroundColor: `${landingOn ? "transparent" : "#f2f0ec"}`,
        }}
      >
        <div className="nav-left">
          <Link to="/">
            <div className="logo" onClick={() => setLandingOn(true)}>
              Withyou
            </div>
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
            <span className="burger_bar"></span>
          </div>
        ) : (
          <div className="nav-box nav-right">
            <div>
              <Link to="/mypage">
                <div onClick={() => setLandingOn(false)}>Mypage</div>
              </Link>
            </div>
            <div id="logout" onClick={handleClick}>
              Logout
            </div>
          </div>
        )}
      </div>
      {loginBtn ? (
        <Login
          userInfo={userInfo}
          setUserInfo={setUserInfo}
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
