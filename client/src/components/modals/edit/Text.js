import React from "react";
import "../../../css/modals/edit/TextModal.css";
import templateImg from "../../../images/template/sample.png";
export default function Text(props) {
  if (!props.status) {
    return null;
  }
  return (
    <div id="text-modal">
      <div id="text-modal-nav">
        Text
        <button id="text-close-button" onClick={() => props.onClose()}>
          Close
        </button>
      </div>
      <div id="text-modal-propertys">
        <div className="property">
          <div className="title">글꼴</div>
          <div className="value">Gothic A1</div>
        </div>
        <div className="property">
          <div className="title">크기</div>
          <div className="value">20</div>
        </div>
        <div className="property">
          <div className="title">색상</div>
          <div className="value">HEX: #4f4f4f RGB: 79, 79, 79</div>
        </div>
        <button id="text-apply-button" onClick={() => props.onClose()}>
          적용하기
        </button>
      </div>
    </div>
  );
}
