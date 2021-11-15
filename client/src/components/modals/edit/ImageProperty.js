import React, { useState } from "react";
import "../../../css/PropertyModal.css";
export default function ImageProperty({ width, resizeWidth }) {
  const [currentSize, setCurrentSize] = useState(width.slice(0, -3));

  function increaseValue() {
    const nextState = String(+currentSize + 0.5);
    setCurrentSize(nextState);
    resizeWidth(String(nextState) + "rem");
  }

  function decreaseValue() {
    const nextState = String(+currentSize - 0.5);
    setCurrentSize(nextState);
    resizeWidth(String(nextState) + "rem");
  }

  return (
    <div id="property-modal">
      Edit Detail
      <div id="property-box">
        <div className="control-box">
          <div>크기</div>
          <div>
            <button class="resize-button" onClick={() => decreaseValue()}>
              -
            </button>
            <input type="text" value={currentSize} />
            <button class="resize-button" onClick={() => increaseValue()}>
              +
            </button>
          </div>
        </div>
        <div className="control-box">
          <div>회전</div>
          <input type="text"></input>
        </div>
      </div>
    </div>
  );
}

// 여기서 값을 변화시키면, editpage의 상태가 변화해야 한다.

// 그러기 위해서는 EditPage에서 상태를 변화시키는 함수들을 내려줘서, 그것들을 값으로 넣어주는 식으로 해야 함.
