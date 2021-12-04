import React, { useState } from 'react';
import axios from 'axios';
import { DeleteAccountModal } from './DeleteAccountModal';

export const DeleteAccount = ({ setDeleteBtn }) => {
  return (
    <div className='delete-account-container'>
      <button onClick={() => setDeleteBtn(true)}>회원탈퇴</button>
    </div>
  );
};
