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
        background: "#ffffff",
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
    <div id="bg-modal">
      <div id="bg-modal-nav" className="edit--menu-title">
        <div id="title"> 배경색 정하기 </div>
        <div id="content">원하는 색상을 선택해주세요.</div>
      </div>
      <div className="button-area">
        <ChromePicker
          styles={styles.color}
          width={window.outerWidth >= 450 ? "225px" : "550px"}
          disableAlpha={window.outerWidth >= 450 ? true : false}
          color={currentTextColor}
          onChange={(color) => {
            handleCurrentColor(color);
          }}
        />
      </div>
    </div>
  );
}
