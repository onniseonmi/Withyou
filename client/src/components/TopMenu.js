import React from "react";
import "../css/TopMenu.css";
import html2canvse from "html2canvas";
import axios from "axios";
const server_url = "http://localhost:4000";

export default function TopMenu() {
  function download() {
    html2canvse(document.querySelector("#canvas-paper")).then((canvas) => {
      const myImage = canvas.toDataURL("image/png");
      if (document.body.clientWidth < 900) {
        canvas.width = canvas.width * 2;
        canvas.height = canvas.height * 2;
      }
      let el = document.createElement("a");
      el.href = myImage;
      el.download = "My Card.png";
      el.click();
      el.remove();
    });
  }

  function saveToServer() {
    html2canvse(document.querySelector("#canvas-paper")).then((canvas) => {
      const myImage = canvas.toDataURL("image/png");
      if (document.body.clientWidth < 900) {
        canvas.width = canvas.width * 2;
        canvas.height = canvas.height * 2;
      }
      let blobBin = atob(myImage.split(",")[1]); // base64 데이터 디코딩
      let array = [];
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      let blob = new Blob([new Uint8Array(array)], { type: "image/png" }); // Blob 생성
      let file = new File([blob], "My card.png", {
        type: "image/png",
      });
      let formData = new FormData(); // formData 생성
      formData.append("img", file); // file data 추가

      const accessTokenSession = sessionStorage.getItem("accessTokenSession");

      axios({
        method: "POST",
        url: `${server_url}/mycard/post`,
        data: formData,
        headers: {
          authorization: `Bearer ${accessTokenSession}`,
          // processData: false,
          // "content-type": false,
          "content-type": "multipart/form-data boundary=something",
        },
      })
        .then(() => {
          alert("전송되었습니다.");
        })
        .catch((err) => alert(err));
    });
  }

  return (
    <div id="top-menu">
      <div className="top-menu-box top-menu-left">
        <div>새 페이지</div>
        <div>페이지 추가</div>
      </div>
      <div className="top-menu-box top-menu-right">
        <div id="top-menu-save">
          <a id="download" onClick={() => download()}>
            다운로드
          </a>
          <a id="save" onClick={() => saveToServer()}>
            저장하기
          </a>
        </div>
      </div>
    </div>
  );
}
