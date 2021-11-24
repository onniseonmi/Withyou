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

  function onClickObject() {
    deSelectObject();
    onSelect();
    onDragStart();
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
      onMouseDown={(e) => {
        onClickObject();
        setMouseInitLocation(e.clientX, e.clientY);
        setMouseCurrentLocation(
          e.target.getBoundingClientRect().left,
          e.target.getBoundingClientRect().top
        );
        controlCursorStyle(e, "grabbing");
      }}
      // TODO : 어떻게하면 이거 클릭할때 바로 전환되게 할까?
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
