import React, { useState, useRef } from "react";
import "../css/EditPage.css";
import ImageOnCanvas from "../components/editpage/canvas/modals/ImageOnCanvas";
import EditMenu from "../components/editpage/menu/EditMenu";
import EditMenuBar from "../components/editpage/menu/EditMenuBar";
import TopMenu from "../components/TopMenu";
import ImageProperty from "../components/editpage/canvas/modals/ImageProperty";
export default function EditPage() {
  // * 나중에 함수, 상태들 이름 정리한번 싹 하기 --> 직관적으로 알 수 있도록
  const [itemStates, setItemStates] = useState([]);
  const [selectState, setSelectState] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [menuBtnStatus, setMenuBtnStatus] = useState("menuBar-template");
  const canvasRef = useRef();

  function onSelect(index) {
    setSelectState(true);
    const nextState = [...itemStates];
    nextState[index].isSelected = true;
    nextState[index].style.zIndex = "1000";
    setItemStates(nextState);
    getSelectedItemInfo();
  }

  function onDeselect(index) {
    setSelectState(false);
    const nextState = [...itemStates];
    nextState[index].isSelected = false;
    nextState[index].style.zIndex = "0";
    setItemStates(nextState);
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

  function removeObject() {
    const removedItems = itemStates.filter((el) => el.isSelected !== true);
    setItemStates(removedItems);
    setSelectState(false);
  }

  function addToItems(src) {
    const canvas = document
      .querySelector("#canvas-paper")
      .getBoundingClientRect();
    setItemStates((prevState) => {
      return [
        ...prevState,
        {
          id: makeId(),
          src,
          // TODO : 작은화면에서 출력한 경우, 큰 화면으로 어떻게 가져올까?
          // 작은 화면과 큰 화면의 비율을 맞춰야 할 것 같음
          style: {
            position: "absolute",
            zIndex: 0,
            // 위치 재설정
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
  // window.onresize = (e) => {
  //   const canvasWidth = canvas.getBoundingClientRect().width;
  //   canvas.style.height = `${(canvasWidth * 3) / 4}px`;
  //   console.log(canvas.style.height);
  // };
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
            selectedItem={selectedItem}
            itemStates={itemStates}
            setItemStates={setItemStates}
            menuBtnStatus={menuBtnStatus}
            setMenuBtnStatus={setMenuBtnStatus}
            addToItems={addToItems}
          />
        </div>
        <div id="canvas">
          <div id="canvas-container">
            <div id="content"></div>
            <div id="canvas-paper" ref={canvasRef}>
              {itemStates.map((el, i) => {
                return (
                  <ImageOnCanvas
                    key={el.id}
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
                    onDeselect={() => onDeselect(i)}
                    onChangeStyle={(nextStyle) => {
                      const nextState = [...itemStates];
                      nextState[i].style = {
                        ...nextState[i].style,
                        ...nextStyle,
                      };
                      setItemStates(nextState);
                    }}
                    selectState={selectState}
                    canvasPaper={canvasRef.current}
                  />
                );
              })}
            </div>
          </div>
          <div id="edit-footer-menu">
            {selectState && (
              <ImageProperty
                width={selectedItem.width}
                height={selectedItem.height}
                transform={selectedItem.transform}
                resizeWidth={resizeWidth}
                resizeHeight={resizeHeight}
                rotateObject={rotateObject}
                removeObject={removeObject}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
