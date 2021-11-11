import React from "react";

export default function ImageOnCanvas({ src, style }) {
  let clickOn = false;
  deleteObject();
  removeClassName();
  return (
    <img
      draggable={false}
      src={src}
      style={style}
      // 선택하면 아래 뜨도록 만들기
      onMouseDown={(e) => {
        // 중앙으로 딸려오는거 해결하기
        clickOn = true;
        e.target.classList.add("selected");
        controlCursorStyle(e, "grabbing");
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

  function deleteObject() {
    window.addEventListener("keydown", (e) => {
      const selected = document.querySelector(".selected");
      if (selected && (e.key === "Backspace" || e.key === "Delete")) {
        // TODO : 리액트에서 돔을 삭제하는 방법 찾아보기
      }
    });
  }
}
