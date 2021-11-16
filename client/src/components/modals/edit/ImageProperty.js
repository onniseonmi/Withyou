import React, { useState } from "react";
import "../../../css/modals/edit/ImageProperty.css";
export default function ImageProperty({
  width,
  resizeWidth,
  rotateObject,
  transform,
  removeObject,
}) {
  const [currentSize, setCurrentSize] = useState(width);
  const [currentRotate, setCurrentRotate] = useState(
    transform.slice(7).slice(0, -4)
  );

  // TODO : 입력으로도 바꿀 수 있도록 수정하기
  function increaseValue() {
    const nextState = currentSize + 5;
    setCurrentSize(nextState);
    resizeWidth(nextState);
  }

  function decreaseValue() {
    const nextState = currentSize - 5;
    setCurrentSize(nextState);
    resizeWidth(nextState);
  }

  function rotateClockSide() {
    const nextState = String(+currentRotate + 10);
    setCurrentRotate(nextState);
    rotateObject(`rotate(${nextState}deg)`);
  }

  function rotateDeClockSide() {
    const nextState = String(+currentRotate - 10);
    setCurrentRotate(nextState);
    rotateObject(`rotate(${nextState}deg)`);
  }
  return (
    <div id="property-modal">
      <div id="property-title-button">
        <div>Edit Detail</div>
        <button id="delete-button" onClick={() => removeObject()}>
          Delete
        </button>
      </div>
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
          <div>
            <button class="rotate-button" onClick={() => rotateDeClockSide()}>
              -
            </button>
            <input type="text" value={currentRotate} />
            <button class="rotate-button" onClick={() => rotateClockSide()}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
