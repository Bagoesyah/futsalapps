import React from "react";

const RowGroup = (props) => {
  const { children, className } = props;
  return (
    <>
      <div className={`flex gap-2 ${className || ""}`}>{children}</div>
    </>
  );
};

export default RowGroup;
