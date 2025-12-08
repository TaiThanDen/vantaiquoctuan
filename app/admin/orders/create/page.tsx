"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { OrderClientService } from "@/services/order.client";
import { TruckClientService } from "@/services/trucks.client";
import AutocompleteInput from "@/app/components/GoongMap/AutocompleteInput";
import GoongMap from "@/app/components/GoongMap/GoongMap";

type ServiceType = { id: string; name: string };

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

const Label = ({
  children,
  required,
}: {
  children: any;
  required?: boolean;
}) => (
  <label className="mb-1 block text-sm font-medium text-neutral-700">
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
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

export default function CreateOrderPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [trucks, setTrucks] = useState<
    { id: string; name: string; license_plate?: string }[]
  >([]);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    service_type_id: "",
    truck_id: "",
    weight: "",
    weight_unit: "kg",
    from_location: "",
    to_location: "",
    duration: "",
    status: "pending",
  });

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const t = toast.loading("Đang tạo đơn hàng...");
    try {
      await OrderClientService.create({
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        service_type_id: formData.service_type_id || null,
        weight: formData.weight ? Number(formData.weight) : null,
        weight_unit: formData.weight_unit,
        from_location: formData.from_location,
        to_location: formData.to_location,
        status: formData.status,
      });
      toast.success("Tạo đơn hàng thành công!", { id: t });
      setTimeout(() => router.push("/admin/orders"), 800);
    } catch (err: any) {
      toast.error(err?.message || "Tạo đơn hàng thất bại!", { id: t });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold">Tạo đơn hàng mới</div>
            <div className="text-sm text-neutral-500">
              Nhập đầy đủ thông tin đơn hàng
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/admin/orders")}
              disabled={saving}
              className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-neutral-50 disabled:opacity-60"
            >
              Hủy
            </button>

            <button
              form="create-order-form"
              type="submit"
              disabled={saving}
              className="rounded-xl bg-[#ff4500] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e63e00] disabled:opacity-60"
            >
              {saving ? "Đang tạo..." : "Tạo đơn hàng"}
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6">
        <form
          id="create-order-form"
          onSubmit={handleSubmit}
          className="grid grid-cols-12 gap-6"
        >
          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <Card
              title="Thông tin khách hàng"
              subtitle="Thông tin người gửi/nhận và liên hệ"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label required>Tên khách hàng</Label>
                  <Input
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    placeholder="Nhập tên khách hàng"
                    required
                  />
                </div>
                <div>
                  <Label required>Số điện thoại</Label>
                  <Input
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={handleChange}
                    placeholder="VD: 0989xxxxxx"
                    required
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
                  <Label required>Đi từ</Label>
                  <AutocompleteInput
                    value={formData.from_location}
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, from_location: val }))
                    }
                    placeholder="VD: Quận 1, TP.HCM"
                  />
                </div>
                <div>
                  <Label required>Đến nơi</Label>
                  <AutocompleteInput
                    value={formData.to_location}
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, to_location: val }))
                    }
                    placeholder="VD: Dĩ An, Bình Dương"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Thời gian dự tính</Label>
                  <Input
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="VD: 2 giờ / 1 ngày / 2025-01-10 14:00"
                  />
                </div>
              </div>
            </Card>

            <Card
              title="Thông tin xe"
              subtitle="Chọn xe cho đơn hàng (tùy chọn)"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Chọn xe tải</Label>
                  <Select
                    name="truck_id"
                    value={formData.truck_id}
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
                    value={formData.service_type_id}
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
                    value={formData.status}
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
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="VD: 8"
                    type="number"
                  />
                </div>
                <div>
                  <Label>Đơn vị</Label>
                  <Input
                    name="weight_unit"
                    value={formData.weight_unit}
                    onChange={handleChange}
                    placeholder="VD: tấn / kg"
                  />
                </div>
              </div>
            </Card>
          </div>
        </form>

        {/* Map */}
        <div className="mt-10 w-full h-[700px] rounded-2xl border bg-white shadow-sm overflow-hidden">
          <GoongMap
            externalFrom={formData.from_location}
            externalTo={formData.to_location}
            className="w-full h-full "
          />
        </div>
      </div>
    </div>
  );
}
