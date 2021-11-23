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
        // 초기 선택좌표 기억
        setMouseInitLocation(e.clientX, e.clientY);
        // 현재 오브젝트의 좌표
        setMouseCurrentLocation(
          e.target.getBoundingClientRect().left,
          e.target.getBoundingClientRect().top
        );
        onDragStart();
        if (!selectState) {
          onSelect();
          controlCursorStyle(e, "grabbing");
        }
      }}
      onMouseUp={(e) => {
        controlCursorStyle(e, "grab");
        onDragEnd();
      }}
      onMouseMove={(e) => {
        if (isDragging) {
          if (clientWidth >= 900) {
            const differX = initLocation.x / 2 - currentLocation.x / 2;
            const differY = initLocation.y / 2 - currentLocation.y / 2;
            onChangeStyle({
              left: e.pageX / 2 - differX - left / 2,
              top: e.pageY / 2 - differY - top / 2,
            });
          } else {
            const differX = initLocation.x - currentLocation.x;
            const differY = initLocation.y - currentLocation.y;
            onChangeStyle({
              left: e.pageX - differX - left,
              top: e.pageY - differY - top,
            });
          }
        }
      }}
      onMouseOver={(e) => {
        controlCursorStyle(e, "grab");
        opacityOnObject(e, 0.5);
      }}
      onMouseOut={(e) => {
        // onDragEnd();
        opacityOnObject(e, 1);
      }}
    />
  );
}
