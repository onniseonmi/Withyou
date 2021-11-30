import React, { useState } from "react";
import "../../../../css/editpage/canvas/modals/ObjectProperty.css";
import reactCSS from "reactcss";
import { ChromePicker } from "react-color";
import FontList from "./FontList";

export default function ObjectProperty({
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

  function increaseWidth() {
    const nextState = currentWidth + 5;
    setCurrentWidth(nextState);
    resizeWidth(nextState);
  }

  function decreaseWidth() {
    const nextState = currentWidth - 5;
    setCurrentWidth(nextState);
    resizeWidth(nextState);
  }

  function increaseHeight() {
    const nextState = currentHeight + 5;
    setCurrentHeight(nextState);
    resizeHeight(nextState);
  }

  function decreaseHeight() {
    const nextState = currentHeight - 5;
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

  //! ??????? 물어보기
  // setTop(0);

  const styles = reactCSS({
    default: {
      swatch: {
        width: "5rem",
        height: "1.5rem",
        background: currentTextColor,
        borderRadius: "0.5rem",
        display: "inline-block",
        cursor: "pointer",
      },
      palette: {
        position: "absolute",
        top: `${clientWidth >= 900 ? "68vh" : "35vh"}`,
        left: `${clientWidth >= 900 ? "16vw" : "16vw"}`,
        zIndex: "2",
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
  // ! 회전 크기 에러 잡기
  // TODO : 밑에 반복되는 버튼들을 함수화 하면 좋을것 같은데..
  if (type === "image") {
    return (
      <div id="property-modal">
        <div id="property-title-button">
          <div>Edit Detail</div>
          <button id="delete-button" onClick={() => removeObject()}>
            Delete
          </button>
        </div>
        <div id="control-box">
          <div id="control-width">
            <div>가로</div>
            <div className="button-area">
              <button
                className="control-button"
                onClick={() => decreaseWidth()}
              >
                -
              </button>
              <input
                className="input-area"
                type="text"
                value={Math.floor(currentWidth)}
                onChange={(e) => {
                  setCurrentWidth(Number(e.target.value));
                  resizeWidth(Number(e.target.value));
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
            <div className="button-area">
              <button
                className="control-button"
                onClick={() => decreaseHeight()}
              >
                -
              </button>
              <input
                className="input-area"
                type="text"
                value={Math.floor(currentHeight)}
                onChange={(e) => {
                  setCurrentHeight(Number(e.target.value));
                  resizeHeight(Number(e.target.value));
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
            <div className="button-area">
              <button
                className="control-button"
                onClick={() => rotateDeClockSide()}
              >
                -
              </button>
              <input
                className="input-area"
                type="text"
                value={Math.floor(currentRotate)}
                onChange={(e) => {
                  setCurrentRotate(Number(e.target.value));
                  rotateObject(`rotate(${Number(e.target.value)}deg)`);
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
                    decreaseZindex(zindex - 1);
                  }
                }}
              >
                -
              </button>
              <input
                className="input-area"
                type="text"
                value={currentZindex}
                onChange={(e) => {
                  setCurrentZindex(e.target.value);
                  modifyZindex(e.target.value);
                }}
              />
              <button
                className="control-button"
                onClick={() => {
                  increaseZindex(zindex + 1);
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
      <div id="property-modal">
        <div id="property-title-button">
          <div>Edit Detail</div>
          <button id="delete-button" onClick={() => removeObject()}>
            Delete
          </button>
        </div>
        <div id="control-box">
          <div id="control-style">
            <div>글꼴</div>
            <div className="button-area">
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
            <div className="button-area">
              <div
                style={styles.swatch}
                onClick={() => setOnColorPicker(!onColorPicker)}
              ></div>
              {onColorPicker && (
                <div style={styles.palette}>
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
            <div className="button-area">
              <button
                className="control-button"
                onClick={() => decreaseTextSize()}
              >
                -
              </button>
              <input
                className="input-area"
                type="text"
                value={Math.floor(currentTextSize)}
                onChange={(e) => {
                  setCurrentTextSize(Number(e.target.value));
                  modifyTextSize(Number(e.target.value));
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
            <div className="button-area">
              <button
                className="control-button"
                onClick={() => rotateDeClockSide()}
              >
                -
              </button>
              <input
                className="input-area"
                type="text"
                value={Math.floor(currentRotate)}
                onChange={(e) => {
                  setCurrentRotate(Number(e.target.value));
                  rotateObject(`rotate(${Number(e.target.value)}deg)`);
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
                    decreaseZindex(zindex - 1);
                  }
                }}
              >
                -
              </button>
              <input
                className="input-area"
                type="text"
                value={currentZindex}
                onChange={(e) => {
                  setCurrentZindex(e.target.value);
                  modifyZindex(e.target.value);
                }}
              />
              <button
                className="control-button"
                onClick={() => {
                  increaseZindex(zindex + 1);
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
