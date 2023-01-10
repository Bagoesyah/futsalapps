import React from "react";

const Container = ({ children }) => {
  return (
    <>
      <div className="container-sm md:container-md">{children}</div>
    </>
  );
};

export default Container;
