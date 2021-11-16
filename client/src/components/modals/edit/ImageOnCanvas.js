import React from "react";

export default function ImageOnCanvas({
  src,
  style,
  isSelected,
  isDragging,
  onDragStart,
  onDragEnd,
  onSelect,
  onDeselect,
  onChangeStyle,
  clickSelected,
  deClickSelected,
  selectState,
  setStateAll,
}) {
  function calculatePosition(e) {
    if (isDragging) {
      onChangeStyle({
        left: e.nativeEvent.pageX - e.target.offsetWidth / 2 + "px",
        top: e.nativeEvent.pageY - e.target.offsetHeight / 2 + "px",
      });
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
      if (isSelected && e.key === "Escape") {
        onDeselect();
        deClickSelected();
      }
    });
  }
  removeClassName();
  return (
    <img
      draggable={false}
      src={src}
      style={{
        ...style,
        border: isSelected ? "solid 1px red" : "solid 1px transparent",
      }}
      onMouseDown={(e) => {
        if (!selectState) {
          clickSelected();
          onSelect();
          controlCursorStyle(e, "grabbing");
          onDragStart();
          setStateAll();
        }
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
