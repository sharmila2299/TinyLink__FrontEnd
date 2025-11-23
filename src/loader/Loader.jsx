import React from "react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        overflow: "hidden",
        zIndex: 9999,
        pointerEvents: "none",
        backgroundColor: "rgba(210, 211, 253, 0.7)",
      }}
    >
      <BeatLoader color="rgba(126, 168, 227, 1)" />
    </div>
  );
};

export default Loader;
