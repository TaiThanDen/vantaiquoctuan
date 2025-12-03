"use client";
import OrderMap from "../components/OrderMap";
import OrderCard from "../components/OrderCard";
import MiniHeroBanner from "../components/MiniHeroBanner";
import { useOrders } from "../hooks/orders";

export default function OrderPage() {
  const { orders, loading, error } = useOrders();

  return (
    <div className="pt-3">
      <MiniHeroBanner
        backgroundImage="https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?cs=srgb&dl=pexels-500photos-com-15338-93398.jpg&fm=jpg"
        title="Lịch đặt xe"
        description="Theo dõi tất cả các đơn hàng vận chuyển của bạn"
        buttonText="Đặt xe ngay"
        buttonHref="/order#booking"
      />
      <div>
        <h1 className="text-2xl md:text-4xl font-bold md:my-5 pt-5 my-5 text-center text-[#ff4500]">
          Đặt lịch vận chuyển
        </h1>
        <OrderMap />
      </div>
      <div className="max-w-7xl mx-auto mt-10 px-4 pb-10">
        <h1 className="text-center text-4xl my-20 font-bold text-[#ff4500] ">
          {" "}
          Xem lịch vận chuyển{" "}
        </h1>
        {loading && (
          <p className="text-center text-2xl text-gray-500">
            Đang tải đơn hàng...
          </p>
        )}
        {error && (
          <p className="text-center text-2xl text-red-500">
            Lỗi khi tải đơn hàng: {error}
          </p>
        )}
        {!loading && orders.length === 0 && (
          <p className="text-center text-2xl text-gray-500">
            Chưa có đơn hàng nào.
          </p>
        )}
        {!loading &&
          !error &&
          orders.length > 0 &&
          orders.map((order) => (
            <OrderCard
              key={order.id}
              orderId={String(order.id)}
              from={String(order.from_location || "")}
              to={String(order.to_location || "")}
              serviceType={String(order.service_type_name || "Chưa xác định")}
              truckType={
                order.truck_type_name
                  ? String(order.truck_type_name)
                  : undefined
              }
              duration={order.duration ? String(order.duration) : undefined}
              weight={order.weight ? Number(order.weight) : undefined}
              weightUnit={
                order.weight_unit ? String(order.weight_unit) : undefined
              }
              truckName={order.truck_name}
              truckModel={order.truck_model}
              truckLoad={order.truck_load}
              truckLoadUnit={order.truck_load_unit}
              truckLicensePlate={order.truck_license_plate}
            />
          ))}
      </div>
    </div>
  );
}
