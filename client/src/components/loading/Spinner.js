import React, { useRef } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import "../../css/loading/Spinner.css";
const Spinner = () => {
  const spinnerRef = useRef();
  return (
    <div className="spinner-container">
      <div className="spinner-box" ref={spinnerRef}>
        <SyncLoader size="25" margin="5" color="#36D7B7" />
      </div>
    </div>
  );
};

export default Spinner;
