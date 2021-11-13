import React from "react";
import "../../../css/Property.css";
import templateImg from "../../../images/template/sample.png";
export default function Property(props) {
  if (!props.status) {
    return null;
  }
  return <div id="property-modal"></div>;
}
