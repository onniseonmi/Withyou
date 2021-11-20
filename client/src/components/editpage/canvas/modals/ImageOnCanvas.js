import React, { useRef } from "react";
import "../../../../css/editpage/canvas/modals/ImageOnCanvas.css";
export default function ImageOnCanvas({
  key,
  src,
  style,
  isSelected,
  isDragging,
  onDragStart,
  onDragEnd,
  onSelect,
  onChangeStyle,
  selectState,
  canvasPaper,
}) {
  const imageRef = useRef();

  function calculatePosition(e) {
    // TODO : 클릭하면 마우스로 중앙점이 따라옴
    if (isDragging) {
      // 현재 오브젝트의 x, y좌표
      let currentX = e.target.style.width.slice(0, -2);
      let currentY = e.target.style.height.slice(0, -2);

      // 마우스 클릭한 좌표 - 현재 캔버스의 좌표 (차이)
      let differX = e.clientX - canvasPaper.getBoundingClientRect().left;
      let differY = e.clientY - canvasPaper.getBoundingClientRect().top;

      onChangeStyle({
        left: differX - currentX / 2 + "px",
        top: differY - currentY / 2 + "px",
      });
    }
  }

  function onMouseOverObject(e, opacity) {
    e.target.style.opacity = opacity;
  }

  function controlCursorStyle(e, type) {
    e.target.style.cursor = type;
  }

  return (
    <img
      id={`image${key}`}
      className="image-element"
      draggable={false}
      src={src}
      ref={imageRef}
      style={{
        ...style,
        border: isSelected ? "solid 1px red" : "solid 1px transparent",
      }}
      onMouseDown={(e) => {
        if (!selectState) {
          onSelect();
          controlCursorStyle(e, "grabbing");
        }
        onDragStart();
      }}
      onMouseUp={(e) => {
        controlCursorStyle(e, "grab");
        onDragEnd();
      }}
      onMouseMove={(e) => {
        calculatePosition(e);
      }}
      onMouseOver={(e) => {
        controlCursorStyle(e, "grab");
        onMouseOverObject(e, 0.5);
      }}
      onMouseOut={(e) => {
        onMouseOverObject(e, 1);
        calculatePosition(e);
      }}
    />
  );
}
