"use client";

import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FiClock } from "react-icons/fi";
import { LuTruck, LuPackageOpen } from "react-icons/lu";
import { TbArrowsRight } from "react-icons/tb";
import { MdOutlineAltRoute } from "react-icons/md";

interface TripCardProps {
  orderId?: string;
  from: string;
  to: string;
  serviceType: string;
  truckType?: string;
  duration?: string;
  weight?: number;
  weightUnit?: string;
  customerName?: string;
  customerPhone?: string;
  status?: string;
}

// Helper function to truncate address
const truncateAddress = (address: string, maxLength: number = 50) => {
  if (address.length <= maxLength) return address;
  return address.substring(0, maxLength) + "...";
};

export default function TripCard({
  orderId,
  from,
  to,
  serviceType,
  truckType,
  duration,
  weight,
  weightUnit,
}: TripCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
      {/* TOP ROW */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Left Block */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-1 group relative">
            <span className="cursor-help inline-block" title={from}>
              {truncateAddress(from)}
            </span>
            <span className="mx-2">→</span>
            <span className="cursor-help inline-block" title={to}>
              {truncateAddress(to)}
            </span>
          </h2>

          <p className="text-gray-500 text-lg mb-3">
            Trọng lượng: {weight ? ` ${weight} ${weightUnit}` : " N/A"}
          </p>

          {/* ICON INFO ROW */}
          <div className="flex items-center gap-6 flex-wrap text-lg text-gray-700">
            {/* Service Type */}
            {serviceType && (
              <div className="flex items-center gap-1">
                <LuPackageOpen className="text-gray-600" size={18} />
                {serviceType}
              </div>
            )}

            {/* Truck */}
            {truckType && (
              <div className="flex items-center gap-1">
                <LuTruck className="text-gray-600" size={18} />
                {truckType}
              </div>
            )}

            {/* Duration */}
            {duration && (
              <div className="flex items-center gap-1">
                <FiClock className="text-gray-600" size={18} />
                {duration}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT CTA BUTTON */}
        <div className="flex flex-col justify-between items-end mt-4 lg:mt-0">
          <button className="bg-[#ff4500] hover:bg-[#e53e00] text-white/90 font-semibold px-5 py-2 rounded-lg transition text-lg">
            Xem giá / Nhận báo giá
          </button>
        </div>
      </div>
    </div>
  );
}
