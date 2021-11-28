import React, { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";

export default function PrintOnCanvas({
  key,
  id,
  src,
  text,
  textColor,
  textSize,
  textStyle,
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
  modifyText,
}) {
  const [currentText, setCurrentText] = useState("With you");
  const { left, top } = document
    .querySelector("#canvas-paper")
    .getBoundingClientRect();

  function opacityOnObject(e, opacity) {
    e.target.style.opacity = opacity;
  }

  function controlCursorStyle(e, type) {
    e.target.style.cursor = type;
  }

  function onClickObjcet(e) {
    deSelectObject();
    onSelect();
    onDragStart();
    setMouseInitLocation(e.clientX, e.clientY);
    setMouseCurrentLocation(
      e.target.getBoundingClientRect().left,
      e.target.getBoundingClientRect().top
    );
    controlCursorStyle(e, "grabbing");
  }

  function onDragAndDrop(e) {
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

  function setObjectStyle(style, isSelected) {
    return {
      ...style,
      border: isSelected ? "solid 1px red" : "solid 1px transparent",
    };
  }
  if (style.type === "image") {
    return (
      <img
        key={key}
        id={id}
        className="image-element"
        draggable={false}
        src={src}
        style={setObjectStyle(style, isSelected)}
        // TODO : 어떻게하면 이거 클릭할때 바로 전환되게 할까?
        onMouseDown={(e) => {
          // 기존 선택을 풀어주고, 현재 선택으로 만들어 준다.
          onClickObjcet(e);
        }}
        onMouseUp={(e) => {
          controlCursorStyle(e, "grab");
          onDragEnd();
        }}
        onMouseMove={(e) => {
          if (isDragging) {
            onDragAndDrop(e);
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
  } else if (style.type === "text") {
    return (
      <ContentEditable
        html={currentText} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        onChange={(e) => {
          setCurrentText(e.target.value);
          modifyText(e.target.value);
        }} // handle innerHTML change
        tagName="article" // Use a custom HTML tag (uses a div by default)
        style={{
          ...style,
          display: "inline-block",
          border: "none",
          padding: "auto",
          height: "auto",
          fontFamily: textStyle,
          fontSize: textSize,
          background: "transparent",
          color: textColor,
          textAlign: "center",
        }}
        key={key}
        id={id}
        className="image-element"
        draggable={false}
        onMouseDown={(e) => {
          onClickObjcet(e);
        }}
        onMouseUp={(e) => {
          controlCursorStyle(e, "grab");
          onDragEnd();
        }}
        onMouseMove={(e) => {
          if (isDragging) {
            onDragAndDrop(e);
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
}
