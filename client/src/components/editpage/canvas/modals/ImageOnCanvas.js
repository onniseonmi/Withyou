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
  onDeselect,
  onChangeStyle,
  selectState,
  canvasPaper,
}) {
  const imageRef = useRef();

  function calculatePosition(e) {
    // TODO : 클릭하면 마우스로 중앙점이 따라옴
    if (isDragging) {
      // 마우스 위치가 변한거만 받아서 넣어주기
      const differX = Number(e.clientX - e.target.style.left.slice(0, -2));
      const differY = Number(e.clientY - e.target.style.top.slice(0, -2));
      onChangeStyle({
        left:
          e.clientX - // 마우스 x좌표
          canvasPaper.getBoundingClientRect().left -
          e.target.style.width.slice(0, -2) / 2 +
          // differX / 10 +
          "px",
        top:
          e.clientY -
          canvasPaper.getBoundingClientRect().top -
          e.target.style.height.slice(0, -2) / 2 +
          // differY / 10 +
          "px",
      });
    }
  }

  function onMouseOverObject(e, opacity) {
    e.target.style.opacity = opacity;
  }

  function controlCursorStyle(e, type) {
    e.target.style.cursor = type;
  }

  // 지금 이 이벤트가 여러번 눌린다 -> 어떻게 해결해야할까?

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
