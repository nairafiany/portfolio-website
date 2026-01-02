import React from "react";
import Link from "next/link";

const NavLink = ({ href, title }) => {
  return (
    <li className="nav-item">
      <Link
        href={href}
        className="block py-2 text-[#ADB7BE] text-lg hover:text-white transition"
      >
        {title}
      </Link>
    </li>
  );
};

export default NavLink;
