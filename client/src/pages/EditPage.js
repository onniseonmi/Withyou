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
export default function EditPage() {
  const [template, setTemplate] = useState(false);
  const [elements, setElements] = useState(false);
  const [image, setImage] = useState(false);
  const [text, setText] = useState(false);
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
          <div id="canvas">Edit-Tool</div>
          <div id="detail-propertys">Property</div>
        </div>
        <div id="edit-tools">
          {/* 이것들 누르면 모달로 안에 차도록 하면 될 듯 */}
          <div id="buttons">
            <div
              onClick={() => {
                setStateAll();
                setTemplate(true);
              }}
            >
              {<img className="edit-button" src={templateImg} />}
            </div>
            <Template
              status={template}
              onClose={() => {
                setTemplate(false);
              }}
            />

            <div
              onClick={() => {
                setStateAll();
                setElements(true);
              }}
            >
              {<img className="edit-button" src={elementsImg} />}
            </div>
            <Elements
              status={elements}
              onClose={() => {
                setElements(false);
              }}
            />

            <div
              onClick={() => {
                setStateAll();
                setImage(true);
              }}
            >
              {<img className="edit-button" src={imageImg} />}
            </div>
            <Image status={image} onClose={() => setImage(false)} />

            <div
              onClick={() => {
                setStateAll();
                setText(true);
              }}
            >
              {<img className="edit-button" src={textImg} />}
            </div>
            <Text status={text} onClose={() => setText(false)} />
          </div>
        </div>
      </div>
    </div>
  );
  // 다른 상태들이 켜져 있으면 그 상태 끄는 함수
  function setStateAll() {
    const states = [
      [template, setTemplate],
      [elements, setElements],
      [image, setImage],
      [text, setText],
    ];

    states.forEach((el) => {
      if (el[0] === true) {
        el[1](false);
      }
    });
  }
}
