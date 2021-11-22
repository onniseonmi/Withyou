import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditPage from "./pages/EditPage";
import LandingPage from "./pages/LandingPage";
import Mypage from "./pages/Mypage";
import Nav from "./components/Nav";
import axios from "axios";
import "./App.css";

export default function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    mobile: "",
  });
  const getAccessToken = (authorizationCode, loginType) => {
    axios({
      method: "POST",
      url: "http://localhost:4000/user/callback",
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
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
      />
      
      <Switch>
        <Route exact={true} path="/">
          <LandingPage />
        </Route>
        <Route path="/login">
        </Route>
        <Route path="/editpage">
          <EditPage />
        </Route>
        <Route path="/mypage">
          <Mypage accessToken={accessToken} />
        </Route>
      </Switch>
    </Router>
  );
}
