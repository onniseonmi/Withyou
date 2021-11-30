import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditPage from "./pages/EditPage";
import LandingPage from "./pages/LandingPage";
import Mypage from "./pages/Mypage";
import Nav from "./components/Nav";
import axios from "axios";
import "./App.css";
require("dotenv").config();

export default function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [loginBtn, setLoginBtn] = useState(false);
  const [signupBtn, setSignupBtn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    mobile: "",
  });
  const [landingOn, setLandingOn] = useState(true);
  const getAccessToken = (authorizationCode, loginType) => {
    axios({
      method: "POST",
      url: `${process.env.server_url}/user/callback`,
      data: { authorizationCode: authorizationCode, type: loginType },
    }).then((resp) => {
      const { access_token } = resp.data;
      setIsLogin(true);
      sessionStorage.setItem("isLoginSession", isLogin);
      sessionStorage.setItem("accessTokenSession", access_token);
    });
  };
  useEffect(() => {
    const isLoginSession = sessionStorage.getItem("isLoginSession");
    const accessTokenSession = sessionStorage.getItem("accessTokenSession");
    if (isLoginSession) {
      setIsLogin(isLoginSession);
    }
    if (accessTokenSession) {
      setAccessToken(accessTokenSession);
    }
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
      const loginType = sessionStorage.getItem("loginType");
      getAccessToken(authorizationCode, loginType);
      // window.location.assign("http://localhost:3000");
    }
  }, []);

  return (
    <Router>
      <Nav
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        loginBtn={loginBtn}
        setLoginBtn={setLoginBtn}
        signupBtn={signupBtn}
        setSignupBtn={setSignupBtn}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        landingOn={landingOn}
        setLandingOn={setLandingOn}
      />

      <Switch>
        <Route exact={true} path="/">
          {!loginBtn && <LandingPage         landingOn={landingOn}
        setLandingOn={setLandingOn}/>}
        </Route>
        <Route path="/login"></Route>
        <Route path="/editpage">{!loginBtn && <EditPage />}</Route>
        <Route path="/mypage">
          <Mypage accessToken={accessToken} />
        </Route>
      </Switch>
    </Router>
  );
}
