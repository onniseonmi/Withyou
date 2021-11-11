import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditPage from "./pages/EditPage";
import LandingPage from "./pages/LandingPage";
import Mypage from "./pages/Mypage";
import Nav from "./components/Nav";
import axios from "axios";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    mobile: "",
    image: "",
    type: "",
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
      if (loginType === "kakao") {
        axios({
          method: "GET",
          url: "http://localhost:4000/user/kakao",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }).then((res) => {
          setUserInfo({
            ...userInfo,
            username: res.data.username,
            email: res.data.email,
            image: res.data.image,
          });
          sessionStorage.setItem(
            "userInfoSession",
            JSON.stringify({
              ...userInfo,
              username: res.data.username,
              email: res.data.email,
              image: res.data.image,
            })
          );
        });
      } else if (loginType === "naver") {
        axios({
          method: "GET",
          url: "http://localhost:4000/user/naver",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }).then((res) => {
          setUserInfo({
            ...userInfo,
            username: res.data.username,
            email: res.data.email,
            image: res.data.image,
            mobile: res.data.mobile,
          });
          sessionStorage.setItem(
            "userInfoSession",
            JSON.stringify({
              ...userInfo,
              username: res.data.username,
              email: res.data.email,
              image: res.data.image,
              mobile: res.data.mobile,
            })
          );
        });
      }
    });
  };

  useEffect(() => {
    const accessTokenSession =
      sessionStorage.getItem("accessTokenSession") || "";
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
    setAccessToken(accessTokenSession);
    setIsLogin(isLoginSession);
    setUserInfo(userInfoSession);

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
