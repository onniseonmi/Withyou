import React from "react";
import "../../../../css/editpage/canvas/modals/Message.css";
export default function ServerErrorMessage({ setIsServerError }) {
  return (
    <div id="message-modal">
      죄송합니다. 오류가 발생했어요.
      <br />
      문제를 수정중이에요.
      <div className="save-modal-container">
        <button
          id="close-message-modal"
          onClick={() => setIsServerError(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
