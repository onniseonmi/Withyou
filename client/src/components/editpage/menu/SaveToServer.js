import React from "react";
import html2canvse from "html2canvas";
import axios from "axios";
const server_url_1 = "http://localhost:4000";
const server_url_2 =
  "http://ec2-3-24-168-238.ap-southeast-2.compute.amazonaws.com:4000";

axios.default.withCredentials = true;

export default function SaveToServer({
  isLogin,
  deSelectObject,
  setIsSuccessMessage,
  setIsClientError,
  setIsServerError,
}) {
  async function saveToServer() {
    if (isLogin) {
      await deSelectObject();
      await html2canvse(document.querySelector("#canvas-paper"))
        .then((canvas) => {
          const myImage = canvas.toDataURL("image/png");
          if (document.body.clientWidth < 900) {
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
          }
          let blobBin = atob(myImage.split(",")[1]);
          let array = [];
          for (let i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
          }
          let blob = new Blob([new Uint8Array(array)], { type: "image/png" });
          let file = new File([blob], "My card.png", {
            type: "image/png",
          });
          let formData = new FormData();
          formData.append("img", file);

          const accessTokenSession =
            sessionStorage.getItem("accessTokenSession");

          axios({
            method: "POST",
            url: `${server_url_2}/mycard/post`,
            data: formData,
            headers: {
              authorization: `Bearer ${accessTokenSession}`,
              "content-type": "multipart/form-data boundary=something",
            },
          })
            .then(() => {
              setIsSuccessMessage(true);
              setTimeout(() => {
                setIsSuccessMessage(false);
              }, 2000);
            })
            .catch((err) => setIsServerError(true));
        })
        .catch((err) => setIsServerError(true));
    } else {
      setIsClientError(true);
    }
  }

  return (
    <div id="save" onClick={() => saveToServer()}>
      저장하기
    </div>
  );
}
