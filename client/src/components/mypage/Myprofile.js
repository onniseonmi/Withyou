import React, { useState } from "react";
import axios from "axios";
import addImg from "../../images/add_image.png";
import "../../css/Myprofile.css";
const Myprofile = ({ userInfo, setUserInfo }) => {
  const userInfoSession = JSON.parse(sessionStorage.getItem("userInfoSession"));
  const accessToken = sessionStorage.getItem("accessTokenSession");
  const { username, email, mobile, image } = userInfo;
  const [editBtnOn, setEditBtnOn] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState({
    username: userInfoSession.username,
    mobile: userInfoSession.mobile,
    image: userInfoSession.image,
  });
  const handleClick = async (e) => {
    if (e.target.id === "btn-edit") {
      setEditBtnOn(true);
    } else if (e.target.id === "btn-save") {
      const data = axios({
        method: "POST",
        url: "http://localhost:4000/user/edit",
        data: {
          username: editUserInfo.username,
          mobile: editUserInfo.mobile,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserInfo({
        ...userInfo,
        username: editUserInfo.username,
        mobile: editUserInfo.mobile,
      });
      setEditBtnOn(false);
    } else if (e.target.id === "btn-cancel") {
      setEditUserInfo({
        username: userInfo.username,
        mobile: userInfo.mobile,
        image: userInfo.image,
      });
      setEditBtnOn(false);
    }
  };
  const handleChange = (e) => {
    if (e.target.id === "username") {
      setEditUserInfo({
        ...editUserInfo,
        username: e.target.value,
      });
    } else if (e.target.id === "mobile") {
      setEditUserInfo({
        ...editUserInfo,
        mobile: e.target.value,
      });
    }
  };
  return (
    <div>
      <div className="mypage-title">⭐️ My Profile</div>
      {editBtnOn ? (
        <div id="profile-content">
          <div className="profile-image">
            <img
              id="image"
              src={image === undefined || image === "" ? addImg : image}
            />
          </div>
          <div className="userinfo">
            <div id="e-mail" className="row">
              <span>💫 email : </span>
              <span>{email}</span>
            </div>
            <div id="username" className="row">
              <span>💫 username : </span>
              <input
                id="username"
                type="text"
                value={editUserInfo.username}
                onChange={handleChange}
              ></input>
            </div>
            <div id="mobile" className="row">
              <span>💫 mobile : </span>
              <input
                id="mobile"
                type="text"
                value={editUserInfo.mobile}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="edit-profile mypage-button">
            <button id="btn-save" onClick={handleClick}>
              save
            </button>
            <button id="btn-cancel" onClick={handleClick}>
              cancel
            </button>
          </div>
        </div>
      ) : (
        <div id="profile-content">
          <div className="profile-image">
            <label for="add-image">
              <img src={image === "" || image === undefined ? addImg : image} />
            </label>
            <input
              type="file"
              id="add-image"
              accept="image/png, image/jpeg"
              style={{
                display: "none",
              }}
              onChange={(ev) => {
                var reader = new FileReader();
                reader.onload = (e) => {
                  setUserInfo({
                    ...userInfo,
                    image: e.target.result,
                  });
                };
                reader.readAsDataURL(ev.target.files[0]);
              }}
            ></input>
          </div>
          <div className="userinfo">
            <div id="e-mail" className="row">
              <span>💫 email : </span>
              <span>{email}</span>
            </div>
            <div id="username" className="row">
              <span>💫 username : </span>
              <span>{username}</span>
            </div>
            <div id="mobile" className="row">
              <span>💫 mobile : </span>
              <span>{mobile}</span>
            </div>
          </div>
          <div className="edit-profile mypage-button">
            <button id="btn-edit" onClick={handleClick}>
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myprofile;
