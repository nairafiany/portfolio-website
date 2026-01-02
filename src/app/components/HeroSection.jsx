"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const TypeAnimation = dynamic(
  () => import("react-type-animation").then((mod) => mod.TypeAnimation),
  { ssr: false }
);

const HeroSection = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Text Area (Tidak ada perubahan di sini) */}
        <div className="col-span-12 lg:col-span-7 text-center lg:text-left">
          <h1 className="mb-4 font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight">
            <span className="bg-gradient-to-r from-emerald-700 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Hello, I'm
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Naira",
                2000,
                "a Web Developer",
                2000,
                "a System Information Student",
                2000,
                "an AI Enthusiast",
                2000,
              ]}
              speed={60}
              repeat={Infinity}
              wrapper="span"
              className="text-white"
            />
          </h1>

          <p className="text-[#ADB7BE] text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto lg:mx-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          {/* Buttons (Tidak ada perubahan di sini) */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              className="relative px-8 py-3 rounded-full font-semibold text-white
                          bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400
                          shadow-[0_0_20px_rgba(16,185,129,0.6)]
                          hover:shadow-[0_0_30px_rgba(16,185,129,0.9)]
                          hover:scale-105
                          transition-all duration-300"
            >
              Hire Me
            </button>

            <button
              className="relative px-8 py-3 rounded-full font-semibold
                          text-[#ADB7BE] bg-black
                          border border-transparent bg-origin-border bg-clip-padding
                          before:absolute before:inset-0 before:rounded-full
                          before:bg-gradient-to-r before:from-emerald-500 before:to-teal-400
                          before:-z-10
                          hover:text-white hover:scale-105
                          transition-all duration-300"
            >
              Download CV
            </button>
          </div>
        </div>

        {/* ============================================== */}
        {/* BAGIAN YANG DIUBAH: Image Area Jadi Lebih Hidup */}
        {/* ============================================== */}
        {/* Tambahkan 'relative' dan 'group' pada wrapper utamanya */}
        <div className="col-span-12 lg:col-span-5 hidden lg:flex justify-center relative group">
          {/* 1. ELEMEN BARU: Background Glow/Aura */}
          {/* Div ini ditaruh di belakang (-z-10), dikasih warna gradien, blur tinggi, dan animasi pulse */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[280px] h-[380px] sm:w-[300px] sm:h-[400px] lg:w-[340px] lg:h-[440px] /* Sedikit lebih besar dari wadah foto */
                       bg-gradient-to-tr from-emerald-600/40 via-teal-500/40 to-green-400/30
                       rounded-[4rem] blur-[50px] -z-10
                       animate-pulse /* Ini yang bikin efek berdenyut/bernapas */
                       transition-all duration-500 group-hover:blur-[70px] group-hover:opacity-100 opacity-80"
          ></div>

          {/* 2. Wadah Foto Utama (Diupdate) */}
          <div
            className="relative rounded-[3rem] /* Ubah bentuk jadi squircle modern */
                       bg-[#181818]
                       w-[260px] h-[360px]
                       sm:w-[280px] sm:h-[380px]
                       lg:w-[300px] lg:h-[400px]
                       overflow-hidden /* Penting: agar gambar tidak keluar dari border rounded */
                       border-2 border-white/10 /* Border tipis transparan */
                       shadow-xl shadow-emerald-500/20 /* Tambah shadow sedikit */
                       transition-all duration-500 ease-in-out
                       group-hover:-translate-y-4 /* Efek melayang naik saat di-hover */
                       group-hover:shadow-2xl group-hover:shadow-emerald-500/40 group-hover:border-emerald-500/50"
          >
            <Image
              src="/images/naira_pic.jpeg"
              alt="Naira profile picture"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              // Tambahkan transition dan scale pada hover di gambarnya
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              priority
            />
          </div>
        </div>
        {/* ============================================== */}
      </div>
    </section>
  );
};

export default HeroSection;
