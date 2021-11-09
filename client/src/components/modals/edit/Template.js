import React from "react";
import "../../../css/TemplateModal.css";
import templateImg from "../../../images/template/sample.png";
export default function Template(props) {
  if (!props.status) {
    return null;
  }
  return (
    <div id="template-modal">
      <div id="template-modal-nav">
        Template
        <button id="template-close-button" onClick={() => props.onClose()}>
          Close
        </button>
      </div>
      <div id="template-description">
        <div id="template-modal-text">원하는 템플릿을 선택하세요</div>
      </div>
      <div id="template-modal-upload">
        <div className="template-row">
          <img
            id="template-modal-add-button"
            src={templateImg}
            onClick={(e) => {
              props.addToCanvas(e);
              props.onClose();
            }}
          />
          <img id="template-modal-add-button" src={templateImg} />
          <img id="template-modal-add-button" src={templateImg} />
        </div>
        <div className="template-row">
          <img id="template-modal-add-button" src={templateImg} />
          <img id="template-modal-add-button" src={templateImg} />
          <img id="template-modal-add-button" src={templateImg} />
        </div>
      </div>
    </div>
  );
}
