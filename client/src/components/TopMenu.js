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

  const accessToken = sessionStorage.getItem("accessTokenSession");
  // TODO : 서버로 저장
  // 위에서 다운로드하는 이미지 자체를 바로 서버로 보낼 수 있지 않을까?
  function saveToServer() {
    html2canvse(document.querySelector("#canvas-paper")).then(
      async (canvas) => {
        const myImage = canvas.toDataURL("image/png");
        await axios({
          method: "post",
          url: `${server_url}/mycard/post`,
          data: {
            // 현재 imgBase64 -> 이를 서버에서 이미지로 저장하기
            img: myImage,
          },
          headers: {
            "Content-Type": "application/x-www-url-form-encoded",
          },
        })
          .then(() => {
            console.log("전송되었습니다.");
          })
          .catch((err) => alert(err));
      }
    );
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
