import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditPage from "./pages/EditPage";
import LandingPage from "./pages/LandingPage";
import Mypage from "./pages/Mypage";
import Nav from "./components/Nav";

import Login from "./components/modals/auth/Login";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    mobile: "",
    image: "",
    type: "",
  });
  useEffect(() => {
    const isLoginSession = sessionStorage.getItem("isLoginSession") || false;
    const userInfoSession = JSON.parse(
      sessionStorage.getItem("userInfoSession")
    ) || {
      username: "",
      email: "",
      mobile: "",
      image: "",
      type: "",
    };
    setIsLogin(isLoginSession);
    setUserInfo(userInfoSession);
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
    }
  }, []);
  return (
    <Router>
      <Nav
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        setAccessToken={setAccessToken}
      />
      <Switch>
        <Route exact={true} path="/">
          <LandingPage />
        </Route>
        <Route path="/editpage">
          <EditPage />
        </Route>
        <Route path="/mypage">
          <Mypage
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        </Route>
      </Switch>
    </Router>
  );
}
