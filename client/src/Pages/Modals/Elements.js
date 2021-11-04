import React from "react";
import "../../CSS/ElementsModal.css";

export default function Elements(props) {
  if (!props.status) {
    return null;
  }
  return (
    <div id="modal">
      <div id="modal-nav">
        Elements
        <button id="close-button" onClick={() => props.onClose()}>
          Close
        </button>
      </div>
      <div id="description">
        <div id="modal-text">원하는 것을 선택하세요</div>
      </div>
      <div id="modal-upload">
        <div className="row">
          <img
            id="modal-add-button"
            src="image/Elements/sample.png"
            onClick={
              // TODO : 누르면 템플릿 적용되도록 구현
              () => props.onClose()
            }
          />
          <img id="modal-add-button" src="image/elements/sample.png" />
          <img id="modal-add-button" src="image/elements/sample.png" />
        </div>
        <div className="row">
          <img id="modal-add-button" src="image/elements/sample.png" />
          <img id="modal-add-button" src="image/elements/sample.png" />
          <img id="modal-add-button" src="image/elements/sample.png" />
        </div>
      </div>
    </div>
  );
}
