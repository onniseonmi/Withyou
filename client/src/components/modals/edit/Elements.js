import React from "react";
import "../../../css/modals/edit/ElementsModal.css";
import a from "../../../images/add_image.png";

export default function Elements(props) {
  if (!props.status) {
    return null;
  }
  return (
    <div id="elements-modal">
      <div id="elements-modal-nav">
        Elements
        <button id="elements-close-button" onClick={() => props.onClose()}>
          Close
        </button>
      </div>
      <div id="elements-description">
        <div id="elements-modal-text">원하는 것을 선택하세요</div>
      </div>
      <div id="elements-modal-upload">
        <div className="elements-row">
          <img
            id="elements-modal-add-button"
            src={a}
            onClick={
              // TODO : 누르면 템플릿 적용되도록 구현
              // 그 후 닫힘
              () => props.onClose()
            }
          />
          <img id="elements-modal-add-button" src={a} />
          <img id="elements-modal-add-button" src={a} />
        </div>
        <div className="elements-row">
          <img id="elements-modal-add-button" src={a} />
          <img id="elements-modal-add-button" src={a} />
          <img id="elements-modal-add-button" src={a} />
        </div>
      </div>
    </div>
  );
}
