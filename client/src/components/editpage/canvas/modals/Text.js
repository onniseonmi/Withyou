import React from "react";
import "../../../../css/editpage/canvas/modals/TextModal.css";
import templateImg from "../../../../images/template/sample.png";
const fakeData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Text() {
  return (
    <div id="text-modal">
      <div id="text-modal-nav" className="edit--menu-title">
        <div>Text</div>
        <div>원하는 텍스트를 입력하세요</div>
      </div>
      <div id="text-modal-upload">
        <div className="text-setting text-input">
          <input placeholder="텍스트를 입력하세요"></input>
          <button>텍스트 추가</button>
        </div>
        <div className="text-setting text-font">
          <div>글꼴</div>
          <div></div>
        </div>
        <div className="text-setting text-size">
          <div>크기</div>
          <div></div>
        </div>
        <div className="text-setting text-color">
          <div>색깔</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
