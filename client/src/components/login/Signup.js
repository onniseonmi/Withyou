import React, { useState } from "react";
import title from "../../images/title.png";
import "../../css/login/Signup.css";
import axios from "axios";
const server_url_1 = "http://localhost:4000";
const server_url_2 =
  "http://ec2-3-24-168-238.ap-southeast-2.compute.amazonaws.com:4000";

const Signup = ({ setLoginBtn, setIsLogin, setAccessToken, setSignupBtn }) => {
  const [inputErr, setInputErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    mobile: "",
    image: "",
  });

  const handleChange = (e) => {
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

  const handleClick = async (e) => {
    setPasswordErr(false);
    setInputErr(false);
    if (userInput.password !== userInput.password2) {
      setPasswordErr(true);
    } else if (
      userInput.username.trim() === "" ||
      userInput.email.trim() === "" ||
      userInput.password.trim() === ""
    ) {
      setInputErr(true);
    } else {
      setInputErr(false);
      try {
        const data = await axios({
          method: "POST",
          url: `${server_url_2}/user/signup`,
          data: userInput,
          // * 서버쪽 오류시, 에러 핸들링을 이렇게 가도 되려나?
        }).catch((err) => setInputErr(true));

        const tokenData = await axios({
          method: "POST",
          url: `${server_url_2}/user/signin`,
          data: { email: userInput.email, password: userInput.password },
        }).catch((err) => setInputErr(true));

        const { userInfo, accessToken } = tokenData.data;
        console.log("data");
        console.log(data.data);
        sessionStorage.setItem("isLoginSession", true);
        sessionStorage.setItem("accessTokenSession", accessToken);
        setIsLogin(true);
        setAccessToken(accessToken);
        setLoginBtn(false);
      } catch (err) {
        setInputErr(true);
      }
    }
  };

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
        {inputErr && (
          <div className="signup-errMsg">
            <div>잘못 입력 되었습니다.</div>
            <div>다시 한번 확인해 주세요.</div>
          </div>
        )}
        {passwordErr && (
          <div className="signup-errMsg">
            <div>비밀번호가 일치하지 않습니다.</div>
            <div>다시 한번 확인해 주세요.</div>
          </div>
        )}
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
