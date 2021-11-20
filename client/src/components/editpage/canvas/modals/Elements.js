import React from "react";
import "../../../../css/editpage/canvas/modals/ElementsModal.css";
import addImg from "../../../../images/add_image.png";
const fakeData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Elements() {
  return (
    <div id="elements-modal">
      <div id="elements-modal-nav" className="edit--menu-title">
        <div>Elements</div>
        <div>원하는 것을 선택하세요</div>
      </div>

      <div id="elements-modal-upload">
        {fakeData.map((el) => (
          <img
            src={addImg}
            alt={el}
            onClick={
              // TODO : 누르면 템플릿 적용되도록 구현
              // 그 후 닫힘
              console.log("엘리먼트 추가")
            }
          />
        ))}
      </div>
    </div>
  );
}
