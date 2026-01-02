import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links }) => {
  return (
    <ul className="md:hidden flex flex-col items-center gap-6 bg-black/90 backdrop-blur-md py-6">
      {links.map((link, index) => (
        <NavLink key={index} href={link.path} title={link.title} />
      ))}
    </ul>
  );
};

export default MenuOverlay;
