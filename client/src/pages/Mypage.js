import React, { useState } from "react";
import "../css/Mypage.css";
import Footer from "../components/Footer";
import Myprofile from "../components/mypage/Myprofile";
import Mycard from "../components/mypage/Mycard";
const Mypage = () => {
  const [editCardBtn, setCardEditBtn] = useState(false);
  const [editProfileBtn, setProfileEditBtn] = useState(false);
  return (
    <div id="mypage">
      <div id="profile">
        <Myprofile
          editProfileBtn={editProfileBtn}
          setCardEditBtn={setCardEditBtn}
          setProfileEditBtn={setProfileEditBtn}
        />
      </div>
      <div id="cards">
        <Mycard
          editCardBtn={editCardBtn}
          setCardEditBtn={setCardEditBtn}
          setProfileEditBtn={setProfileEditBtn}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Mypage;
