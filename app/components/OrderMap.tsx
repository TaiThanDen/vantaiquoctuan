"use client";

import { useState } from "react";
import GoongMap from "./GoongMap/GoongMap";
import BookingForm from "./BookingForm";

export default function OrderMap() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isFromSelected, setIsFromSelected] = useState(false);
  const [isToSelected, setIsToSelected] = useState(false);

  return (
    <div
      id="booking"
      className=" bg-gray-50 py-4 md:py-8 flex items-center justify-center"
    >
      <div className="w-full max-w-[1600px] mx-auto px-2 md:px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch justify-center">
          <div className="w-full lg:flex-3 order-2 lg:order-1 h-[500px] md:h-[600px] lg:min-h-[700px]">
            <GoongMap
              externalFrom={from}
              externalTo={to}
              externalIsFromSelected={isFromSelected}
              externalIsToSelected={isToSelected}
            />
          </div>
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
