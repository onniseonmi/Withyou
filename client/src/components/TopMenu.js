import React from "react";
import "../css/TopMenu.css";
const TopMenu = () => {
  return (
    <div id="top-menu">
      <div className="top-menu-box">
        <div id="top-menu-undo">실행취소</div>
        <div id="top-menu-redo">되돌리기</div>
        <div id="top-menu-save">저장하기</div>
      </div>
    </div>
  );
};

export default TopMenu;
