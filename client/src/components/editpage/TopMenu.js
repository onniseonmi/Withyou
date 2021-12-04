import React, { useState } from 'react';
import '../../css/editpage/TopMenu.css';
import html2canvse from 'html2canvas';
import axios from 'axios';
import SaveMessage from './SaveMessage';
axios.default.withCredentials = true;
const server_url_1 = 'http://localhost:4000';
const server_url_2 =
  'http://ec2-3-24-168-238.ap-southeast-2.compute.amazonaws.com:4000';
export default function TopMenu({
  deSelectObject,
  setItemStates,
  setCurrentCanvasColor,
}) {
  const [isSave, setIsSave] = useState(false);

  async function download() {
    await deSelectObject();
    await html2canvse(document.querySelector('#canvas-paper')).then(
      (canvas) => {
        const myImage = canvas.toDataURL('image/png');
        if (document.body.clientWidth < 900) {
          canvas.width = canvas.width * 2;
          canvas.height = canvas.height * 2;
        }
        let el = document.createElement('a');
        el.href = myImage;
        el.download = 'My Card.png';
        el.click();
        el.remove();
      }
    );
  }

  async function saveToServer() {
    await deSelectObject();
    await html2canvse(document.querySelector('#canvas-paper')).then(
      (canvas) => {
        const myImage = canvas.toDataURL('image/png');
        if (document.body.clientWidth < 900) {
          canvas.width = canvas.width * 2;
          canvas.height = canvas.height * 2;
        }
        let blobBin = atob(myImage.split(',')[1]); // base64 데이터 디코딩
        let array = [];
        for (let i = 0; i < blobBin.length; i++) {
          array.push(blobBin.charCodeAt(i));
        }
        let blob = new Blob([new Uint8Array(array)], { type: 'image/png' }); // Blob 생성
        let file = new File([blob], 'My card.png', {
          type: 'image/png',
        });
        let formData = new FormData(); // formData 생성
        formData.append('img', file); // file data 추가

        const accessTokenSession = sessionStorage.getItem('accessTokenSession');

        axios({
          method: 'POST',
          url: `${server_url_2}/mycard/post`,
          data: formData,
          headers: {
            authorization: `Bearer ${accessTokenSession}`,
            // processData: false,
            // "content-type": false,
            'content-type': 'multipart/form-data boundary=something',
          },
        })
          .then(() => {
            setIsSave(true);
            setTimeout(() => {
              setIsSave(false);
            }, 2000);
          })
          .catch((err) => alert(err));
      }
    );
  }

  return (
    <div id='top-menu'>
      <div className='top-menu-box top-menu-left'>
        <div
          id='delete-all-object'
          onClick={() => {
            setCurrentCanvasColor({ hex: '#ffffff' });
            setItemStates([]);
          }}
        >
          전체 삭제
        </div>
      </div>
      <div className='top-menu-box top-menu-right'>
        <div id='top-menu-save'>
          <div id='download' onClick={() => download()}>
            다운로드
          </div>
          <div id='save' onClick={() => saveToServer()}>
            저장하기
          </div>
        </div>
      </div>
      {isSave && <SaveMessage setIsSave={setIsSave} />}
    </div>
  );
}
