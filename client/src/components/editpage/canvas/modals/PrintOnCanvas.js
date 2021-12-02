import React, { useState } from "react";
// import ContentEditable from "react-contenteditable";

export default function PrintOnCanvas({
  id,
  src,
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
  const [currentText, setCurrentText] = useState("텍스트를 입력해주세요.");
  const [onMove, setOnMove] = useState(false);
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

  function onDragAndDropMobile(e) {
    const differX = initLocation.x - currentLocation.x;
    const differY = initLocation.y - currentLocation.y;
    let x = e.pageX - differX - left;
    let y = e.pageY - differY - top;
    onChangeStyle({
      left: x,
      top: y,
    });
  }

  function setObjectStyle(style, isSelected) {
    return {
      ...style,
      border: isSelected ? "dotted 2px gray" : "solid 2px transparent",
    };
  }

  if (style.type === "image") {
    return (
      <img
        key={id}
        id={id}
        className="image-element"
        draggable={false}
        alt={id}
        src={src}
        style={setObjectStyle(style, isSelected)}
        onMouseDown={(e) => {
          setOnMove(true);
          onClickObjcet(e);
          setMouseInitLocation(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          const target = e.touches[0];
          onClickObjcet(e);
          setMouseInitLocation(target.clientX, target.clientY);
        }}
        onMouseMove={(e) => {
          if (isDragging) {
            onDragAndDrop(e);
          }
        }}
        onMouseUp={(e) => {
          setOnMove(false);
          controlCursorStyle(e, "grab");
          onDragEnd();
        }}
        onTouchEnd={(e) => {
          controlCursorStyle(e, "grab");
          onDragEnd();
          document.body.style.overflow = null;
        }}
        onTouchMove={(e) => {
          document.body.style.overflow = "hidden";
          document.querySelector("html").scrollTop = window.scrollY;
          if (isDragging) {
            onDragAndDropMobile(e.touches[0]);
          }
        }}
        onMouseOver={(e) => {
          controlCursorStyle(e, "grab");
          opacityOnObject(e, 0.5);
        }}
        onMouseOut={(e) => {
          opacityOnObject(e, 1);
          if (onMove) {
            onDragAndDrop(e);
          }
        }}
      />
    );
  } else if (style.type === "text") {
    return (
      <input
        key={id}
        id={id}
        size={currentText.length * 2}
        placeholder={currentText} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        onChange={(e) => {
          setCurrentText(e.target.value);
          modifyText(e.target.value);
        }} // handle innerHTML change
        tagname="article" // Use a custom HTML tag (uses a div by default)
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
        className="image-element"
        draggable={false}
        onMouseDown={(e) => {
          setOnMove(true);
          onClickObjcet(e);
          setMouseInitLocation(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          const target = e.touches[0];
          onClickObjcet(e);
          setMouseInitLocation(target.clientX, target.clientY);
        }}
        onMouseMove={(e) => {
          if (isDragging) {
            onDragAndDrop(e);
          }
        }}
        onMouseUp={(e) => {
          setOnMove(false);
          controlCursorStyle(e, "grab");
          onDragEnd();
        }}
        onTouchEnd={(e) => {
          controlCursorStyle(e, "grab");
          onDragEnd();
          document.body.style.overflow = null;
        }}
        onTouchMove={(e) => {
          document.body.style.overflow = "hidden";
          document.querySelector("html").scrollTop = window.scrollY;
          if (isDragging) {
            onDragAndDropMobile(e.touches[0]);
          }
        }}
        onMouseOver={(e) => {
          controlCursorStyle(e, "grab");
          opacityOnObject(e, 0.5);
        }}
        onMouseOut={(e) => {
          opacityOnObject(e, 1);
          if (onMove) {
            onDragAndDrop(e);
          }
        }}
      ></input>
    );
  }
}
