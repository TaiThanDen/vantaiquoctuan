"use client";

import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FiClock } from "react-icons/fi";
import { LuTruck, LuPackageOpen } from "react-icons/lu";
import { TbArrowsRight } from "react-icons/tb";
import { MdOutlineAltRoute } from "react-icons/md";

interface TripCardProps {
  from: string;
  to: string;
  startDate: string;
  endDate: string;
  serviceType: string; // Nguyên chuyến / Ghép hàng
  truckType: string; // Tải 5 tấn / 10 tấn
  duration: string; // 48 giờ
  mode: string; // Trực tiếp
  details?: string[]; // Dòng chi tiết
}

export default function TripCard({
  from,
  to,
  startDate,
  endDate,
  serviceType,
  truckType,
  duration,
  mode,
  details = [],
}: TripCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
      {/* TOP ROW */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Left Block */}
        <div>
          <h2 className="text-2xl font-semibold mb-1">
            {from} → {to}
          </h2>

          <p className="text-gray-500 text-lg mb-3">
            Khởi hành: {startDate} – Dự dự kiến: {endDate}
          </p>

          {/* ICON INFO ROW */}
          <div className="flex items-center gap-6 flex-wrap text-lg text-gray-700">
            {/* Service Type */}
            <div className="flex items-center gap-1">
              <LuPackageOpen className="text-gray-600" size={18} />
              {serviceType}
            </div>

            {/* Truck */}
            <div className="flex items-center gap-1">
              <LuTruck className="text-gray-600" size={18} />
              {truckType}
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1">
              <FiClock className="text-gray-600" size={18} />
              {duration}
            </div>

            {/* Mode */}
            <div className="flex items-center gap-1">
              <TbArrowsRight className="text-gray-600" size={18} />
              {mode}
            </div>
          </div>
        </div>

        {/* RIGHT CTA BUTTON */}
        <div className="flex flex-col justify-between items-end mt-4 lg:mt-0">
          <button className="bg-[#ff4500] hover:bg-[#e53e00] text-white/90 font-semibold px-5 py-2 rounded-lg transition text-lg">
            Xem giá / Nhận báo giá
          </button>

          <button
            className="flex items-center text-md text-gray-700 mt-3 hover:text-black"
            onClick={() => setOpen(!open)}
          >
            Chi tiết
            {open ? (
              <IoChevronUp className="ml-1" />
            ) : (
              <IoChevronDown className="ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* DETAILS SECTION */}
      {open && (
        <div className="mt-4 border-t pt-3 text-gray-700 text-lg space-y-2 animate-fadeIn">
          {details.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <MdOutlineAltRoute size={18} className="mt-1 text-gray-600" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
