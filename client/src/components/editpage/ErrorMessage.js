import React from "react";
import "../../css/editpage/Message.css";
export default function ErrorMessage({ setIsError }) {
  return (
    <div id="massage-modal">
      회원가입 후 사용 가능한 메뉴입니다.
      <br /> 로그인 후 확인해주세요.
      <br />
      <button id="close-massage-modal" onClick={() => setIsError(false)}>
        Close
      </button>
    </div>
  );
}
