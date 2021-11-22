import React, { useRef, useState } from "react";
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
  canvasPaper,
}) {
  const imageRef = useRef();
  let initialLocation_X = 0;
  let initialLocation_Y = 0;

  function calculatePosition(e) {
    if (isDragging) {
      // TODO : 클릭하면 오브젝트가 다시 중앙으로 감 왜?
      // 기본 로직
      // 현재 오브젝트의 위치 - 마우스의 첫 클릭지점  ---> 변위차
      // 마우스의 현재지점 - 변위차 = 오브젝트의 위치
      // console.log("1", +e.target.style.left.slice(0, -2)); // 현재 오브젝트의 캔버스 안 좌표
      // console.log("2", canvasPaper.getBoundingClientRect().left); // 현재 캔버스 좌표
      let currentX =
        +e.target.style.left.slice(0, -2) +
        canvasPaper.getBoundingClientRect().left;

      // console.log("3", currentX); //화면상 실 좌표
      // console.log("4", initialLocation_X); // 클릭 시작한 좌표
      // 변위 차
      let differX = +e.target.style.left.slice(0, -2) - initialLocation_X;
      let differY = +e.target.style.top.slice(0, -2) - initialLocation_Y;

      onChangeStyle({
        // -(처음 클릭한 지점 - 마우스위치)
        // left: e.clientX - differX + "px",
        // top: e.clientY - differY + "px",
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
        if (!selectState) {
          initialLocation_X = e.clientX;
          initialLocation_Y = e.clientY;
          onSelect();
          controlCursorStyle(e, "grabbing");
        }
        onDragStart();
        console.log("down", initialLocation_X);
      }}
      onMouseUp={(e) => {
        controlCursorStyle(e, "grab");
        onDragEnd();
        initialLocation_X = 0;
        initialLocation_Y = 0;
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
      }}
    />
  );
}
