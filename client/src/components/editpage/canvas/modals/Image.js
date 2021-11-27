import React from "react";
import "../../../../css/editpage/canvas/modals/ImageModal.css";

export default function Image({ addToItems }) {
  async function uploadFile() {
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        addToItems(reader.result, "image");
      });
      document.querySelector("#image-input").value = "";
    } else {
      // TODO : 이미지 업로드 실패시 모달 생성
      alert("이미지를 선택하세요");
    }
  }

  return (
    <div id="image-modal">
      <div id="image-modal-nav" className="edit--menu-title">
        <div>Image</div>
        <div id="image-modal-text">원하는 이미지를 업로드 하세요</div>
      </div>
      <div id="image-modal-upload">
        <input type="file" id="image-input" />
        <button id="add-image-button" onClick={() => uploadFile()}>
          이미지 추가
        </button>
      </div>
    </div>
  );
}
