import React from "react";
import Navbar from "./Header/Navbar";

const Layouts = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full h-full mt-[1rem]">{children}</div>
    </>
  );
};

export default Layouts;
