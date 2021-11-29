import React from "react";
import "../../../../css/editpage/canvas/modals/Text.css";
const fakeData = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Text({ addToItems }) {
  return (
    <div id="text-modal">
      <div id="text-modal-nav" className="edit--menu-title">
        <div id="title">문구 입력하기</div>
        <div id="content">원하는 문구를 입력해주세요.</div>
      </div>
      <div id="text-modal-upload">
        <div id="text-input">
          <button
            id="text-button"
            onClick={() => {
              addToItems("", "text");
            }}
          >
            문구 추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
