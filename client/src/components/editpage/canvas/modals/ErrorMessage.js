import React from "react";
import "../../../../css/editpage/canvas/modals/Message.css";
export default function ErrorMessage({ setIsError }) {
  return (
    <div id="message-modal">
      로그인 후 이용해주세요
      <div className="save-modal-container">
        <button id="close-message-modal" onClick={() => setIsError(false)}>
          Close
        </button>
      </div>
    </div>
  );
}
