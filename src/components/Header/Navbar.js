import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  const { url, name, className } = props;
  return (
    <NavLink
      to={url}
      className={`capitalize font-semibold hover:bg-white/10 active:bg-white/20 p-2 rounded-md ${
        className || ""
      }`}
    >
      {({ isActive }) => (
        <span className={`${isActive ? "text-white" : " text-white/50"}`}>
          {name}
        </span>
      )}
    </NavLink>
  );
};

const Navbar = () => {
  return (
    <header className="sticky top-0 w-full bg-gray-900 z-[9999]">
      <nav className="flex px-4 md:px-8 gap-1 md:gap-[1.25rem] h-[70px] items-center md:container-md">
        <NavItem name="Home" url="/" className="text" />
        <NavItem name="formation" url="/formation" className="text" />
      </nav>
    </header>
  );
};

export default Navbar;
