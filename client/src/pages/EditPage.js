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
    setItemStates((prevState) => {
      return [
        ...prevState,
        {
          id: makeId(),
          src,
          style: {
            position: "absolute",
            width: "7rem",
            top: "12rem",
            left: "12rem",
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

  function removeObject() {
    window.onkeydown = (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        const removedItems = itemStates.filter((el) => el.isSelected !== true);
        setItemStates(removedItems);
        setSelectState(false);
      }
    };
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

  function onSelect(index) {
    clickSelected();
    const nextState = [...itemStates];
    nextState[index].isSelected = true;
    setItemStates(nextState);
    getSelectedItemInfo();
  }

  function onDeselect(index) {
    deClickSelected();
    const nextState = [...itemStates];
    nextState[index].isSelected = false;
    setItemStates(nextState);
  }

  function getSelectedItemInfo() {
    const itemInfo = itemStates.filter((el) => el.isSelected === true);
    setSelectedItem(itemInfo.shift().style);
  }

  removeObject();

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
                />
              );
            })}
          </div>
          <div id="detail-propertys">
            {selectState ? (
              <ImageProperty
                width={selectedItem.width}
                resizeWidth={resizeWidth}
              />
            ) : (
              <div>선택안됨</div>
            )}
          </div>
        </div>
        <div id="edit-tools">
          <div id="buttons">
            <div
              onClick={() => {
                setStateAll();
                setTemplateStatus(true);
              }}
            >
              {<img className="edit-button" src={templateImg} />}
            </div>
            <Template
              status={templateStatus}
              onClose={() => {
                setTemplateStatus(false);
              }}
              addToItems={addToItems}
            />

            <div
              onClick={() => {
                setStateAll();
                setElementsStatus(true);
              }}
            >
              {<img className="edit-button" src={elementsImg} />}
            </div>
            <Elements
              status={elementsStatus}
              onClose={() => {
                setElementsStatus(false);
              }}
            />

            <div
              onClick={() => {
                setStateAll();
                setImageStatus(true);
              }}
            >
              {<img className="edit-button" src={imageImg} />}
            </div>
            <Image status={imageStatus} onClose={() => setImageStatus(false)} />

            <div
              onClick={() => {
                setStateAll();
                setTextStatus(true);
              }}
            >
              {<img className="edit-button" src={textImg} />}
            </div>
            <Text status={textStatus} onClose={() => setTextStatus(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}
