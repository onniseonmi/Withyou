import React from "react";
import "../../../../css/editpage/canvas/modals/ImageOnCanvas.css";
export default function ImageOnCanvas({
  key,
  id,
  src,
  style,
  isSelected,
  isDragging,
  onDragStart,
  onDragEnd,
  onSelect,
  deSelectObject,
  onChangeStyle,
  initLocation,
  setMouseInitLocation,
  currentLocation,
  setMouseCurrentLocation,
  clientWidth,
}) {
  function opacityOnObject(e, opacity) {
    e.target.style.opacity = opacity;
  }

  function controlCursorStyle(e, type) {
    e.target.style.cursor = type;
  }
  const { left, top } = document
    .querySelector("#canvas-paper")
    .getBoundingClientRect();

  function onClickObjcet() {
    deSelectObject();
    onSelect();
    // setTimeout(() => {
    //   deSelectObject();
    //   onSelect();
    // }, 10);
  }
  return (
    <img
      key={key}
      id={id}
      className="image-element"
      draggable={false}
      src={src}
      style={{
        ...style,
        border: isSelected ? "solid 1px red" : "solid 1px transparent",
      }}
      // TODO : 어떻게하면 이거 클릭할때 바로 전환되게 할까?
      onMouseDown={(e) => {
        // 기존 선택을 풀어주고, 현재 선택으로 만들어 준다.
        onClickObjcet();
        onDragStart();
        setMouseInitLocation(e.clientX, e.clientY);
        setMouseCurrentLocation(
          e.target.getBoundingClientRect().left,
          e.target.getBoundingClientRect().top
        );
        controlCursorStyle(e, "grabbing");
      }}
      onMouseUp={(e) => {
        controlCursorStyle(e, "grab");
        onDragEnd();
      }}
      onMouseMove={(e) => {
        if (isDragging) {
          const differX = initLocation.x - currentLocation.x;
          const differY = initLocation.y - currentLocation.y;
          let x = e.pageX - differX - left;
          let y = e.pageY - differY - top;
          if (clientWidth >= 900) {
            onChangeStyle({
              left: x / 2,
              top: y / 2,
            });
          } else {
            onChangeStyle({
              left: x,
              top: y,
            });
          }
        }
      }}
      onMouseOver={(e) => {
        controlCursorStyle(e, "grab");
        opacityOnObject(e, 0.5);
      }}
      onMouseOut={(e) => {
        onDragEnd();
        opacityOnObject(e, 1);
      }}
    />
  );
}
