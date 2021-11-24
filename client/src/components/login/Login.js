import React, { useState } from 'react';
import '../../css/login/Login.css';
import loginModal from '../../images/loginModal.png';
import title from '../../images/title.png';
import Signup from '../login/Signup';
import Oauth from '../login/Oauth';
import axios from 'axios';
const server_url = 'http://localhost:4000';
const Login = ({
  isLogin,
  setIsLogin,
  loginBtn,
  setLoginBtn,
  signupBtn,
  setSignupBtn,
  accessToken,
  setAccessToken,
}) => {
  const [inputErr, setInputErr] = useState(false);
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = async (e) => {
    try {
      const data = await axios({
        method: 'POST',
        url: 'http://localhost:4000/user/signin',
        data: userInput,
      });
      const { userInfo, accessToken } = data.data;
      sessionStorage.setItem('isLoginSession', true);
      sessionStorage.setItem('accessTokenSession', accessToken);
      setIsLogin(true);
      setAccessToken(accessToken);
      setLoginBtn(false);
    } catch (err) {
      setInputErr(true);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <div
          className='close-btn button'
          onClick={() => {
            setSignupBtn(false);
            setLoginBtn(false);
          }}
        >
          X
        </div>
        {signupBtn ? (
          <Signup signupBtn={signupBtn} setSignupBtn={setSignupBtn} />
        ) : (
          <div className='login-left-box'>
            <div className='login-title modal-title'>
              <img src={title} alt='title'></img>
            </div>
            <div className='login-input'>
              <div>계정 로그인</div>
              <div className='login-input-box'>
                <input
                  id='email'
                  type='text'
                  name='email'
                  placeholder='이메일'
                  onChange={handleChange}
                ></input>
                <label>이메일</label>
              </div>
              <div className='login-input-box'>
                <input
                  id='password'
                  type='password'
                  name='password'
                  placeholder='비밀번호'
                  onChange={handleChange}
                ></input>
                <label>비밀번호</label>
              </div>
              {inputErr ? (
                <div className='login-errMsg'>
                  <div>아이디 또는 비밀번호가 잘못 입력 되었습니다. </div>
                  <div>아이디와 비밀번호를 정확히 입력해 주세요.</div>
                </div>
              ) : null}
              <div className='login-button-box'>
                <div className='login-btn button' onClick={handleClick}>
                  로그인
                </div>
                <div>
                  <div className='login-forgot-password'>
                    <span className='button'>암호를 잊어버리셨나요?</span>
                  </div>
                  <div className='login-signup'>
                    <span>처음 오셨나요?</span>
                    <span
                      className='button'
                      onClick={(e) => {
                        setSignupBtn(true);
                      }}
                    >
                      가입하기
                    </span>
                  </div>
                </div>
              </div>
              <Oauth />
            </div>
          </div>
        )}
        <div className='login-right-box'>
          <img src={loginModal} alt='loginModal-img'></img>
        </div>
      </div>
    </div>
  );
};

export default Login;
