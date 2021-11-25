import React, { useState } from "react";
import "../css/EditPage.css";
import ImageOnCanvas from "../components/editpage/canvas/modals/ImageOnCanvas";
import EditMenu from "../components/editpage/menu/EditMenu";
import EditMenuBar from "../components/editpage/menu/EditMenuBar";
import TopMenu from "../components/TopMenu";
import ImageProperty from "../components/editpage/canvas/modals/ImageProperty";
import PropertyBlank from "../components/editpage/canvas/modals/PropertyBlank";

export default function EditPage() {
  // * 나중에 함수, 상태들 이름 정리한번 싹 하기 --> 직관적으로 알 수 있도록
  const [itemStates, setItemStates] = useState([]);
  const [selectState, setSelectState] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [menuBtnStatus, setMenuBtnStatus] = useState("menuBar-template");
  const [contemporaryZIndex, setcontemporaryZIndex] = useState(0);
  const [initLocation, setInitLocation] = useState({ x: 0, y: 0 });
  const [currentLocation, setCurrentLocation] = useState({ x: 0, y: 0 });
  const [currentId, setCurrentId] = useState({ id: "" });
  const { clientWidth } = document.body;
  // 가장 위로 올리려면, 현재 인덱스중 가장 높은 놈으로 만들어주면 된다.

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

  function addToItems(src) {
    const canvas = document
      .querySelector("#canvas-paper")
      .getBoundingClientRect();
    // ! 아래 코드 중복 줄이기
    setItemStates((prevState) => {
      if (clientWidth >= 900) {
        return [
          ...prevState,
          {
            id: makeId(),
            src,
            style: {
              position: "absolute",
              zIndex: itemStates.length,
              width: canvas.width / 6,
              height: canvas.height / 6,
              top: canvas.height / 4 - canvas.height / 10,
              left: canvas.width / 4 - canvas.width / 12,
              transform: "rotate(0deg)",
            },
            isSelected: false,
            isDragging: false,
          },
        ];
      } else {
        return [
          ...prevState,
          {
            id: makeId(),
            src,
            style: {
              position: "absolute",
              zIndex: itemStates.length,
              width: canvas.width / 3,
              height: canvas.height / 3,
              top: canvas.height / 2 - canvas.height / 5,
              left: canvas.width / 2 - canvas.width / 6,
              transform: "rotate(0deg)",
            },
            isSelected: false,
            isDragging: false,
          },
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

  return (
    <>
      <div id="canvas-top-menu">
        <TopMenu />
      </div>
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
          />
        </div>
        <div id="canvas">
          <div id="canvas-container" onClick={(e) => onclickToDeselect(e)}>
            <div id="content"></div>
            <div id="canvas-paper">
              {itemStates.map((el, i) => {
                return (
                  <ImageOnCanvas
                    key={el.id}
                    id={el.id}
                    src={el.src}
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
                    // onDeselect={() => onDeselect(i)}
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
                  />
                );
              })}
            </div>
          </div>
          <div id="edit-footer-menu">
            {selectState ? (
              <ImageProperty
                itemStates={itemStates}
                width={selectedItem.width}
                height={selectedItem.height}
                transform={selectedItem.transform}
                zindex={contemporaryZIndex}
                modifyZindex={modifyZindex}
                resizeWidth={resizeWidth}
                resizeHeight={resizeHeight}
                rotateObject={rotateObject}
                removeObject={removeObject}
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
