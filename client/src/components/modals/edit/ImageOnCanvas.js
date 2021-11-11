import React, { useState } from "react";

export default function ImageOnCanvas({ src, style, items }) {
  let clickOn = false;
  removeClassName();
  return (
    <img
      draggable={false}
      src={src}
      style={style}
      // TODO : 선택하면 아래 뜨도록 만들기
      onMouseDown={(e) => {
        clickOn = true;
        e.target.classList.add("selected");
        controlCursorStyle(e, "grabbing");
        // 클릭을 하면, classIndex에 추가되도록하기
      }}
      onMouseUp={(e) => {
        clickOn = false;
        controlCursorStyle(e, "grab");
      }}
      onMouseMove={(e) => {
        calculatePosition(e, clickOn);
      }}
      onMouseOver={(e) => {
        controlCursorStyle(e, "grab");
        onMouseOverObject(e, 0.5);
      }}
      onMouseOut={(e) => {
        onMouseOverObject(e, 1);
        calculatePosition(e, clickOn);
      }}
    />
  );

  function calculatePosition(e, clickOn) {
    if (clickOn) {
      e.target.style.left =
        e.nativeEvent.pageX - e.target.offsetWidth / 2 + "px";
      e.target.style.top =
        e.nativeEvent.pageY - e.target.offsetHeight / 2 + "px";
    }
  }

  function onMouseOverObject(e, opacity) {
    e.target.style.opacity = opacity;
  }

  function controlCursorStyle(e, type) {
    e.target.style.cursor = type;
  }

  function removeClassName() {
    window.addEventListener("keydown", (e) => {
      const selected = document.querySelector(".selected");

      if (selected && e.key === "Escape") {
        selected.classList.remove("selected");
      }
    });
  }
}
