import React from "react";
import Navbar from "./Header/Navbar";
import Footer from "./Footer";

const Layouts = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full h-full mt-[1rem]">{children}</div>
      <Footer />
    </>
  );
};

export default Layouts;
