import React from "react";

export default function ImageOnCanvas({ src, clickOn, setClickOn, style }) {
  // props로 전달받은 position으로 style 계산
  return (
    <img
      src={src}
      style={style}
      onMouseDown={(e) => {
        console.log(clickOn);
        setClickOn(true);
        console.log(clickOn);
        e.target.classList = "selected";
        e.target.style.cursor = "grabbing";
      }}
      onMouseUp={(e) => {
        // clickOn = false;
        e.target.classList = "";
        e.target.style.cursor = "grab";
        // clickOn = true;
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
      }}
    />
  );
}
