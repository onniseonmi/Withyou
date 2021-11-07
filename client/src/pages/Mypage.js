import React from "react";
import sample from "../images/template/sample.png";
import "../css/Mypage.css";
import withyou from "../images/title.png";
import cat from "../images/cat.png";

const Mypage = ({ email, username, mobile }) => {
  return (
    <div id="mypage">
      <div id="profile">
        <div>
          <div id="profile-title">⭐️ My Profile</div>
          <div id="profile-content">
            <div id="photo">
              <img id="user-photo" src={cat} />
            </div>
            <div id="userinfo">
              <div id="e-mail">💫 email : {email}</div>
              <div id="username">💫 username : {username}</div>
              <div id="mobile">💫 mobile : {mobile}</div>
            </div>
          </div>
        </div>
        <button id="edit-button">Edit</button>
      </div>
      <div id="cards">
        <div>
          <div id="card-title">⭐️ My Card</div>
          <div className="card-row">
            <img className="card" src={sample} alt="sample" />
            <img className="card" src={sample} alt="sample" />
            <img className="card" src={sample} alt="sample" />
          </div>
          <div className="card-row">
            <img className="card" src={sample} alt="sample" />
            <img className="card" src={sample} alt="sample" />
            <img className="card" src={sample} alt="sample" />
          </div>
        </div>
        <button id="edit-button">Edit</button>
      </div>
      <footer>
        <div id="footer-title">
          Made by withyou
          <img id="withyou" src={withyou} />
        </div>
        <div id="footer-rows">
          <div className="footer-row">
            <div>최선미</div>
            <div>박덕원</div>
          </div>
          <div className="footer-row">
            <div>김남현</div>
            <div>윤대희</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Mypage;
