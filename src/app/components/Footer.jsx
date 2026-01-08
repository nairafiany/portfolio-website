import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between items-center mx-auto">
        <span>
          <Image
            src="/n_logo.svg"
            alt="N Logo"
            width={40}
            height={40}
            className="opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </span>
        <p className="text-slate-600">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
