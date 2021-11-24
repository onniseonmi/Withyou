import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import addImg from '../../images/add_image.png';
import '../../css/mypage/Myprofile.css';
const server_url = 'http://localhost:4000';
const Myprofile = () => {
  const accessToken = sessionStorage.getItem('accessTokenSession');
  const imgInputRef = useRef();
  const [editBtn, setEditBtn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    mobile: '',
    image: '',
  });
  const [userInput, setUserInput] = useState({
    username: '',
    mobile: '',
    image: '',
  });
  const { username, email, mobile, image } = userInfo;
  const handleClick = async (e) => {
    if (e.target.id === 'btn-edit') {
      setEditBtn(true);
    } else if (e.target.id === 'btn-save') {
      try {
        const data = await axios({
          method: 'POST',
          url: `${server_url}/profile`,
          data: {
            username: userInput.username,
            mobile: userInput.mobile,
          },
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
        setUserInfo({
          ...userInfo,
          email: data.data.email,
          username: data.data.username,
          mobile: data.data.mobile,
        });
        setUserInput({
          ...userInput,
          username: data.data.username,
          mobile: data.data.mobile,
        });
      } catch (err) {}
      setEditBtn(false);
    } else if (e.target.id === 'btn-cancel') {
      setUserInput({
        username: userInfo.username,
        mobile: userInfo.mobile,
        image: userInfo.image,
      });
      setEditBtn(false);
    }
  };
  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };

  useEffect(async () => {
    if (accessToken) {
      const loginType = sessionStorage.getItem('loginType');
      try {
        if (loginType === 'kakao') {
          axios({
            method: 'GET',
            url: `${server_url}/user/kakao`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((res) => {
            setUserInfo({
              ...userInfo,
              username: res.data.username,
              email: res.data.email,
              image: res.data.image,
            });
            setUserInput({
              username: res.data.username,
              mobile: res.data.mobile,
              image: res.data.image,
            });
          });
        } else if (loginType === 'naver') {
          axios({
            method: 'GET',
            url: `${server_url}/user/naver`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((res) => {
            setUserInfo({
              ...userInfo,
              username: res.data.username,
              email: res.data.email,
              image: res.data.image,
              mobile: res.data.mobile,
            });
            setUserInput({
              username: res.data.username,
              mobile: res.data.mobile,
              image: res.data.image,
            });
          });
        } else if (loginType === 'github') {
          axios({
            method: 'GET',
            url: `${server_url}/user/github`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((res) => {
            setUserInfo({
              ...userInfo,
              username: res.data.username,
              email: res.data.email,
            });
            setUserInput({
              username: res.data.username,
              mobile: res.data.mobile,
              image: res.data.image,
            });
          });
        } else {
          axios({
            method: 'GET',
            url: `${server_url}/profile`,
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }).then((res) => {
            setUserInfo({
              username: res.data.username,
              email: res.data.email,
              mobile: res.data.mobile,
              image: res.data.image,
            });
            setUserInput({
              username: res.data.username,
              mobile: res.data.mobile,
              image: res.data.image,
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  const pofileImgHandler = async (event) => {
    let reader = new FileReader();
    // reader.onloadend = async () => {
    //   // 2. 읽기가 완료되면 아래코드가 실행됩니다.
    //   // const base64 = reader.result;
    //   // if (base64) {
    //   //   setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
    //   // }
    // };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
    }

    // multer s3 통신해서 프로필 사진 변경
    const formData = new FormData();
    formData.append('img', event.target.files[0]);

    const accessTokenSession = sessionStorage.getItem('accessTokenSession');
    console.log('accessTokenSession');
    console.log(accessTokenSession);

    const res = await axios.put(`${server_url}/profile/image`, formData, {
      headers: {
        authorization: `Bearer ${accessTokenSession}`,
        'content-type': 'multipart/form-data boundary=something',
      },
      withCredentials: true,
    });
    setUserInfo({ ...userInfo, image: res.data.image });
  };
  return (
    <div>
      <div className='mypage-title'>⭐️ My Profile</div>
      {editBtn ? (
        <div id='profile-content'>
          <div className='profile-image'>
            <div>
              <img
                src={userInfo.image ? userInfo.image : addImg}
                alt='#'
                style={{ pointerEvents: 'none' }}
              />
            </div>

            <label htmlFor='add-image' onChange={pofileImgHandler}>
              +
            </label>

            <input
              ref={imgInputRef}
              type='file'
              id='add-image'
              // accept='image/png, image/jpeg, image/svg'
              style={{
                display: 'none',
              }}
              onChange={pofileImgHandler}
            ></input>
          </div>
          <div className='userinfo'>
            <div id='e-mail' className='row'>
              <span>💫 email : </span>
              <span>{email}</span>
            </div>
            <div id='username' className='row'>
              <span>💫 username : </span>
              <input
                id='username'
                type='text'
                value={userInput.username}
                onChange={handleChange}
              ></input>
            </div>
            <div id='mobile' className='row'>
              <span>💫 mobile : </span>
              <input
                id='mobile'
                type='text'
                value={userInput.mobile}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className='edit-profile mypage-button'>
            <button id='btn-save' onClick={handleClick}>
              save
            </button>
            <button id='btn-cancel' onClick={handleClick}>
              cancel
            </button>
          </div>
        </div>
      ) : (
        <div id='profile-content'>
          <div className='profile-image'>
            <img
              id='image'
              src={userInfo.image ? userInfo.image : addImg}
              alt='#'
              style={{
                pointerEvents: 'none',
              }}
            />
          </div>
          <div className='userinfo'>
            <div id='e-mail' className='row'>
              <span>💫 email : </span>
              <span>{email}</span>
            </div>
            <div id='username' className='row'>
              <span>💫 username : </span>
              <span>{username}</span>
            </div>
            <div id='mobile' className='row'>
              <span>💫 mobile : </span>
              <span>{mobile}</span>
            </div>
          </div>
          <div className='edit-profile mypage-button'>
            <button id='btn-edit' onClick={handleClick}>
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myprofile;
