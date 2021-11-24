import React from "react";
import "../../../../css/editpage/canvas/modals/TemplateModal.css";
import templateImg from "../../../../images/template/sample.png";
const fakeData = [1, 2, 3, 4, 5, 6, 7, 8];
export default function Template({ addToItems, makeId }) {
  function addToCanvas(img) {
    addToItems(img);
  }
  return (
    <div id="template-modal">
      <div id="template-modal-nav" className="edit--menu-title">
        <div>Template</div>
        <div>원하는 템플릿을 선택하세요</div>
      </div>
      <div id="template-modal-upload">
        {fakeData.map((el) => (
          <img
            key={makeId()}
            src={templateImg}
            alt={el}
            onClick={() => {
              addToCanvas(templateImg);
            }}
          />
        ))}
      </div>
    </div>
  );
}
