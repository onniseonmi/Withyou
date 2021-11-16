import React, { useState, useEffect } from "react";
import "../css/Mypage.css";
import Footer from "../components/Footer";
import Myprofile from "../components/mypage/Myprofile";
import Mycard from "../components/mypage/Mycard";
const Mypage = ({ accessToken }) => {
  return (
    <div id="mypage">
      <div id="profile">
        <Myprofile />
      </div>
      <div id="cards">
        <Mycard />
      </div>
      <Footer />
    </div>
  );
};

export default Mypage;
