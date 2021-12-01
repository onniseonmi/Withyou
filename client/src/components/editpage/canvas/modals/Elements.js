import React from "react";
import "../../../../css/editpage/canvas/modals/Elements.css";
import addImg from "../../../../images/add_image.png";
import sample_1 from "../../../../images/cards/sample 1.png";
import sample_2 from "../../../../images/cards/sample 2.png";
import sample_3 from "../../../../images/cards/sample 3.png";
import sample_4 from "../../../../images/cards/sample 4.png";
import sample_5 from "../../../../images/cards/sample 5.png";
import sample_6 from "../../../../images/cards/sample 6.png";
import sample_7 from "../../../../images/cards/sample 7.png";
import sample_8 from "../../../../images/cards/sample 8.png";
const fakeData = [
  { src: sample_1 },
  { src: sample_2 },
  { src: sample_3 },
  { src: sample_4 },
  { src: sample_5 },
  { src: sample_6 },
  { src: sample_7 },
  { src: sample_8 },
];

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
            src={el.src}
            alt={el.src}
            onClick={() => {
              addToItems(el.src, "image");
            }}
          />
        ))}
      </div>
    </div>
  );
}
