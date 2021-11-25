import React from "react";
import "../css/TopMenu.css";
import html2canvse from "html2canvas";
import axios from "axios";
const server_url = "http://localhost:4000";

export default function TopMenu({ saveCard }) {
  // TODO : 캔버스 저장하기
  const accessToken = sessionStorage.getItem("accessTokenSession");

  function download() {
    html2canvse(document.querySelector("#canvas-paper")).then((canvas) => {
      const myImage = canvas.toDataURL("image/png");
      let el = document.querySelector("#download");
      el.href = myImage;
      el.download = "sample.png";
      el.click();
    });
  }

  function saveToServer() {
    html2canvse(document.querySelector("#canvas-paper")).then(
      async (canvas) => {
        const myImage = canvas.toDataURL("image/png");
        // 이 부분을 서버로 보내게 하면 될듯?
        // 이 URL을 서버로 보내주기 -> 어디로 보내지
        await axios({
          method: "POST",
          url: `${server_url}/profile`,
          data: { data: myImage },
          withCredentials: true,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
          .then(() =>
            // 또는 특정 모달이 생성되도록~
            alert("저장되었습니다. 마이페이지에서 확인해보실 수 있어요!")
          )
          .catch((el) => console.log(el));
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
