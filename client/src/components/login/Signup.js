import React, { useState } from "react";
import title from "../../images/title.png";
import loadingImg from "../../images/loading.gif";
import "../../css/login/Signup.css";
import axios from "axios";
const Signup = ({ signupBtn, setSignupBtn }) => {
  const [inputErr, setInputErr] = useState(false);
  const handleChange = (e) => {};
  const handleClick = (e) => {};
  return (
    <div className="signup-left-box">
      <div className="signup-title">
        <img src={title} alt="title"></img>
      </div>
      <div className="signup-input">
        <div>계정 만들기</div>
        <div className="signup-input-box">
          <label>이름</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="이름"
            onChange={handleChange}
          ></input>
        </div>
        <div className="signup-input-box">
          <label>이메일</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="이메일"
            onChange={handleChange}
          ></input>
        </div>
        <div className="signup-input-box">
          <label>비밀번호</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleChange}
          ></input>
        </div>
        <div className="signup-input-box">
          <label>비밀번호 확인</label>
          <input
            id="password2"
            type="password"
            name="password2"
            placeholder="비밀번호 확인"
            onChange={handleChange}
          ></input>
        </div>
        {inputErr ? (
          <div className="signup-errMsg">
            <div>잘못 입력 되었습니다.</div>
            <div>다시 한번 확인해 주세요.</div>
          </div>
        ) : null}
        <div className="signup-button-box">
          <div className="signup-btn button" onClick={handleClick}>
            시작하기
          </div>
          <div>
            <div className="signup-login">
              <span id="text">이미 가입하셨나요?</span>
              <span className="button" onClick={(e) => setSignupBtn(false)}>
                로그인
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
