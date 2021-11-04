import React from "react";
import title from "../../images/title.png";
import loginModal from "../../images/loginModal.png";
import "../../css/Signup.css";
const Signup = ({ setSignupBtnOn }) => {
  return (
    <div className="signup-left-box">
      <div className="signup-title">
        {/* <img src={logo} alt="title-logo"></img> */}
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
          ></input>
        </div>
        <div className="signup-input-box">
          <label>이메일</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="이메일"
          ></input>
        </div>
        <div className="signup-input-box">
          <label>비밀번호</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호"
          ></input>
        </div>
        <div className="signup-input-box">
          <label>비밀번호 확인</label>
          <input
            id="password2"
            type="password"
            name="password2"
            placeholder="비밀번호 확인"
          ></input>
        </div>
        <div className="signup-errMsg">다시 한번 확인해 주세요</div>
        <div className="signup-button-box">
          <div className="signup-btn button">시작하기</div>
          <div>
            <div className="signup-login">
              <span>이미 가입하셨나요?</span>
              <span className="button" onClick={(e) => setSignupBtnOn(false)}>
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
