import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditPage from './pages/EditPage';
import LandingPage from './pages/LandingPage';
import Mypage from './pages/Mypage';
import Nav from './components/Nav';
import axios from 'axios';
import './App.css';
const server_url = 'http://localhost:4000';

export default function App() {
  const [accessToken1, setAccessToken] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [loginBtn, setLoginBtn] = useState(false);
  const [signupBtn, setSignupBtn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    mobile: '',
    image: '',
  });
  const getAccessToken = (authorizationCode, loginType) => {
    axios({
      method: 'POST',
      url: 'http://localhost:4000/user/callback',
      data: { authorizationCode: authorizationCode, type: loginType },
    }).then(async (resp) => {
      const { access_token } = resp.data;
      if (access_token) {
        const loginType = sessionStorage.getItem('loginType');
        try {
          if (loginType === 'kakao') {
            await axios({
              method: 'GET',
              url: `${server_url}/user/kakao`,
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }).then(async (res) => {
              sessionStorage.setItem('accessTokenSession', access_token);
              await axios({
                method: 'POST',
                url: 'http://localhost:4000/user/oauth',
                data: {
                  username: res.data.username,
                  email: res.data.email,
                  image: res.data.image,
                  mobile: '',
                },
              }).then((resp) => {
                setIsLogin(true);
                sessionStorage.setItem('isLoginSession', isLogin);
                sessionStorage.setItem(
                  'userInfoSession',
                  JSON.stringify({
                    username: resp.data.username,
                    email: resp.data.email,
                    image: resp.data.image,
                    mobile: resp.data.mobile,
                  })
                );
                setUserInfo({
                  username: resp.data.username,
                  email: resp.data.email,
                  image: resp.data.image,
                  mobile: resp.data.mobile,
                });
              });
            });
          } else if (loginType === 'naver') {
            axios({
              method: 'GET',
              url: `${server_url}/user/naver`,
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }).then((res) => {
              axios({
                method: 'POST',
                url: 'http://localhost:4000/user/oauth',
                data: {
                  username: res.data.username,
                  email: res.data.email,
                  image: res.data.image,
                  mobile: '',
                },
              }).then((resp) => {
                setIsLogin(true);
                sessionStorage.setItem(
                  'userInfoSession',
                  JSON.stringify({
                    username: resp.data.username,
                    email: resp.data.email,
                    image: resp.data.image,
                    mobile: resp.data.mobile,
                  })
                );
                setUserInfo({
                  username: resp.data.username,
                  email: resp.data.email,
                  image: resp.data.image,
                  mobile: resp.data.mobile,
                });
              });
            });
          } else if (loginType === 'github') {
            axios({
              method: 'GET',
              url: `${server_url}/user/github`,
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }).then((res) => {
              axios({
                method: 'POST',
                url: 'http://localhost:4000/user/oauth',
                data: {
                  username: res.data.username,
                  email: res.data.email,
                  image: '',
                  mobile: '',
                },
              }).then((resp) => {
                setIsLogin(true);
                sessionStorage.setItem(
                  'userInfoSession',
                  JSON.stringify({
                    username: resp.data.username,
                    email: resp.data.email,
                    image: resp.data.image,
                    mobile: resp.data.mobile,
                  })
                );
                setUserInfo({
                  username: resp.data.username,
                  email: resp.data.email,
                  image: resp.data.image,
                  mobile: resp.data.mobile,
                });
              });
            });
          } else {
            setIsLogin(true);
            sessionStorage.setItem('isLoginSession', isLogin);
            sessionStorage.setItem('accessTokenSession', access_token);
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  useEffect(() => {
    const isLoginSession = sessionStorage.getItem('isLoginSession');
    const accessTokenSession = sessionStorage.getItem('accessTokenSession');
    if (isLoginSession) {
      setIsLogin(isLoginSession);
    }
    if (accessTokenSession) {
      setAccessToken(accessTokenSession);
    }
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      const loginType = sessionStorage.getItem('loginType');
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
        accessToken={accessToken1}
        setAccessToken={setAccessToken}
      />

      <Switch>
        <Route exact={true} path='/'>
          {!loginBtn && <LandingPage />}
        </Route>
        <Route path='/editpage'>{!loginBtn && <EditPage />}</Route>
        <Route path='/mypage'>
          <Mypage userInfo1={userInfo} setUserInfo={setUserInfo} />
        </Route>
      </Switch>
    </Router>
  );
}
