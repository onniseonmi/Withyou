import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EditPage from './pages/EditPage';
import LandingPage from './pages/LandingPage';
import Mypage from './pages/Mypage';
import Nav from './components/Nav';
import './css/App.css';

import Login from './components/modals/auth/Login';

export default function App() {
  const [isLogin, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  return (
    <Router>
      <Nav isLogin={isLogin} />
      <Switch>
        <Route exact={true} path='/'>
          <LandingPage />
        </Route>
        <Route path='/editpage'>
          <EditPage />
        </Route>
        <Route path='/mypage'>
          <Mypage accessToken={accessToken} />
        </Route>
      </Switch>
    </Router>
  );
}
