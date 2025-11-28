"use client";
import OrderMap from "../components/OrderMap";
import OrderCard from "../components/OrderCard";

export default function OrderPage() {
  return (
    <div className="pt-25 lg:pt-0 ">
      <OrderMap />
      <div className="max-w-7xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#ff4500]">
          Lịch đặt xe
        </h1>
        <OrderCard
          from="Hồ Chí Minh"
          to="Hà Nội"
          startDate="25/12/2023"
          endDate="27/12/2023"
          serviceType="Nguyên chuyến"
          truckType="Tải 5 tấn"
          duration="48 giờ"
          mode="Trực tiếp"
          details={[
            "Điểm lấy hàng: Bình Thạnh, HCM – 08:30",
            "Rời kho: Thủ Đức – 09:10",
            "Dự kiến đến Hà Nội – 27/12/2023",
          ]}
        />

        <OrderCard
          from="Đà Nẵng"
          to="Hải Phòng"
          startDate="28/12/2023"
          endDate="29/12/2023"
          serviceType="Ghép hàng"
          truckType="Tải 10 tấn"
          duration="24 giờ"
          mode="Trực tiếp"
        />
      </div>
    </div>
  );
}
