import React from "react";
import "../../../../css/editpage/canvas/modals/Elements.css";
import addImg from "../../../../images/add_image.png";
const fakeData = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Elements({ addToItems, makeId }) {
  return (
    <div id="elements-modal">
      <div id="elements-modal-nav" className="edit--menu-title">
        <div id="title">이것저것</div>
        <div id="content">원하는 것들을 선택해주세요.</div>
      </div>

      <div id="elements-modal-upload">
        {fakeData.map((el) => (
          <img
            key={makeId()}
            src={addImg}
            alt={el}
            onClick={() => {
              addToItems(addImg, "image");
            }}
          />
        ))}
      </div>
    </div>
  );
}
