import React from "react";
import ImageProperty from "../canvas/modals/ImageProperty";
import Template from "../canvas/modals/Template";
import Image from "../canvas/modals/Image";
import Elements from "../canvas/modals/Elements";
import Text from "../canvas/modals/Text";
import "../../../css/editpage/menu/EditMenu.css";
const EditMenu = ({
  setItemStates,
  setMenuBtnOn,
  menuBtnStatus,
  setMenuBtnStatus,
  addToItems,
}) => {
  return (
    <div id="detail-property">
      <div id="edit-menu-container">
        {menuBtnStatus === "menuBar-template" ? (
          <Template setMenuBtnOn={setMenuBtnOn} addToItems={addToItems} />
        ) : null}
        {menuBtnStatus === "menuBar-elements" ? (
          <Elements setMenuBtnOn={setMenuBtnOn} addToItems={addToItems} />
        ) : null}
        {menuBtnStatus === "menuBar-image" ? (
          <Image setMenuBtnOn={setMenuBtnOn} addToItems={addToItems} />
        ) : null}
        {menuBtnStatus === "menuBar-text" ? (
          <Text setMenuBtnOn={setMenuBtnOn} addToItems={addToItems} />
        ) : null}
      </div>
    </div>
  );
};

export default EditMenu;
