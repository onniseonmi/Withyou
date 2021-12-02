import React from "react";
import "../css/Mypage.css";
import Footer from "../components/Footer";
import Myprofile from "../components/mypage/Myprofile";
import Mycard from "../components/mypage/Mycard";
const Mypage = () => {
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
