"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Editor from "../../Editor";
import toast, { Toaster } from "react-hot-toast";

interface TruckType {
  id: string;
  name: string;
}

interface ServiceType {
  id: string;
  name: string;
}

export default function CreateTruckPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [truckTypes, setTruckTypes] = useState<TruckType[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    models: "",
    brand: "",
    load: "",
    load_unit: "kg",
    description: null,
    license_plate: "",
    year: "",
    color: "",
    owner_name: "",
    owner_phone: "",
    status: "available",
    registration_expiry: "",
    truck_type_ids: [] as string[],
    service_type_ids: [] as string[],
    image_urls: [""],
  });

  useEffect(() => {
    // Lấy danh sách truck types và service types
    const fetchData = async () => {
      try {
        const [truckTypesRes, serviceTypesRes] = await Promise.all([
          fetch("/api/truck-types"),
          fetch("/api/service-types"),
        ]);

        if (truckTypesRes.ok) {
          const data = await truckTypesRes.json();
          setTruckTypes(data);
        }

        if (serviceTypesRes.ok) {
          const data = await serviceTypesRes.json();
          setServiceTypes(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        load: parseFloat(formData.load),
        year: formData.year ? parseInt(formData.year) : undefined,
        image_urls: formData.image_urls.filter((url) => url.trim() !== ""),
        description: formData.description ? formData.description : {},
      };

      const response = await fetch("/api/trucks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create truck");
      }

      toast.success("Tạo xe thành công!");
      router.push("/admin/trucks");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    type: "truck_type" | "service_type",
    id: string
  ) => {
    const field = type === "truck_type" ? "truck_type_ids" : "service_type_ids";
    setFormData((prev) => {
      const current = prev[field];
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      return { ...prev, [field]: updated };
    });
  };

  const addImageUrl = () => {
    setFormData((prev) => ({
      ...prev,
      image_urls: [...prev.image_urls, ""],
    }));
  };

  const removeImageUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index),
    }));
  };

  const updateImageUrl = (index: number, value: string) => {
    setFormData((prev) => {
      const newUrls = [...prev.image_urls];
      newUrls[index] = value;
      return { ...prev, image_urls: newUrls };
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="container mx-auto w-full px-4">
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-3xl font-bold text-gray-800">Tạo xe mới</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-[#ff4500]"
          >
            ← Quay lại
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          {/* Thông tin cơ bản */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Thông tin cơ bản
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên xe <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                  placeholder="Xe bán tải"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="models"
                  value={formData.models}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                  placeholder="Ranger / Triton / Hilux"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hãng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                  placeholder="Ford / Mitsubishi / Toyota"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tải trọng <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="load"
                    value={formData.load}
                    onChange={handleInputChange}
                    required
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                    placeholder="1000"
                  />
                  <select
                    name="load_unit"
                    value={formData.load_unit}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                  >
                    <option value="kg">kg</option>
                    <option value="tấn">tấn</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biển số xe
                </label>
                <input
                  type="text"
                  name="license_plate"
                  value={formData.license_plate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                  placeholder="51A-12345"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Năm sản xuất
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                  placeholder="2023"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Màu sắc
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                  placeholder="Trắng"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                >
                  <option value="available">Sẵn sàng</option>
                  <option value="in_use">Đang sử dụng</option>
                  <option value="maintenance">Bảo trì</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hạn đăng kiểm
                </label>
                <input
                  type="date"
                  name="registration_expiry"
                  value={formData.registration_expiry}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <Editor
                value={formData.description}
                onChange={(json: any) => {
                  console.log("EDITOR JSON:", json);
                  setFormData((f) => ({ ...f, description: json }));
                }}
              />
            </div>
          </div>

          {/* Thông tin chủ xe */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Thông tin chủ xe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên chủ xe
                </label>
                <input
                  type="text"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="owner_phone"
                  value={formData.owner_phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                  placeholder="0901234567"
                />
              </div>
            </div>
          </div>

          {/* Loại xe */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Loại xe
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {truckTypes.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={formData.truck_type_ids.includes(type.id)}
                    onChange={() => handleCheckboxChange("truck_type", type.id)}
                    className="w-4 h-4 text-[#ff4500] focus:ring-[#ff4500]"
                  />
                  <span className="text-sm">{type.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Loại dịch vụ */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Loại dịch vụ
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {serviceTypes.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={formData.service_type_ids.includes(type.id)}
                    onChange={() =>
                      handleCheckboxChange("service_type", type.id)
                    }
                    className="w-4 h-4 text-[#ff4500] focus:ring-[#ff4500]"
                  />
                  <span className="text-sm">{type.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Hình ảnh */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Hình ảnh
            </h2>
            <div className="space-y-3">
              {formData.image_urls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => updateImageUrl(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.image_urls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageUrl(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageUrl}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                + Thêm ảnh
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#ff4500] text-white rounded-lg hover:bg-[#e63e00] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Đang tạo..." : "Tạo xe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
