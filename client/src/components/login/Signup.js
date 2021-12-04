import React, { useState, useRef } from "react";
import title from "../../images/title.png";
import "../../css/login/Signup.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

axios.default.withCredentials = true;
const server_url_1 = "http://localhost:4000";
const server_url_2 =
  "http://ec2-3-24-168-238.ap-southeast-2.compute.amazonaws.com:4000";

const Signup = ({
  setLoginBtn,
  setIsLogin,
  setAccessToken,
  setSignupBtn,
  setLandingOn,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({});

  const passwordValidation = useRef({});
  passwordValidation.current = watch("password", "");

  const [errMessage, setErrMessage] = useState("");
  const [errModal, setErrModal] = useState(false);
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
  console.log("errMessage");
  console.log(errMessage);
  const handleClick = async (e) => {
    if (userInput.password !== userInput.password2) {
      setErrModal(true);
      setErrMessage("비밀번호가 일치하지 않습니다");
    } else if (
      userInput.username === "" ||
      userInput.email === "" ||
      userInput.password === ""
    ) {
      setErrModal(true);
      setErrMessage("모든 항목은 필수입니다");
      console.log("errMessage");
      console.log(errMessage);
    } else {
      setErrModal(false);
      setErrMessage("");
      try {
        const data = await axios({
          method: "POST",
          url: `${server_url_2}/user/signup`,
          data: userInput,
        });

        if (data.data.message !== "ok") {
          setIsLogin(false);
          setErrModal(true);
          setErrMessage("이미 존재하는 이메일 입니다");
          setUserInput({
            username: "",
            email: "",
            password: "",
            password2: "",
            mobile: "",
            image: "",
          });
        } else {
          const tokenData = await axios({
            method: "POST",
            url: `${server_url_2}/user/signin`,
            data: { email: userInput.email, password: userInput.password },
          });

          const { accessToken } = tokenData.data;

          sessionStorage.setItem("isLoginSession", true);
          sessionStorage.setItem("accessTokenSession", accessToken);
          setIsLogin(true);
          setAccessToken(accessToken);
          setLoginBtn(false);
        }
      } catch (err) {
        setErrModal(true);
        setErrMessage("모든 항목은 필수예요");
      }
    }
  };

  const errHandleClick = (event) => {
    const { name } = event.target;
    Object.entries(errors).map((error) => {
      console.log("maperror");
      console.log(error[0]);
      console.log(error[1].message);
      if (name === error[0]) {
        setErrModal(true);
        setErrMessage(error[1].message);
      } else if (name === error[0]) {
        console.log("user");
        console.log(name);
        setErrModal(true);
        setErrMessage(error[1].message);
      } else if (name === error[0]) {
        setErrModal(true);
        setErrMessage(error[1].message);
      } else if (name === error[0]) {
        setErrModal(true);
        setErrMessage(error[1].message);
      }
    });
  };

  return (
    <div className="signup-left-box">
      <Link to="/">
        <div className="signup-title">
          <div
            onClick={() => {
              setLandingOn(true);
              setLoginBtn(false);
              setSignupBtn(false);
            }}
          >
            Withyou
          </div>
        </div>
      </Link>
      <div className="signup-input">
        <div>계정 만들기</div>
        <form
          className="signup-input-form"
          method="POST"
          onClick={handleSubmit(handleClick)}
        >
          <div className="signup-input-box">
            <label>이름</label>
            <input
              {...register("username", {
                required: "유저이름을 입력하세요",
                minLength: {
                  value: 3,
                  message: "3자 이상 입력하셔야 합니다",
                },
              })}
              type="text"
              name="username"
              value={userInput.username}
              onChange={handleChange}
              onMouseOver={errHandleClick}
              placeholder="유저이름을 입력하세요"
            />
          </div>
          <div className="signup-input-box">
            <label>이메일</label>
            <input
              {...register("email", {
                required: "이메일을 입력하세요",
                pattern: {
                  value: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "유효한 이메일 주소를 입력하세요",
                },
              })}
              type="email"
              name="email"
              value={userInput.email}
              onChange={handleChange}
              onMouseOver={errHandleClick}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="signup-input-box">
            <label>비밀번호</label>
            <input
              {...register("password", {
                required: "고유한 비밀번호를 입력하셔야 합니다",
                minLength: {
                  value: 4,
                  message: "4자 이상 입력하셔야 합니다",
                },
              })}
              id="password"
              type="password"
              name="password"
              value={userInput.password}
              onChange={handleChange}
              onMouseOver={errHandleClick}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="signup-input-box">
            <label>비밀번호 확인</label>

            <input
              {...register("password2", {
                required: "고유한 비밀번호를 입력하세요",
                validate: (value) =>
                  value === passwordValidation.current ||
                  "비밀번호가 일치하지 않아요",
              })}
              id="password2"
              type="password"
              name="password2"
              value={userInput.password2}
              onChange={handleChange}
              onMouseOver={errHandleClick}
              placeholder="다시 한번 더 입력하세요"
            />
          </div>
          {errModal && (
            <div className="signup-errMsg">
              <div>{errMessage}</div>
            </div>
          )}
          <div className="signup-button-box">
            <input
              type="submit"
              className="signup-btn button"
              value="시작하기"
            ></input>
            <div className="signup-login-container">
              <div className="signup-login">
                <span id="signup-text">이미 가입하셨나요?</span>
                <span className="button" onClick={(e) => setSignupBtn(false)}>
                  로그인
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
