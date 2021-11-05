import React, { useState } from "react";
import title from "../../../images/title.png";
import loadingImg from "../../../images/loading.gif";
import "../../../css/Signup.css";
import axios from "axios";
const Signup = ({ setSignupBtnOn, setLoginBtnOn }) => {
  const [loading, setLoading] = useState(true);
  const [signupErr, setSignupErr] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    mobile: "",
    image: "",
  });
  const inputChange = (e) => {
    if (e.target.name === "username") {
      setUserInput({
        ...userInput,
        username: e.target.value,
      });
    } else if (e.target.name === "email") {
      setUserInput({
        ...userInput,
        email: e.target.value,
      });
    } else if (e.target.name === "password") {
      setUserInput({
        ...userInput,
        password: e.target.value,
      });
    } else if (e.target.name === "password2") {
      setUserInput({
        ...userInput,
        password2: e.target.value,
      });
    }
  };
  const signupHandler = async (e) => {
    if (userInput.password !== userInput.password2) {
      setSignupErr(true);
    } else if (
      userInput.username.trim() === "" ||
      userInput.email.trim() === "" ||
      userInput.password.trim() === ""
    ) {
      setSignupErr(true);
    } else {
      setSignupErr(false);
      try {
        const data = await axios({
          method: "POST",
          url: "http://localhost:4000/user/signup",
          data: userInput,
        });
        const tokenData = await axios({
          method: "POST",
          url: "http://localhost:4000/user/signin",
          data: { email: userInput.email, password: userInput.password },
        });
        setLoginBtnOn(false);
      } catch (err) {
        setSignupErr(true);
      }
    }
  };
  return (
    <div className="signup-left-box">
      {/* {loading ? (
        <div className="loading-page">
          <img src={loadingImg} alt="loading..."></img>
        </div>
      ) : null} */}
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
            onChange={inputChange}
          ></input>
        </div>
        <div className="signup-input-box">
          <label>이메일</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="이메일"
            onChange={inputChange}
          ></input>
        </div>
        <div className="signup-input-box">
          <label>비밀번호</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={inputChange}
          ></input>
        </div>
        <div className="signup-input-box">
          <label>비밀번호 확인</label>
          <input
            id="password2"
            type="password"
            name="password2"
            placeholder="비밀번호 확인"
            onChange={inputChange}
          ></input>
        </div>
        {signupErr ? (
          <div className="signup-errMsg">
            <div>잘못 입력 되었습니다.</div>
            <div>다시 한번 확인해 주세요.</div>
          </div>
        ) : null}
        <div className="signup-button-box">
          <div className="signup-btn button" onClick={signupHandler}>
            시작하기
          </div>
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
