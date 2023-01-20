import React from "react";

const Icons = (props) => {
  const { src, width, height } = props;
  return (
    <>
      <img
        src={`/assets/img/icons/${src}.svg`}
        width={width}
        height={height}
        alt=""
      />
    </>
  );
};

export default Icons;
