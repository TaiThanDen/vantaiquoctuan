"use client";
import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

export default function ContactFloatingButton() {
  const [showHotline, setShowHotline] = useState(false);
  const [showZalo, setShowZalo] = useState(false);

  return (
    <div className="fixed right-4 bottom-8 z-50 flex flex-col items-center gap-3">
      {/* Hotline */}
      <div
        className="group relative"
        onMouseEnter={() => setShowHotline(true)}
        onMouseLeave={() => setShowHotline(false)}
      >
        <button className="bg-gray-900 hover:bg-lime-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition">
          <FaPhoneAlt size={24} />
        </button>
        {showHotline && (
          <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg text-sm font-semibold whitespace-nowrap">
            Hotline: 0944423139
          </div>
        )}
      </div>
      {/* Zalo */}
      <div className="group relative">
        <button
          className="bg-gray-900 hover:bg-blue-400 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition"
          onClick={() => setShowZalo((v) => !v)}
        >
          <SiZalo size={24} />
        </button>
        {showZalo && (
          <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg text-sm font-semibold whitespace-nowrap">
            Zalo: 0944423139
          </div>
        )}
      </div>
    </div>
  );
}
