import "./App.css";
import React, { useState } from "react";
import Login from "./components/modal/Login";
function App() {
  const [loginBtnOn, setLoginBtnOn] = useState(false);
  return (
    <div>
      <button onClick={(e) => setLoginBtnOn(true)}>Login</button>
      {loginBtnOn ? <Login setLoginBtnOn={setLoginBtnOn} /> : null}
    </div>
  );
}

export default App;
