"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navlinks = [
  { title: "About", path: "#about" },
  { title: "Projects", path: "#projects" },
  { title: "Contact", path: "#contact" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/n_logo.svg"
            alt="N Logo"
            width={45}
            height={45}
            priority
            className="hover:scale-110 transition-transform duration-300"
          />
        </Link>

        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="md:hidden p-1.5 text-white rounded-md hover:bg-white/10 transition"
          aria-label="Toggle menu"
        >
          {navbarOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>

        <ul className="hidden md:flex items-center gap-6 text-sm">
          {navlinks.map((link, index) => (
            <NavLink key={index} href={link.path} title={link.title} />
          ))}
        </ul>
      </div>

      {navbarOpen && <MenuOverlay links={navlinks} />}
    </nav>
  );
};

export default Navbar;
