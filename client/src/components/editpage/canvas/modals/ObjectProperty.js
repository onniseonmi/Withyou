import React, { useState } from "react";

export default function ObjectProperty({
  id,
  removeObject,
  width,
  resizeWidth,
  height,
  resizeHeight,
  rotateObject,
  rotateDeClockSide,
  currentRotate,
  setCurrentRotate,
  rotateClockSide,
  zindex,
  decreaseZindex,
  currentZindex,
  modifyZindex,
  increaseZindex,
  setCurrentZindex,
}) {
  const [currentWidth, setCurrentWidth] = useState(width);
  const [currentHeight, setCurrentHeight] = useState(height);
  function increaseWidth() {
    const nextState = currentWidth + 10;
    setCurrentWidth(nextState);
    resizeWidth(nextState);
  }

  function decreaseWidth() {
    const nextState = currentWidth - 10;
    setCurrentWidth(nextState);
    resizeWidth(nextState);
  }

  function increaseHeight() {
    const nextState = currentHeight + 10;
    setCurrentHeight(nextState);
    resizeHeight(nextState);
  }

  function decreaseHeight() {
    const nextState = currentHeight - 10;
    setCurrentHeight(nextState);
    resizeHeight(nextState);
  }
  return (
    <div id="property-modal" key={id}>
      <div id="property-title-button">
        <div>Edit Detail</div>
        <button id="delete-button" onClick={() => removeObject()}>
          Delete
        </button>
      </div>
      <div id="control-box">
        <div id="control-width">
          <div>가로</div>
          <div className="object-button-area">
            <button
              className="control-button"
              onClick={() => {
                if (currentWidth > 9) {
                  decreaseWidth();
                }
              }}
            >
              -
            </button>
            <input
              className="input-area"
              type="number"
              value={Math.floor(currentWidth)}
              onChange={(e) => {
                if (e.target.value >= 0) {
                  setCurrentWidth(Number(e.target.value));
                  resizeWidth(Number(e.target.value));
                }
              }}
            />
            <button className="control-button" onClick={() => increaseWidth()}>
              +
            </button>
          </div>
        </div>
        <div id="control-height">
          <div>세로</div>
          <div className="object-button-area">
            <button
              className="control-button"
              onClick={() => {
                if (currentHeight > 9) {
                  decreaseHeight();
                }
              }}
            >
              -
            </button>
            <input
              className="input-area"
              type="number"
              value={Math.floor(currentHeight)}
              onChange={(e) => {
                if (e.target.value >= 0) {
                  setCurrentHeight(Number(e.target.value));
                  resizeHeight(Number(e.target.value));
                }
              }}
            />
            <button className="control-button" onClick={() => increaseHeight()}>
              +
            </button>
          </div>
        </div>
        <div id="control-rotate">
          <div>회전</div>
          <div className="object-button-area">
            <button
              className="control-button"
              onClick={() => rotateDeClockSide()}
            >
              -
            </button>
            <input
              className="input-area"
              type="number"
              value={Math.floor(currentRotate)}
              onChange={(e) => {
                let current = e.target.value % 360;
                setCurrentRotate(Number(current));
                rotateObject(`rotate(${Number(current)}deg)`);
              }}
            />
            <button
              className="control-button"
              onClick={() => rotateClockSide()}
            >
              +
            </button>
          </div>
        </div>
        <div id="control-zindex">
          <div>레이어</div>
          <div id="zindex-buttons">
            <button
              className="control-button"
              onClick={() => {
                if (zindex !== 0) {
                  decreaseZindex(Number(zindex - 2));
                }
              }}
            >
              -
            </button>
            <input
              className="input-area"
              type="number"
              value={currentZindex}
              onChange={(e) => {
                const current = Number(e.target.value);
                if (current >= 0) {
                  setCurrentZindex(current);
                  modifyZindex(current);
                }
              }}
            />
            <button
              className="control-button"
              onClick={() => {
                increaseZindex(Number(zindex + 2));
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
