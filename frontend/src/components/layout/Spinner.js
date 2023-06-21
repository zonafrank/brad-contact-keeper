import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <>
      <img
        src={spinner}
        style={{ width: 200, margin: "auto", display: "block" }}
        alt="loading spinner"
      />
    </>
  );
};

export default Spinner;
