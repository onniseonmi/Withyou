import React from "react";
import axios from "axios";
import github from "../../../images/github.png";
import naver from "../../../images/naver.png";
import kakao from "../../../images/kakao.png";
const Oauth = () => {
  const naverLogin = () => {};
  const kakaoLogin = () => {};
  return (
    <div className="login-oauth">
      <div className="oauth-box">
        <div>
          <img id="github-logo" src={github} alt="google"></img>
        </div>
        <div className="oauth-name button">깃허브 로그인</div>
      </div>
      <div className="oauth-box">
        <div>
          <img id="naver-logo" src={naver} alt="naver"></img>
        </div>
        <div className="oauth-name button" onClick={naverLogin}>
          네이버 로그인
        </div>
      </div>
      <div className="oauth-box">
        <div>
          <img id="kakao-logo" src={kakao} alt="kakao"></img>
        </div>
        <div className="oauth-name button" onClick={kakaoLogin}>
          카카오 로그인
        </div>
      </div>
    </div>
  );
};

export default Oauth;
