import React from 'react';
import '../../css/editpage/SaveMessage.css';
export default function SaveMessage({ setIsSave }) {
  return (
    <div id='save-modal'>
      <strong>
        <h3>서버에 저장하였습니다.</h3>
      </strong>

      <h5>MyPage에서 확인해주세요.</h5>
      <div className='save-modal-container'>
        <button id='close-save-modal' onClick={() => setIsSave(false)}>
          Close
        </button>
      </div>
    </div>
  );
}
