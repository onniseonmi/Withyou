import React, { useRef } from "react";
import "../../../../css/editpage/canvas/modals/ImageOnCanvas.css";
export default function ImageOnCanvas({
  id,
  src,
  style,
  isSelected,
  isDragging,
  onDragStart,
  onDragEnd,
  onSelect,
  onChangeStyle,
  selectState,
  initLocation,
  setMouseInitLocation,
  currentLocation,
  setMouseCurrentLocation,
  clientWidth,
}) {
  const imageRef = useRef();

  function opacityOnObject(e, opacity) {
    e.target.style.opacity = opacity;
  }

  function controlCursorStyle(e, type) {
    e.target.style.cursor = type;
  }
  const { left, top } = document
    .querySelector("#canvas-paper")
    .getBoundingClientRect();

  return (
    <img
      key={id}
      className="image-element"
      draggable={false}
      src={src}
      ref={imageRef}
      style={{
        ...style,
        border: isSelected ? "solid 1px red" : "solid 1px transparent",
      }}
      onMouseDown={(e) => {
        setMouseInitLocation(e.clientX, e.clientY);
        setMouseCurrentLocation(
          e.target.getBoundingClientRect().left,
          e.target.getBoundingClientRect().top
        );
        if (!selectState) {
          onSelect();
          onDragStart();
          controlCursorStyle(e, "grabbing");
        } else if (e.target.style.zIndex === "1000") {
          onDragStart();
        }
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
