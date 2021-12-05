import React, { useState } from "react";
import reactCSS from "reactcss";
import { ChromePicker } from "react-color";
import FontList from "./FontList";
export default function TextProperty({
  id,
  clientWidth,
  removeObject,
  textSize,
  modifyTextSize,
  textColor,
  modifyTextColor,
  textStyle,
  modifyTextStyle,
  currentRotate,
  rotateDeClockSide,
  rotateClockSide,
  setCurrentRotate,
  rotateObject,
  zindex,
  decreaseZindex,
  increaseZindex,
  setCurrentZindex,
  modifyZindex,
  currentZindex,
}) {
  const [onColorPicker, setOnColorPicker] = useState(false);
  const [currentTextColor, setCurrentTextColor] = useState(textColor);
  const [currentTextSize, setCurrentTextSize] = useState(textSize);
  const [currentTextSyle, setCurrentTextSyle] = useState(textStyle);
  const fontLIst = [
    "BinggraeMelona",
    "Gulimn",
    "NanumGothic-Bold",
    "NanumGothic-Regular",
    "NanumMyeongjo-Bold",
    "NanumMyeongjo-Regular",
  ];
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
