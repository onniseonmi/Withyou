import React, { useRef } from "react";
import templateImg from "../../../images/template.png";
import elementsImg from "../../../images/elements.png";
import imageImg from "../../../images/image.png";
import textImg from "../../../images/text.png";
import "../../../css/editpage/menu/EditMenuBar.css";
const EditMenuBar = ({ setMenuBtnStatus, setSelectState }) => {
  const imgBoxRef = useRef([]);
  const imgRef = useRef([]);
  const handleClick = (e) => {
    setMenuBtnStatus(e.target.id);
    setSelectState(false);
  };
  return (
    <div id="menuBar-container">
      <div
        id="menuBar-bg-box"
        className="menubar-btn"
        ref={(el) => (imgBoxRef.current[0] = el)}
        onClick={(e) => imgRef.current[0].click()}
      >
        {
          <img
            id="menuBar-bg"
            className="edit-button"
            alt="templateImg"
            src={templateImg}
            ref={(el) => (imgRef.current[0] = el)}
            onClick={(e) => handleClick(e)}
          />
        }
      </div>
      <div
        id="menuBar-elements-box"
        className="menubar-btn"
        ref={(el) => (imgBoxRef.current[1] = el)}
        onClick={(e) => imgRef.current[1].click()}
      >
        {
          <img
            id="menuBar-elements"
            className="edit-button"
            alt="elementsImg"
            src={elementsImg}
            ref={(el) => (imgRef.current[1] = el)}
            onClick={(e) => handleClick(e)}
          />
        }
      </div>
      <div
        id="menuBar-image-box"
        className="menubar-btn"
        ref={(el) => (imgBoxRef.current[2] = el)}
        onClick={(e) => imgRef.current[2].click()}
      >
        {
          <img
            id="menuBar-image"
            className="edit-button"
            alt="imageImg"
            src={imageImg}
            ref={(el) => (imgRef.current[2] = el)}
            onClick={(e) => handleClick(e)}
          />
        }
      </div>

      <div
        id="menuBar-text-box"
        className="menubar-btn"
        ref={(el) => (imgBoxRef.current[3] = el)}
        onClick={(e) => imgRef.current[3].click()}
      >
        {
          <img
            id="menuBar-text"
            className="edit-button"
            alt="textImg"
            src={textImg}
            ref={(el) => (imgRef.current[3] = el)}
            onClick={(e) => handleClick(e)}
          />
        }
      </div>
    </div>
  );
};

export default EditMenuBar;
