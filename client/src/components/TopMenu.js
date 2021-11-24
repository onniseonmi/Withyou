import React from "react";
import "../css/TopMenu.css";
export default function TopMenu() {
  async function startCapture(displayMediaOptions) {
    let captureStream = null;

    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
    } catch (err) {
      console.error("Error: " + err);
    }
    return captureStream;
  }
  return (
    <div id="top-menu">
      <div className="top-menu-box">
        <div id="top-menu-save" onClick={() => startCapture()}>
          저장하기
        </div>
      </div>
    </div>
  );
}
