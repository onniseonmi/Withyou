import React, { useEffect } from 'react';
import axios from 'axios';
const server_url_2 = 'http://localhost:4000';
const server_url_2 =
  'http://ec2-3-24-168-238.ap-southeast-2.compute.amazonaws.com:4000';

export const DeleteAccount = () => {
  const accessToken = sessionStorage.getItem('accessTokenSession');
  console.log('accessToken');
  console.log(accessToken);
  const deleteAccount = async (accessToken) => {
    console.log('삭제???');
    await axios.get(`${server_url_2}/user/delete`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // sessionStorage.removeItem('accessTokenSession');
  };
  return (
    <div className='delete-account-container'>
      <button onClick={deleteAccount(accessToken)}>회원탈퇴</button>
    </div>
  );
};
