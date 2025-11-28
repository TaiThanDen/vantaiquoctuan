import * as React from "react";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import AutocompleteInput from "../components/GoongMap/AutocompleteInput";

export default function BookingForm({
  externalFrom = "",
  externalTo = "",
  onFromChange,
  onToChange,
  onFromSelect,
  onToSelect,
}: {
  externalFrom?: string;
  externalTo?: string;
  onFromChange?: (val: string) => void;
  onToChange?: (val: string) => void;
  onFromSelect?: (val: string) => void;
  onToSelect?: (val: string) => void;
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  React.useEffect(() => {
    if (externalFrom) setFrom(externalFrom);
  }, [externalFrom]);

  React.useEffect(() => {
    if (externalTo) setTo(externalTo);
  }, [externalTo]);

  const handleFromChange = (val: string) => {
    setFrom(val);
    if (onFromChange) onFromChange(val);
  };

  const handleToChange = (val: string) => {
    setTo(val);
    if (onToChange) onToChange(val);
  };

  return (
    <div className="bg-white shadow-2xl rounded-3xl w-full max-w-xl px-6 md:px-10 py-8 md:py-12 flex flex-col justify-between">
      {/* TOP SECTION */}
      <div className="space-y-3 md:space-y-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-800">
          Lên lịch xe chỉ trong 1 phút
        </h2>
        <p className="text-gray-500 text-xs md:text-sm">
          Nhập thông tin chuyến hàng để được báo giá và điều xe nhanh chóng.
        </p>
        <button className="w-full py-3 md:py-4 rounded-full bg-gray-900 text-white font-semibold text-sm md:text-base mb-1">
          Lên lịch vận chuyển
        </button>
      </div>

      {/* INPUT LIST */}
      <div className="space-y-3 md:space-y-4 border border-gray-200 p-4 md:p-5 rounded-3xl my-4 md:my-6">
        <input
          type="text"
          placeholder="Nhập Tên khách hàng"
          className="w-full px-4 md:px-5 py-3 md:py-4 rounded-full border border-gray-300 
          focus:ring-2 focus:ring-gray-300/60 outline-none text-sm md:text-base"
        />
        <input
          type="number"
          placeholder="Nhập số điện thoại"
          className="w-full px-4 md:px-5 py-3 md:py-4 rounded-full border border-gray-300 
          focus:ring-2 focus:ring-gray-300/60 outline-none text-sm md:text-base"
        />
        
        {/* Select dịch vụ */}
        <div className="relative">
          <select
            className="w-full px-4 md:px-5 py-3 md:py-4 rounded-full border border-gray-300 
            hover:border-gray-400 focus:ring-2 focus:ring-lime-300 focus:border-lime-400 outline-none text-sm md:text-base bg-white
            appearance-none transition shadow-sm pr-10 md:pr-12"
            defaultValue=""
          >
            <option value="" disabled>
              Loại dịch vụ bạn cần
            </option>
            <option value="chuyennha">Chuyển nhà</option>
            <option value="chuyenvanphong">Chuyển văn phòng</option>
            <option value="chuyenkho">Chuyển kho xưởng</option>
            <option value="khac">Khác</option>
          </select>
          <RiArrowDropDownLine className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-xl md:text-2xl text-gray-400 pointer-events-none" />
        </div>

        {/* Trọng lượng đơn hàng + đơn vị - Cải thiện responsive */}
        <div className="flex gap-2 md:gap-3">
          <input
            type="number"
            min="0"
            placeholder="Trọng lượng"
            className="flex-1 px-4 md:px-5 py-3 md:py-4 rounded-full border border-gray-300 
            focus:ring-2 focus:ring-gray-300/60 outline-none text-sm md:text-base"
          />
          <div className="relative w-20 md:w-24 flex-shrink-0">
            <select
              className="w-full px-3 md:px-4 py-3 md:py-4 rounded-full border border-gray-300 
              focus:ring-2 focus:ring-lime-300 focus:border-lime-400 outline-none text-sm md:text-base bg-white
              appearance-none transition shadow-sm pr-7 md:pr-8"
              defaultValue="kg"
            >
              <option value="kg">Kg</option>
              <option value="tan">Tấn</option>
            </select>
            <RiArrowDropDownLine className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 text-lg md:text-xl text-gray-400 pointer-events-none" />
          </div>
        </div>

        <AutocompleteInput
          value={from}
          onChange={handleFromChange}
          onSelect={onFromSelect}
          placeholder="Vận chuyển từ"
        />
        <AutocompleteInput
          value={to}
          onChange={handleToChange}
          onSelect={onToSelect}
          placeholder="Vận chuyển đến"
        />
      </div>

      {/* BUTTON */}
      <button className="w-full py-3 md:py-4 rounded-full bg-lime-200 hover:bg-lime-300 text-gray-900 font-semibold text-base md:text-lg transition">
        Đặt xe
      </button>
    </div>
  );
}
