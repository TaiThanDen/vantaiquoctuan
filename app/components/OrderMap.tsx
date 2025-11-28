"use client";

import { useState } from "react";
import GoongMap from "./GoongMap/GoongMap";
import BookingForm from "./BookingForm";

export default function OrderLayout() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isFromSelected, setIsFromSelected] = useState(false);
  const [isToSelected, setIsToSelected] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="w-full mx-auto px-2 md:px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-gray-900">
          Đặt lịch vận chuyển
        </h1>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* GoongMap - Full width trên mobile */}
          <div className="w-full lg:flex-1 order-2 lg:order-1 h-[500px] md:h-[600px] lg:min-h-[700px]">
            <GoongMap
              externalFrom={from}
              externalTo={to}
              externalIsFromSelected={isFromSelected}
              externalIsToSelected={isToSelected}
            />
          </div>

          {/* BookingForm bên phải */}
          <div className="w-full lg:flex-1 order-1 lg:order-2 flex items-start justify-center">
            <BookingForm
              externalFrom={from}
              externalTo={to}
              onFromChange={setFrom}
              onToChange={setTo}
              onFromSelect={(val: string) => {
                setFrom(val);
                setIsFromSelected(true);
              }}
              onToSelect={(val: string) => {
                setTo(val);
                setIsToSelected(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
