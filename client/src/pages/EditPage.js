import React, { useCallback, useEffect, useState } from "react";
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
  const [clickOn, setClickOn] = useState(false); // ! 얘도 쓸모없음 -->
  // TODO : 상태가 전달이 안되는 이유 찾기 -> useCallback() 이용?
  
  // 부모 상태가 바로 안 적용..
  const addToCanvas = useCallback(
    (e) => {
      const a = (
        <ImageOnCanvas
          src={e.target.src}
          clickOn={clickOn}
          setClickOn={setClickOn}
          style={{
            width: "5rem",
            position: "absolute",
            // TODO : 위치 제대로 찾아서 넣기
            top: "15rem",
            left: "12.5rem",
            border: "solid 0.1rem white",
          }}
        />
      );
      react.render(a, document.querySelector("#canvas"));
    },
    [clickOn]
  );

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
              addToCanvas={addToCanvas}
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
  // 다른 상태들이 켜져 있으면 그 상태 끄는 함수
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
}
