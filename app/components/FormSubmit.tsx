"use client";

import bg from "@/public/assets/formsubmit1.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";
import AutocompleteInput from "../components/GoongMap/AutocompleteInput";
import GoongMap from "./GoongMap/GoongMap";
import BookingForm from "./BookingForm";

export default function FormSubmit() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* HERO SECTION */}
      <div
        className="min-h-[60vh] md:h-[80vh] flex flex-col md:flex-row items-stretch justify-between relative bg-cover bg-center rounded-3xl overflow-hidden"
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      >
        {/* LEFT TEXT */}
        <div className="flex-1 md:basis-2/3 text-white px-6 py-10 md:pl-10 flex flex-col justify-center">
          <h1 className="text-2xl md:text-5xl font-bold leading-tight drop-shadow-xl max-w-2xl">
            Liên hệ ngay
          </h1>
          <p className="mt-4 text-base md:text-xl text-white font-semibold max-w-lg drop-shadow leading-relaxed space-y-1">
            <span className="block">Hotline: 0944423139</span>
            <span className="block">Zalo hỗ trợ: 0944423139</span>
            <span className="block">Email: tai25062006z@gmail.com</span>
            <span className="block">
              Địa chỉ: 285/66/8 tổ 4 khu phố 8, TCH 10, P.Tân Chánh Hiệp, Q.12,
              TP.HCM
            </span>
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="flex-1 md:basis-1/3 flex items-center justify-center px-4 py-8 md:pr-12">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
