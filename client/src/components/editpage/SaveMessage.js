import React from "react";
import "../../css/editpage/Message.css";
export default function SaveMessage({ setIsSave }) {
  return (
    <div id="massage-modal">
      서버에 저장하였습니다.
      <br /> MyPage에서 확인해주세요.
      <br />
      <button id="close-massage-modal" onClick={() => setIsSave(false)}>
        Close
      </button>
    </div>
  );
}
