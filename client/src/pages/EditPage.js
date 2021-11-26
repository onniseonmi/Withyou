import React, { useState } from "react";
import "../css/EditPage.css";
import ImageOnCanvas from "../components/editpage/canvas/modals/ImageOnCanvas";
import EditMenu from "../components/editpage/menu/EditMenu";
import EditMenuBar from "../components/editpage/menu/EditMenuBar";
import TopMenu from "../components/TopMenu";
import ImageProperty from "../components/editpage/canvas/modals/ImageProperty";
import PropertyBlank from "../components/editpage/canvas/modals/PropertyBlank";

export default function EditPage() {
  // * 상태들 이름 정리한번 싹 하기 --> 직관적으로 알 수 있도록
  const [itemStates, setItemStates] = useState([]);
  const [selectState, setSelectState] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [menuBtnStatus, setMenuBtnStatus] = useState("menuBar-template");
  const [contemporaryZIndex, setcontemporaryZIndex] = useState(0);
  const [initLocation, setInitLocation] = useState({ x: 0, y: 0 });
  const [currentLocation, setCurrentLocation] = useState({ x: 0, y: 0 });
  const [currentId, setCurrentId] = useState({ id: "" });
  const [currentText, setCurrentText] = useState("");
  const [currentTextSize, setCurrentTextSize] = useState(20);
  // const [currentTextStyle, setCurrentTextStyle] = useState(20);
  const [currentColor, setCurrentColor] = useState("Red");
  const { clientWidth } = document.body;

  function onSelect(index) {
    setSelectState(true);
    const nextState = [...itemStates];
    nextState[index].isSelected = true;
    setcontemporaryZIndex(nextState[index].style.zIndex);
    setCurrentId(nextState[index].id);
    nextState[index].style.zIndex = 1000;
    setItemStates(nextState);
    getSelectedItemInfo();
  }

  function onDeselect(index) {
    setSelectState(false);
    const nextState = [...itemStates];
    nextState[index].isSelected = false;
    setCurrentId({ id: "" });
    nextState[index].style.zIndex = contemporaryZIndex;
    setItemStates(nextState);
  }

  function deSelectObject() {
    const index = itemStates.findIndex((el) => el.isSelected === true);
    if (index !== -1) {
      onDeselect(index);
    }
  }

  function getSelectedItemInfo() {
    const itemInfo = itemStates.filter((el) => el.isSelected === true);
    setSelectedItem(itemInfo.shift().style);
  }

  function resizeWidth(input) {
    const nextState = [...itemStates];
    const targetIndex = itemStates.findIndex((el) => el.isSelected === true);
    nextState[targetIndex].style.width = input;
    setItemStates(nextState);
  }

  function resizeHeight(input) {
    const nextState = [...itemStates];
    const targetIndex = itemStates.findIndex((el) => el.isSelected === true);
    nextState[targetIndex].style.height = input;
    setItemStates(nextState);
  }

  function rotateObject(input) {
    const nextState = [...itemStates];
    const targetIndex = itemStates.findIndex((el) => el.isSelected === true);
    nextState[targetIndex].style.transform = input;
    setItemStates(nextState);
  }

  function modifyZindex(input) {
    const nextState = [...itemStates];
    const targetIndex = itemStates.findIndex((el) => el.isSelected === true);
    nextState[targetIndex].zIndex = input;
    setcontemporaryZIndex(input);
  }

  function removeObject() {
    const removedItems = itemStates.filter((el) => el.isSelected !== true);
    setItemStates(removedItems);
    setSelectState(false);
  }

  function setStyle(input, type, states, { width, height }) {
    if (type === "image") {
      return {
        id: makeId(),
        src: input,
        style: {
          type: type,
          position: "absolute",
          zIndex: states.length,
          width: width / 6,
          height: height / 6,
          top: (height * 3) / 20,
          left: width / 6,
          transform: "rotate(0deg)",
        },
        isSelected: false,
        isDragging: false,
      };
    } else if (type === "text") {
      // 타입이 text일 경우, 현재 글자 상태를 넣어준다.
      return {
        id: makeId(),
        text: input,
        style: {
          type: type,
          position: "absolute",
          zIndex: states.length,
          top: (height * 3) / 20,
          left: width / 6,
          transform: "rotate(0deg)",
        },
        isSelected: false,
        isDragging: false,
      };
    }
  }

  function addToItems(input, type) {
    const canvas = document
      .querySelector("#canvas-paper")
      .getBoundingClientRect();
    setItemStates((prevState) => {
      if (clientWidth >= 900) {
        return [...prevState, setStyle(input, type, itemStates, canvas)];
      } else {
        return [
          ...prevState,
          setStyle(input, type, itemStates, {
            width: canvas.width * 2,
            height: canvas.height * 2,
          }),
        ];
      }
    });
  }

  function makeId() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  function setMouseInitLocation(x, y) {
    setInitLocation({ x: x, y: y });
  }

  function setMouseCurrentLocation(x, y) {
    setCurrentLocation({ x: x, y: y });
  }

  function onclickToDeselect(e) {
    if (e.target.id !== currentId) {
      const index = itemStates.findIndex((el) => el.isSelected === true);
      if (index !== -1) {
        onDeselect(index);
      }
    }
  }

  window.onkeydown = (e) => {
    if (e.key === "Escape") {
      deSelectObject();
    }
  };

  function modifyText(input) {
    setCurrentText(input);
  }

  return (
    <>
      <div id="EditPage">
        <div id="edit-menu">
          <EditMenuBar
            setMenuBtnStatus={setMenuBtnStatus}
            setSelectState={setSelectState}
          />

          <EditMenu
            makeId={makeId}
            selectedItem={selectedItem}
            itemStates={itemStates}
            setItemStates={setItemStates}
            menuBtnStatus={menuBtnStatus}
            setMenuBtnStatus={setMenuBtnStatus}
            addToItems={addToItems}
            currentText={currentText}
            setCurrentText={setCurrentText}
          />
        </div>
        <div id="canvas">
          <div id="canvas-top-menu">
            <TopMenu />
          </div>
          <div id="canvas-container" onClick={(e) => onclickToDeselect(e)}>
            <div id="content"></div>
            <div id="canvas-paper">
              {itemStates.map((el, i) => {
                return (
                  <ImageOnCanvas
                    key={el.id}
                    id={el.id}
                    src={el.src}
                    text={currentText}
                    style={el.style}
                    isSelected={el.isSelected}
                    isDragging={el.isDragging}
                    onDragStart={() => {
                      const nextState = [...itemStates];
                      nextState[i].isDragging = true;
                      setItemStates(nextState);
                    }}
                    onDragEnd={() => {
                      const nextState = [...itemStates];
                      nextState[i].isDragging = false;
                      setItemStates(nextState);
                    }}
                    onSelect={() => onSelect(i)}
                    deSelectObject={deSelectObject}
                    onChangeStyle={(nextStyle) => {
                      const nextState = [...itemStates];
                      nextState[i].style = {
                        ...nextState[i].style,
                        ...nextStyle,
                      };
                      setItemStates(nextState);
                    }}
                    initLocation={initLocation}
                    setMouseInitLocation={setMouseInitLocation}
                    currentLocation={currentLocation}
                    setMouseCurrentLocation={setMouseCurrentLocation}
                    clientWidth={clientWidth}
                    modifyText={modifyText}
                    currentTextSize={currentTextSize}
                    textColor={currentColor}
                  />
                );
              })}
            </div>
          </div>
          <div id="edit-footer-menu">
            {selectState ? (
              <ImageProperty
                type={selectedItem.type}
                width={selectedItem.width}
                resizeWidth={resizeWidth}
                height={selectedItem.height}
                resizeHeight={resizeHeight}
                transform={selectedItem.transform}
                rotateObject={rotateObject}
                zindex={contemporaryZIndex}
                modifyZindex={modifyZindex}
                removeObject={removeObject}
                textSize={currentTextSize}
                resizeTextSize={setCurrentTextSize}
                textColor={currentColor}
                reSelectColor={setCurrentColor}
              />
            ) : (
              <PropertyBlank />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
