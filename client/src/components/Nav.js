import React from "react";
import { Link } from "react-router-dom";
import "../css/Nav.css";
import "../css/LandingPage.css";
import Login from "./login/Login";
const client_url = "http://localhost:3000";
// const client_url =
//   "http://withyou-bucket-test1.s3-website.ap-northeast-2.amazonaws.com/";

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
      setLandingOn(false);
    } else if (e.target.id === "join") {
      setLoginBtn(true);
      setSignupBtn(true);
      setLandingOn(false);
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
      <div
        className="nav-container"
        style={{
          backgroundColor: `${landingOn ? "transparent" : "#f2f0ec"}`,
          borderBottom: `${landingOn ? "transparent" : "solid 1px lightgray"}`,
        }}
      >
        <div className="nav-left">
          <Link to="/">
            <div
              className="logo"
              style={{
                color: `${landingOn ? "#f2f0ec" : "black"}`,
              }}
              onClick={() => setLandingOn(true)}
            >
              Withyou
            </div>
          </Link>
        </div>
        {!isLogin ? (
          <div className="nav-box nav-right">
            <div
              id="login"
              onClick={handleClick}
              style={{
                color: `${landingOn ? "#f2f0ec" : "black"}`,
              }}
            >
              Login
            </div>
            <div
              id="join"
              onClick={handleClick}
              style={{
                color: `${landingOn ? "#f2f0ec" : "black"}`,
              }}
            >
              Join
            </div>
            <span className="burger_bar"></span>
          </div>
        ) : (
          <div className="nav-box nav-right">
            <div>
              <Link to="/mypage">
                <div
                  onClick={() => setLandingOn(false)}
                  style={{
                    color: `${landingOn ? "#f2f0ec" : "black"}`,
                  }}
                >
                  Mypage
                </div>
              </Link>
            </div>
            <div
              id="logout"
              onClick={handleClick}
              style={{
                color: `${landingOn ? "#f2f0ec" : "black"}`,
              }}
            >
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
          setLandingOn={setLandingOn}
        />
      ) : null}
    </>
  );
};

export default Nav;
