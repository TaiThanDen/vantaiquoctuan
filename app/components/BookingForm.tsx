import * as React from "react";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import AutocompleteInput from "../components/GoongMap/AutocompleteInput";
import { OrderClientService } from "@/services/order.client";
import toast, { Toaster } from "react-hot-toast";

export default function BookingForm({
  externalFrom = "",
  externalTo = "",
  onFromChange,
  onToChange,
  onFromSelect,
  onToSelect,
  className = "",
}: {
  externalFrom?: string;
  externalTo?: string;
  onFromChange?: (val: string) => void;
  onToChange?: (val: string) => void;
  onFromSelect?: (val: string) => void;
  onToSelect?: (val: string) => void;
  className?: string;
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceTypes, setServiceTypes] = useState<
    { id: string; name: string }[]
  >([]);

  React.useEffect(() => {
    if (externalFrom) setFrom(externalFrom);
  }, [externalFrom]);

  React.useEffect(() => {
    if (externalTo) setTo(externalTo);
  }, [externalTo]);

  React.useEffect(() => {
    fetch("/api/service-types")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServiceTypes(data);
        } else if (Array.isArray(data?.serviceTypes)) {
          setServiceTypes(data.serviceTypes);
        } else {
          setServiceTypes([]);
        }
      })
      .catch(() => setServiceTypes([]));
  }, []);

  const handleFromChange = (val: string) => {
    setFrom(val);
    if (onFromChange) onFromChange(val);
  };

  const handleToChange = (val: string) => {
    setTo(val);
    if (onToChange) onToChange(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await OrderClientService.create({
        customer_name: customerName,
        customer_phone: customerPhone,
        service_type_id: serviceType || null,
        weight: weight ? parseFloat(weight) : null,
        weight_unit: weightUnit,
        from_location: from,
        to_location: to,
        status: "pending",
      });

      toast.success("Đặt xe thành công! Chúng tôi sẽ liên hệ với bạn sớm.");

      // Reset form
      setCustomerName("");
      setCustomerPhone("");
      setServiceType("");
      setWeight("");
      setWeightUnit("kg");
      setFrom("");
      setTo("");
    } catch (error) {
      toast.error(
        `Có lỗi xảy ra: ${
          error instanceof Error ? error.message : "Vui lòng thử lại!"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "18px",
            padding: "16px 24px",
            minWidth: "300px",
          },
        }}
      />
      <form
        onSubmit={handleSubmit}
        className={`bg-white shadow-2xl rounded-3xl w-full max-w-xl px-6 md:px-10 py-8 flex flex-col justify-between ${className}`}
      >
        {/* TOP SECTION */}
        <div className="space-y-3 md:space-y-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-800">
            Lên lịch xe chỉ trong 1 phút
          </h2>
          <p className="text-gray-500 text-xs md:text-sm">
            Nhập thông tin chuyến hàng để được báo giá và điều xe nhanh chóng.
          </p>
          {/* <button className="w-full py-3 md:py-4 rounded-full bg-gray-900 text-white font-semibold text-sm md:text-base mb-1">
          Lên lịch vận chuyển
        </button> */}
        </div>

        {/* INPUT LIST */}
        <div className="space-y-3 md:space-y-4 border border-gray-200 p-4 md:p-5 rounded-3xl my-4 md:my-6">
          <input
            type="text"
            placeholder="Nhập Tên khách hàng"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="w-full px-4 md:px-5 py-3 md:py-4 rounded-full border border-gray-300 
          focus:ring-2 focus:ring-gray-300/60 outline-none text-sm md:text-base"
          />
          <input
            type="tel"
            placeholder="Nhập số điện thoại"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
            className="w-full px-4 md:px-5 py-3 md:py-4 rounded-full border border-gray-300 
          focus:ring-2 focus:ring-gray-300/60 outline-none text-sm md:text-base"
          />

          {/* Select dịch vụ */}
          <div className="relative">
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 md:px-5 py-3 md:py-4 rounded-full border border-gray-300 
            hover:border-gray-400 focus:ring-2 focus:ring-lime-300 focus:border-lime-400 outline-none text-sm md:text-base bg-white
            appearance-none transition shadow-sm pr-10 md:pr-12"
            >
              <option value="">Loại dịch vụ bạn cần</option>
              {serviceTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <RiArrowDropDownLine className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-xl md:text-2xl text-gray-400 pointer-events-none" />
          </div>

          {/* Trọng lượng đơn hàng  */}
          <div className="flex gap-2 md:gap-3">
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="Trọng lượng"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 px-4 md:px-5 py-3 md:py-4 rounded-full border border-gray-300 
            focus:ring-2 focus:ring-gray-300/60 outline-none text-sm md:text-base"
            />
            <div className="relative w-20 md:w-24 shrink-0">
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
                className="w-full px-3 md:px-4 py-3 md:py-4 rounded-full border border-gray-300 
              focus:ring-2 focus:ring-lime-300 focus:border-lime-400 outline-none text-sm md:text-base bg-white
              appearance-none transition shadow-sm pr-7 md:pr-8"
              >
                <option value="Kg">Kg</option>
                <option value="Tấn ">Tấn</option>
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 md:py-4 rounded-full bg-lime-200 hover:bg-lime-300 text-gray-900 font-semibold text-base md:text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Đang xử lý..." : "Đặt xe"}
        </button>
      </form>
    </>
  );
}
