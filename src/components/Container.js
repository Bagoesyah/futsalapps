import React from "react";

const Container = ({ children }) => {
  return (
    <>
      <div className="container-sm md:container-md flex justify-center">
        {children}
      </div>
    </>
  );
};

export default Container;
