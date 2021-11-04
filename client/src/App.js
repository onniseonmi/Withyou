import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditPage from "./Pages/EditPage";
import "./CSS/App.css";

export default function App() {
  const [isLogin, setLogin] = useState(false);
  return (
    <Router>
      <div>
        <nav>
          <img id="sm-logo" src="image/Logo_sm.png" alt="withyouLogo" />
          <div id="nav-menu">
            {!isLogin ? (
              // 로그인이 아닐 경우
              <div id="nav-user">
                <span id="nav-login">
                  <Link to="/login">Login</Link>
                </span>
                <span id="nav-join">
                  <Link to="/join">Join</Link>
                </span>
              </div>
            ) : (
              // 로그인 상태일 경우
              <div id="nav-user">
                <span id="nav-login">
                  <Link to="/logout">Logout</Link>
                </span>
                <span id="nav-join">
                  <Link to="/mypage">Mypage</Link>
                </span>
              </div>
            )}
          </div>
        </nav>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>
          <Route path="/">
            <EditPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// 이 부분들의 코드 분리하기
function Login() {
  return <h2>Login</h2>;
}

function Join() {
  return <h2>Join</h2>;
}
function Logout() {
  return <h2>Logout</h2>;
}

function Mypage() {
  return <h2>Mypage</h2>;
}
