import React from "react";
import "../../../../css/editpage/canvas/modals/TextModal.css";
const fakeData = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Text({ addToItems }) {
  return (
    <div id="text-modal">
      <div id="text-modal-nav" className="edit--menu-title">
        <div>Text</div>
        <div>원하는 텍스트를 입력하세요</div>
      </div>
      <div id="text-modal-upload">
        <div className="text-setting text-input">
          <button
            onClick={() => {
              addToItems("", "text");
            }}
          >
            텍스트 추가
          </button>
        </div>
      </div>
    </div>
  );
}
