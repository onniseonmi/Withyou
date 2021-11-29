import React, { useState } from "react";
import "../../../../css/editpage/canvas/modals/BackgroundColor.css";
import reactCSS from "reactcss";
import { ChromePicker } from "react-color";

export default function BackgroundColor({
  currentCanvasColor,
  handleCanvasColor,
  clientWidth,
}) {
  const [currentTextColor, setCurrentTextColor] = useState(currentCanvasColor);

  function handleCurrentColor(input) {
    setCurrentTextColor(input);
    handleCanvasColor(input);
  }

  const styles = reactCSS({
    default: {
      color: {
        width: "20px",
        height: "50px",
        borderRadius: "0.2rem",
      },
      palette: {
        position: "fixed",
        top: `${clientWidth >= 900 ? "75vh" : "40vh"}`,
        left: `${clientWidth >= 900 ? "40vw" : "10vw"}`,
        zIndex: "2",
      },
    },
  });
  return (
    <div id="template-modal">
      <div id="template-modal-nav" className="edit--menu-title">
        <div id="title"> 배경색 정하기 </div>
        <div id="content">원하는 색상을 선택해주세요.</div>
      </div>
      <div id="template-modal-upload">
        <div className="button-area">
          <ChromePicker
            id="bg-color-picker"
            styles={styles.color}
            disableAlpha={true}
            color={currentTextColor}
            onChange={(color) => {
              handleCurrentColor(color);
            }}
          />
        </div>
      </div>
    </div>
  );
}
