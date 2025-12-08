"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { OrderClientService } from "@/services/order.client";
import { TruckClientService } from "@/services/trucks.client";

type ServiceType = { id: string; name: string };

export default function EditOrderPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = (params?.slug as string) || "";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [trucks, setTrucks] = useState<
    { id: string; name: string; license_plate?: string }[]
  >([]);
  const canSave = useMemo(
    () => !saving && !!orderId && !!order,
    [saving, orderId, order]
  );

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await OrderClientService.getById(orderId);
        setOrder(data);
      } catch (err: any) {
        toast.error(err?.message || "Không thể tải đơn hàng");
      } finally {
        setLoading(false);
      }
    };
    if (orderId) fetchOrder();
  }, [orderId]);

  useEffect(() => {
    fetch("/api/service-types")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setServiceTypes(data);
        else if (Array.isArray(data?.serviceTypes))
          setServiceTypes(data.serviceTypes);
        else setServiceTypes([]);
      })
      .catch(() => setServiceTypes([]));
  }, []);

  useEffect(() => {
    TruckClientService.getAll(1, 100)
      .then((data) => setTrucks(data?.items || data || []))
      .catch(() => setTrucks([]));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "truck_id") {
      const selectedTruck = trucks.find((t) => t.id === value);
      setOrder((prev: any) => ({
        ...prev,
        truck_id: value,
        truck_license_plate: selectedTruck?.license_plate || "",
        truck_name: selectedTruck?.name || "",
      }));
    } else {
      setOrder((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setSaving(true);
    const t = toast.loading("Đang lưu thay đổi...");
    try {
      await OrderClientService.update(orderId, order);
      toast.success("Cập nhật đơn hàng thành công!", { id: t });
      setTimeout(() => router.push("/admin/orders"), 800);
    } catch (err: any) {
      toast.error(err?.message || "Cập nhật đơn hàng thất bại!", { id: t });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full px-4 md:px-6 py-10">
        <div className="flex items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#ff4500]" />
          <div>
            <div className="font-semibold">Đang tải đơn hàng</div>
            <div className="text-sm text-neutral-500">
              Vui lòng đợi một chút...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="w-full px-4 md:px-6 py-10">
        <div className="rounded-2xl border bg-white p-6">
          <div className="text-lg font-semibold text-red-600">
            Không tìm thấy đơn hàng
          </div>
          <div className="mt-2 text-sm text-neutral-600">
            Có thể đơn hàng không tồn tại hoặc bạn không có quyền truy cập.
          </div>
          <button
            className="mt-4 rounded-xl bg-black px-4 py-2 text-sm text-white"
            onClick={() => router.push("/admin/orders")}
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  const Input = (props: any) => (
    <input
      {...props}
      className={[
        "w-full rounded-xl border px-3 py-2 text-sm outline-none",
        "focus:ring-2 focus:ring-black/10 focus:border-black/30",
        props.disabled ? "bg-neutral-100 text-neutral-500" : "bg-white",
        props.className || "",
      ].join(" ")}
    />
  );

  const Select = (props: any) => (
    <select
      {...props}
      className={[
        "w-full rounded-xl border px-3 py-2 text-sm outline-none",
        "focus:ring-2 focus:ring-black/10 focus:border-black/30",
        props.disabled ? "bg-neutral-100 text-neutral-500" : "bg-white",
        props.className || "",
      ].join(" ")}
    />
  );

  const Label = ({ children }: { children: any }) => (
    <label className="mb-1 block text-sm font-medium text-neutral-700">
      {children}
    </label>
  );

  const Card = ({ title, subtitle, children }: any) => (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <div className="text-base font-semibold">{title}</div>
        {subtitle ? (
          <div className="mt-1 text-sm text-neutral-500">{subtitle}</div>
        ) : null}
      </div>
      {children}
    </div>
  );

  return (
    <div className="w-full">
      <Toaster position="top-center" />

      {/* Header sticky full width */}
      <div className="sticky top-0 z-20 border-b rounded-4xl bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold">Cập nhật đơn hàng</div>
            <div className="text-sm text-neutral-500">
              ID: <span className="font-mono">{order.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/admin/orders")}
              disabled={saving}
              className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-neutral-50 disabled:opacity-60"
            >
              Danh sách
            </button>

            <button
              form="edit-order-form"
              type="submit"
              disabled={!canSave}
              className="rounded-xl bg-[#ff4500] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e63e00] disabled:opacity-60"
            >
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </div>

      {/* Body full width but nicely constrained */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6">
        <form
          id="edit-order-form"
          onSubmit={handleSave}
          className="grid grid-cols-12 gap-6"
        >
          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <Card
              title="Thông tin khách hàng"
              subtitle="Thông tin người gửi/nhận và liên hệ"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Mã đơn hàng</Label>
                  <Input name="id" value={order.id || ""} disabled />
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <Input
                    name="customer_phone"
                    value={order.customer_phone || ""}
                    onChange={handleChange}
                    placeholder="VD: 0989xxxxxx"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Tên khách hàng</Label>
                  <Input
                    name="customer_name"
                    value={order.customer_name || ""}
                    onChange={handleChange}
                    placeholder="Nhập tên khách hàng"
                  />
                </div>
              </div>
            </Card>

            <Card
              title="Lộ trình vận chuyển"
              subtitle="Điểm lấy hàng và điểm giao hàng"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Đi từ</Label>
                  <Input
                    name="from_location"
                    value={order.from_location || ""}
                    onChange={handleChange}
                    placeholder="VD: Quận 1, TP.HCM"
                  />
                </div>
                <div>
                  <Label>Đến nơi</Label>
                  <Input
                    name="to_location"
                    value={order.to_location || ""}
                    onChange={handleChange}
                    placeholder="VD: Dĩ An, Bình Dương"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Thời gian dự tính (ETA)</Label>
                  <Input
                    name="eta"
                    value={order.eta || ""}
                    onChange={handleChange}
                    placeholder="VD: 2 giờ / 1 ngày / 2025-01-10 14:00"
                  />
                </div>
              </div>
            </Card>

            <Card title="Thông tin xe" subtitle="Chọn xe cho đơn hàng">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Chọn xe tải</Label>
                  <Select
                    name="truck_id"
                    value={order.truck_id || ""}
                    onChange={handleChange}
                  >
                    <option value="">Chọn xe</option>
                    {trucks.map((truck) => (
                      <option key={truck.id} value={truck.id}>
                        {truck.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label>Biển số</Label>
                  <Input
                    name="truck_license_plate"
                    value={order.truck_license_plate || ""}
                    disabled
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card
              title="Dịch vụ & trạng thái"
              subtitle="Cấu hình loại dịch vụ và tình trạng đơn"
            >
              <div className="space-y-4">
                <div>
                  <Label>Dịch vụ</Label>
                  <Select
                    name="service_type_id"
                    value={order.service_type_id || ""}
                    onChange={handleChange}
                  >
                    <option value="">Chọn dịch vụ</option>
                    {serviceTypes.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label>Trạng thái</Label>
                  <Select
                    name="status"
                    value={order.status || "pending"}
                    onChange={handleChange}
                  >
                    <option value="pending">Đang xử lý</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </Select>
                </div>
              </div>
            </Card>

            <Card title="Khối lượng" subtitle="Thông tin cân nặng hàng hóa">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label>Trọng lượng</Label>
                  <Input
                    name="weight"
                    value={order.weight || ""}
                    onChange={handleChange}
                    placeholder="VD: 8"
                  />
                </div>
                <div>
                  <Label>Đơn vị</Label>
                  <Input
                    name="weight_unit"
                    value={order.weight_unit || ""}
                    onChange={handleChange}
                    placeholder="VD: tấn / kg"
                  />
                </div>
              </div>
            </Card>

            {/* <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold">Hành động</div>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  type="submit"
                  form="edit-order-form"
                  disabled={!canSave}
                  className="w-full rounded-xl bg-[#ff4500] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e63e00] disabled:opacity-60"
                >
                  {saving ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => router.push("/admin/orders")}
                  className="w-full rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-neutral-50 disabled:opacity-60"
                >
                  Hủy / Quay lại
                </button>
              </div>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}
