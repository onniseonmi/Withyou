import React from "react";
import "../../../../css/editpage/canvas/modals/ElementsModal.css";
import addImg from "../../../../images/add_image.png";
const fakeData = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Elements({ addToItems, makeId }) {
  return (
    <div id="elements-modal">
      <div id="elements-modal-nav" className="edit--menu-title">
        <div>Elements</div>
        <div>원하는 것을 선택하세요</div>
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
