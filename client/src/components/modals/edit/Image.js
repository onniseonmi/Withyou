import React from "react";
import "../../../css/ImageModal.css";
import image from "../../../images/addButton.png";

export default function Image(props) {
  if (!props.status) {
    return null;
  }
  return (
    <div id="image-modal">
      <div id="image-modal-nav">
        Image
        <button id="image-close-button" onClick={() => props.onClose()}>
          Close
        </button>
      </div>
      <div id="image-description">
        <div id="image-modal-text">원하는 이미지를 업로드 하세요</div>
      </div>
      <div id="image-modal-upload">
        <img
          id="image-modal-add-button"
          src={image}
          onClick={() => {
            // TODO : 사진 업로드 구현하기
            console.log("업로드 완료");
            props.onClose();
          }}
        />
      </div>
    </div>
  );
}
