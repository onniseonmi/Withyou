import React, { useState } from "react";
import react from "react-dom";
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

export default function EditPage() {
  const [templateStatus, setTemplateStatus] = useState(false);
  const [elementsStatus, setElementsStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);
  const [textStatus, setTextStatus] = useState(false);
  // 생성되는 이미지를 배열에 담아둔다.
  const [items, setItems] = useState([]);
  const [classIndex, setClassIndex] = useState([]);
  // 이 배열에 담긴 애들을 렌더한다.
  deleteObject();

  // 삭제할 경우, 이 배열에 담긴 내용을 삭제한다.
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
          <div id="canvas"></div>
          <div id="detail-propertys"></div>
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
              renderToCanvas={renderToCanvas}
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

  function addToItems(e) {
    console.log("addToItems");
    const a = (
      <ImageOnCanvas
        src={e.target.src}
        style={{
          width: "5rem",
          position: "absolute",
          // TODO : 위치 제대로 찾아서 넣기 -> 좀 더 고민해보기
          top: "15rem",
          left: "12.5rem",
          border: "solid 0.1rem white",
        }}
        items={items}
      />
    );
    setItems((prevState) => {
      return [...prevState, a];
    });
  }

  function renderToCanvas() {
    items.map((el) => {
      react.render(el, document.querySelector("#canvas"));
    });
  }

  function deleteObject() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        // * 왜 여러번 반복돼서 출력이 될까? 렌더링을 여러번하나..?
        console.log("Press Key");
        const selected = document.querySelector(".selected");
        if (selected) {
          // TODO : items를 순회해서 클래스가 selected면 제거해버린다.
          // items.map((el) => console.log(el));
        }
      }
    });
  }
}
