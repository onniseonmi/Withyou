import React from "react";
import "../../css/mypage/Mycard.css";
import sample from "../../images/template/sample.png";

const Mycard = () => {
  return (
    <div>
      <div className="mypage-title">⭐️ My Card</div>
      <div className="card-box">
        <div>
          <div className="card">
            <img src={sample} alt="sample" />
          </div>
          <div className="card">
            <img src={sample} alt="sample" />
          </div>
          <div className="card">
            <img src={sample} alt="sample" />
          </div>
          <div className="card">
            <img src={sample} alt="sample" />
          </div>
          <div className="card">
            <img src={sample} alt="sample" />
          </div>
          <div className="card">
            <img src={sample} alt="sample" />
          </div>
        </div>
      </div>
      <div className="edit-image mypage-button">
        <button id="btn-editImg">Edit</button>
      </div>
    </div>
  );
};

export default Mycard;
