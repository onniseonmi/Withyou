import React from "react";
import "../../../../css/editpage/canvas/modals/BackgroundColor.css";
import templateImg from "../../../../images/template/sample.png";
const fakeData = [1, 2, 3, 4, 5, 6, 7, 8];
export default function BackgroundColor({ makeId, handleCanvasColor }) {
  return (
    <div id="template-modal">
      <div id="template-modal-nav" className="edit--menu-title">
        <div>BackgroundColor</div>
        <div>원하는 배경색을 선택하세요</div>
      </div>
      <div id="template-modal-upload">
        {fakeData.map((el) => (
          <img
            key={makeId()}
            src={templateImg}
            alt={el}
            onClick={() => {
              handleCanvasColor({ hex: "#000000" });
            }}
          />
        ))}
      </div>
    </div>
  );
}
