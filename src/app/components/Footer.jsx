import React from "react";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between items-center mx-auto">
        {/* KIRI: Logo */}
        <span className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
          LOGO
        </span>

        {/* KANAN: Copyright */}
        <p className="text-slate-600">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
