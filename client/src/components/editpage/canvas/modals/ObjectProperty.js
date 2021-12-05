import React, { useState } from "react";
import "../../../../css/editpage/canvas/modals/ObjectProperty.css";
import reactCSS from "reactcss";
import { ChromePicker } from "react-color";
import FontList from "./FontList";

export default function ObjectProperty({
  id,
  type,
  width,
  resizeWidth,
  height,
  resizeHeight,
  transform,
  rotateObject,
  removeObject,
  zindex,
  modifyZindex,
  clientWidth,
  textSize,
  textColor,
  textStyle,
  modifyTextSize,
  modifyTextColor,
  modifyTextStyle,
}) {
  const fontLIst = [
    "BinggraeMelona",
    "Gulimn",
    "NanumGothic-Bold",
    "NanumGothic-Regular",
    "NanumMyeongjo-Bold",
    "NanumMyeongjo-Regular",
  ];
  const [currentWidth, setCurrentWidth] = useState(width);
  const [currentHeight, setCurrentHeight] = useState(height);
  const [currentRotate, setCurrentRotate] = useState(
    transform.slice(7).slice(0, -4)
  );
  const [currentZindex, setCurrentZindex] = useState(zindex);
  const [currentTextSize, setCurrentTextSize] = useState(textSize);
  const [currentTextColor, setCurrentTextColor] = useState(textColor);
  const [onColorPicker, setOnColorPicker] = useState(false);
  const [currentTextSyle, setCurrentTextSyle] = useState(textStyle);
  const [currentLocation, setCurrentLocation] = useState({ top: 0, left: 0 });

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

  function increaseZindex() {
    const nextState = zindex + 1;
    setCurrentZindex(nextState);
    modifyZindex(nextState);
  }

  function decreaseZindex() {
    const nextState = zindex - 1;
    setCurrentZindex(nextState);
    modifyZindex(nextState);
  }

  function increaseTextSize() {
    const nextState = textSize + 1;
    setCurrentTextSize(nextState);
    modifyTextSize(nextState);
  }

  function decreaseTextSize() {
    const nextState = textSize - 1;
    setCurrentTextSize(nextState);
    modifyTextSize(nextState);
  }

  function onChangeTextStyle(e) {
    const nextState = e.target.value;
    setCurrentTextSyle(nextState);
    modifyTextStyle(nextState);
  }
  const { top, left } = document
    .querySelector("#property-modal")
    .getBoundingClientRect();

  const styles = reactCSS({
    default: {
      swatch: {
        width: `${clientWidth >= 900 ? "5vw" : "7vw"}`,
        height: `${clientWidth >= 900 ? "2.7vh" : "2.7vh"}`,
        background: currentTextColor,
        borderRadius: "0.5rem",
        display: "inline-block",
        cursor: "pointer",
      },
      palette: {
        position: "absolute",
        top: clientWidth >= 900 ? "60vh" : "30vh",
        left: "20vw",
        zIndex: "1000",
      },
      selected: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  const mobileStyle = reactCSS({
    default: {
      swatch: {
        width: "10vw",
        height: "2vh",
        background: currentTextColor,
        borderRadius: "0.5rem",
        display: "inline-block",
        cursor: "pointer",
      },
      palette: {
        position: "fixed",
        top: `48vh`,
        left: `20vw`,
        zIndex: "2",
      },
    },
  });
  // ! 회전 크기 에러 잡기
  // TODO : 밑에 반복되는 버튼들을 함수화 하면 좋을것 같은데..
  if (type === "image" || type === "templates") {
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
              <button
                className="control-button"
                onClick={() => increaseWidth()}
              >
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
              <button
                className="control-button"
                onClick={() => increaseHeight()}
              >
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
  } else if (type === "text") {
    return (
      <div id="property-modal" key={id}>
        <div id="property-title-button">
          <div>Edit Detail</div>
          <button id="delete-button" onClick={() => removeObject()}>
            Delete
          </button>
        </div>
        <div id="control-box">
          <div id="control-style">
            <div>글꼴</div>
            <div className="object-button-area">
              <select
                name="selectList"
                id="selectList"
                value={currentTextSyle}
                onChange={(e) => {
                  onChangeTextStyle(e);
                }}
              >
                {fontLIst.map((el) => (
                  <FontList font={el} />
                ))}
              </select>
            </div>
          </div>
          <div id="control-color">
            <div>색상</div>
            <div className="object-button-area">
              <div
                style={
                  window.outerWidth >= 450 ? styles.swatch : mobileStyle.swatch
                }
                onClick={(e) => {
                  setOnColorPicker(!onColorPicker);
                  setCurrentLocation({ top: e.pageX, left: e.pageY });
                }}
              ></div>
              {onColorPicker && (
                <div
                  style={
                    window.outerWidth >= 450
                      ? styles.palette
                      : mobileStyle.palette
                  }
                >
                  <div
                    style={styles.selected}
                    onClick={() => setOnColorPicker(!onColorPicker)}
                  />
                  <ChromePicker
                    disableAlpha={true}
                    color={currentTextColor}
                    onChange={(color) => {
                      setCurrentTextColor(color.hex);
                      modifyTextColor(color.hex);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div id="control-size">
            <div>글자크기</div>
            <div className="object-button-area">
              <button
                className="control-button"
                onClick={() => {
                  if (currentTextSize !== 0) {
                    decreaseTextSize();
                  }
                }}
              >
                -
              </button>
              <input
                className="input-area"
                type="number"
                value={Math.floor(currentTextSize)}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setCurrentTextSize(Number(e.target.value));
                    modifyTextSize(Number(e.target.value));
                  }
                }}
              />
              <button
                className="control-button"
                onClick={() => increaseTextSize()}
              >
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
}
