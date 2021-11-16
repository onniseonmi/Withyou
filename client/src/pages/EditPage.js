import React, { useState } from "react";
import Template from "../components/modals/edit/Template";
import Image from "../components/modals/edit/Image";
import Elements from "../components/modals/edit/Elements";
import Text from "../components/modals/edit/Text";
import templateImg from "../images/template.png";
import elementsImg from "../images/elements.png";
import imageImg from "../images/image.png";
import textImg from "../images/text.png";
import "../css/EditPage.css";
import ImageOnCanvas from "../components/modals/edit/ImageOnCanvas";
import ImageProperty from "../components/modals/edit/ImageProperty";

export default function EditPage() {
  // * 나중에 함수, 상태들 이름 정리한번 싹 하기 --> 직관적으로 알 수 있도록
  const [templateStatus, setTemplateStatus] = useState(false);
  const [elementsStatus, setElementsStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);
  const [textStatus, setTextStatus] = useState(false);
  const [itemStates, setItemStates] = useState([]);
  const [selectState, setSelectState] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  function setStateAll() {
    const states = [
      [templateStatus, setTemplateStatus],
      [elementsStatus, setElementsStatus],
      [imageStatus, setImageStatus],
      [textStatus, setTextStatus],
    ];

    states.forEach((el) => {
      if (el[0] === true) {
        el[1](false);
      }
    });
  }

  function addToItems(src) {
    const canvas = document.querySelector("#canvas").getBoundingClientRect();
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
            width: canvas.width / 5,
            top: canvas.y + canvas.height / 3,
            left: canvas.x + canvas.width / 3,
            transform: "rotate(0deg)",
          },
          isSelected: false,
          isDragging: false,
        },
      ];
    });
  }

  function resizeWidth(input) {
    const nextState = [...itemStates];
    const targetIndex = itemStates.findIndex((el) => el.isSelected === true);
    nextState[targetIndex].style.width = input;
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

  function makeId() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  function clickSelected() {
    setSelectState(true);
  }

  function deClickSelected() {
    setSelectState(false);
  }
  // selectState 값 확인
  // 선택하면  zindex
  // onselect 등 확인
  function onSelect(index) {
    clickSelected();
    const nextState = [...itemStates];
    nextState[index].isSelected = true;
    nextState[index].style.zIndex = "1000";
    setItemStates(nextState);
    getSelectedItemInfo();
  }

  function onDeselect(index) {
    deClickSelected();
    const nextState = [...itemStates];
    nextState[index].isSelected = false;
    nextState[index].style.zIndex = "0";
    setItemStates(nextState);
  }

  function getSelectedItemInfo() {
    const itemInfo = itemStates.filter((el) => el.isSelected === true);
    setSelectedItem(itemInfo.shift().style);
  }

  return (
    <div id="EditPage">
      <div id="sub-nav">
        <div className="sub-nav-menus">
          <div className="sub-nav-menu">실행취소</div>
          <div className="sub-nav-menu">되돌리기</div>
        </div>
        <div className="sub-nav-menu">저장하기</div>
      </div>
      <div id="editScreen">
        <div id="edit-property">
          <div id="canvas">
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
                  clickSelected={clickSelected}
                  deClickSelected={deClickSelected}
                  selectState={selectState}
                  setStateAll={setStateAll}
                />
              );
            })}
          </div>
          <div id="detail-propertys">
            {selectState ? (
              <ImageProperty
                width={selectedItem.width}
                transform={selectedItem.transform}
                resizeWidth={resizeWidth}
                rotateObject={rotateObject}
                removeObject={removeObject}
              />
            ) : null}
            {templateStatus ? (
              <Template
                status={templateStatus}
                onClose={() => {
                  setTemplateStatus(false);
                }}
                addToItems={addToItems}
              />
            ) : null}
            {elementsStatus ? (
              <Elements
                status={elementsStatus}
                onClose={() => {
                  setElementsStatus(false);
                }}
                addToItems={addToItems}
              />
            ) : null}
            {imageStatus ? (
              <Image
                status={imageStatus}
                onClose={() => setImageStatus(false)}
                addToItems={addToItems}
              />
            ) : null}
            {textStatus ? (
              <Text
                status={textStatus}
                onClose={() => setTextStatus(false)}
                addToItems={addToItems}
              />
            ) : null}
          </div>
        </div>
        <div id="edit-tools">
          <div id="buttons">
            <div
              id="template"
              onClick={() => {
                setSelectState(false);
                setStateAll();
                setTemplateStatus(true);
              }}
            >
              {<img className="edit-button" src={templateImg} />}
            </div>

            <div
              id="elements"
              onClick={() => {
                setSelectState(false);
                setStateAll();
                setElementsStatus(true);
              }}
            >
              {<img className="edit-button" src={elementsImg} />}
            </div>

            <div
              id="iamge"
              onClick={() => {
                setSelectState(false);
                setStateAll();
                setImageStatus(true);
              }}
            >
              {<img className="edit-button" src={imageImg} />}
            </div>

            <div
              id="text"
              onClick={() => {
                setSelectState(false);
                setStateAll();
                setTextStatus(true);
              }}
            >
              {<img className="edit-button" src={textImg} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
