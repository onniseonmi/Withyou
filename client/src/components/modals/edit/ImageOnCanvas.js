import React from "react";

export default function ImageOnCanvas({ src, style }) {
  // TODO : 마우스가 Object보다 더 빠를경우 해결하는 방법 찾기
  let clickOn = false;
  return (
    <img
      draggable={false}
      src={src}
      style={style}
      onMouseDown={(e) => {
        clickOn = true;
        e.target.classList = "selected";
        e.target.style.cursor = "grabbing";
      }}
      onMouseUp={(e) => {
        clickOn = false;
        e.target.classList = "";
        e.target.style.cursor = "grab";
      }}
      onMouseMove={(e) => {
        if (clickOn) {
          e.target.style.left =
            e.nativeEvent.pageX - e.target.offsetWidth / 2 + "px";
          e.target.style.top =
            e.nativeEvent.pageY - e.target.offsetHeight / 2 + "px";
        }
      }}
      onMouseOver={(e) => {
        e.target.style.cursor = "grab";
        e.target.style.border = "dashed 0.1rem black";
      }}
      onMouseOut={(e) => {
        e.target.style.border = "solid 0.1rem white";
        if (clickOn) {
          clickOn = false;
        }
      }}
    />
  );
}
