import React from "react";
import BackgroundColor from "../canvas/modals/BackgroundColor";
import Templates from "../canvas/modals/Templates";
import Image from "../canvas/modals/Image";
import Elements from "../canvas/modals/Elements";
import Text from "../canvas/modals/Text";
import "../../../css/editpage/menu/EditMenu.css";
const EditMenu = ({
  makeId,
  setMenuBtnOn,
  menuBtnStatus,
  addToItems,
  currentText,
  setCurrentText,
  currentCanvasColor,
  handleCanvasColor,
  setCurrentTemplate,
}) => {
  return (
    <div id="detail-property">
      <div id="edit-menu-container">
        {menuBtnStatus === "menuBar-bg" && (
          <BackgroundColor
            setMenuBtnOn={setMenuBtnOn}
            addToItems={addToItems}
            makeId={makeId}
            currentCanvasColor={currentCanvasColor}
            handleCanvasColor={handleCanvasColor}
          />
        )}
        {menuBtnStatus === "menuBar-templates" && (
          <Templates
            setMenuBtnOn={setMenuBtnOn}
            addToItems={addToItems}
            makeId={makeId}
            setCurrentTemplate={setCurrentTemplate}
          />
        )}
        {menuBtnStatus === "menuBar-elements" && (
          <Elements
            setMenuBtnOn={setMenuBtnOn}
            addToItems={addToItems}
            makeId={makeId}
          />
        )}
        {menuBtnStatus === "menuBar-image" && (
          <Image
            setMenuBtnOn={setMenuBtnOn}
            addToItems={addToItems}
            makeId={makeId}
          />
        )}
        {menuBtnStatus === "menuBar-text" && (
          <Text
            setMenuBtnOn={setMenuBtnOn}
            addToItems={addToItems}
            makeId={makeId}
            currentText={currentText}
            setCurrentText={setCurrentText}
          />
        )}
      </div>
    </div>
  );
};

export default EditMenu;
