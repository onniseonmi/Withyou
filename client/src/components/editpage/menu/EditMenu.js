import React from "react";
import BackgroundColor from "../canvas/modals/BackgroundColor";
import Image from "../canvas/modals/Image";
import Elements from "../canvas/modals/Elements";
import Text from "../canvas/modals/Text";
import "../../../css/editpage/menu/EditMenu.css";
const EditMenu = ({
  makeId,
  setItemStates,
  setMenuBtnOn,
  menuBtnStatus,
  setMenuBtnStatus,
  addToItems,
  currentText,
  setCurrentText,
  handleCanvasColor,
}) => {
  return (
    <div id="detail-property">
      <div id="edit-menu-container">
        {menuBtnStatus === "menuBar-template" ? (
          <BackgroundColor
            setMenuBtnOn={setMenuBtnOn}
            addToItems={addToItems}
            makeId={makeId}
            handleCanvasColor={handleCanvasColor}
          />
        ) : null}
        {menuBtnStatus === "menuBar-elements" ? (
          <Elements
            setMenuBtnOn={setMenuBtnOn}
            addToItems={addToItems}
            makeId={makeId}
          />
        ) : null}
        {menuBtnStatus === "menuBar-image" ? (
          <Image
            setMenuBtnOn={setMenuBtnOn}
            addToItems={addToItems}
            makeId={makeId}
          />
        ) : null}
        {menuBtnStatus === "menuBar-text" ? (
          <Text
            setMenuBtnOn={setMenuBtnOn}
            addToItems={addToItems}
            makeId={makeId}
            currentText={currentText}
            setCurrentText={setCurrentText}
          />
        ) : null}
      </div>
    </div>
  );
};

export default EditMenu;
