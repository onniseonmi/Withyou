import React, { useState } from "react";
import Template from "./Modals/Template";
import Image from "./Modals/Image";
import Elements from "./Modals/Elements";

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
        <div id="canvas">Edit-Tool</div>
        <div id="detail-propertys">Property</div>
        <div id="edit-tools">
          {/* 이것들 누르면 모달로 안에 차도록 하면 될 듯 */}
          <div id="buttons">
            <div
              onClick={() => {
                setStateAll();
                setTemplate(true);
              }}
            >
              {<img className="edit-button" src="image/template.png" />}
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
              {<img className="edit-button" src="image/elements.png" />}
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
              {<img className="edit-button" src="image/image.png" />}
            </div>
            <Image status={image} onClose={() => setImage(false)} />

            <img
              className="edit-button"
              src="image/text.png"
              alt="text"
              onClick={() => {
                // TODO : 얘는 누르면 화면에 바로 텍스트가 출력되도록 구현
                console.log("text!");
              }}
            />
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
