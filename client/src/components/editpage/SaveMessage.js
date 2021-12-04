import React from "react";
import "../../css/editpage/SaveMessage.css";
export default function SaveMessage({ setIsSave }) {
  return (
    <div id="save-modal">
      서버에 저장하였습니다.
      <br /> MyPage에서 확인해주세요.
      <br />
      <button id="close-save-modal" onClick={() => setIsSave(false)}>
        Close
      </button>
    </div>
  );
}
