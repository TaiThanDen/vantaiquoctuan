"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTruck } from "@/app/hooks/trucks/getTruckBySlug";
import Editor from "@/app/admin/Editor";
import toast, { Toaster } from "react-hot-toast";

interface TruckType {
  id: string;
  name: string;
}

interface ServiceType {
  id: string;
  name: string;
}

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export default function EditTruckPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const { truck, loading: loadingTruck, error: truckError } = useTruck(slug);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [truckTypes, setTruckTypes] = useState<TruckType[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    models: "",
    brand: "",
    load: "",
    load_unit: "kg",
    description: null as any,
    license_plate: "",
    year: "",
    color: "",
    owner_name: "",
    owner_phone: "",
    status: "available",
    registration_expiry: "",
    truck_type_ids: [] as string[],
    service_type_ids: [] as string[],
    image_urls: [] as string[],
  });

  useEffect(() => {
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
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (truck) {
      setFormData({
        name: truck.name || "",
        models: truck.models || "",
        brand: truck.brand || "",
        load: truck.load?.toString() || "",
        load_unit: truck.load_unit || "kg",
        description: truck.description || null,
        license_plate: truck.license_plate || "",
        year: truck.year?.toString() || "",
        color: truck.color || "",
        owner_name: truck.owner_name || "",
        owner_phone: truck.owner_phone || "",
        status: truck.status || "available",
        registration_expiry: truck.registration_expiry || "",
        truck_type_ids: truck.truck_types?.map((t: any) => t.id) || [],
        service_type_ids: truck.service_types?.map((s: any) => s.id) || [],
        image_urls: truck.images?.map((img: any) => img.url) || [],
      });
    }
  }, [truck]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!truck) {
        throw new Error("Truck not found");
      }

      const submitData = {
        ...formData,
        load: parseFloat(formData.load),
        year: formData.year ? parseInt(formData.year) : undefined,
        image_urls: formData.image_urls.filter((url) => url.trim() !== ""),
        description: formData.description || {},
      };

      const response = await fetch(`/api/trucks/${truck.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update truck");
      }

      toast.success("Cập nhật xe thành công!");
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

  const removeImageUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error("Định dạng ảnh không hợp lệ!");
        continue;
      }
      if (file.size > MAX_SIZE) {
        toast.error("Ảnh vượt quá 5MB!");
        continue;
      }

      try {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formDataUpload,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Upload failed");
        }

        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          image_urls: [...prev.image_urls, data.url],
        }));
        toast.success("Upload ảnh thành công!");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Upload ảnh thất bại"
        );
      }
    }

    setUploading(false);
  };

  const handleDropImage = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (uploading) return;
    const files = e.dataTransfer.files;
    if (!files) return;

    const input = document.createElement("input");
    input.type = "file";
    input.files = files;
    await handleImageUpload({ target: input } as any);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  if (loadingTruck) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff4500]"></div>
      </div>
    );
  }

  if (truckError || !truck) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {truckError || "Không tìm thấy xe"}
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <Toaster position="top-center" />
      <div className="container mx-auto w-full px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Cập nhật xe</h1>
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
                    step="0.1"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                    placeholder="1.5"
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
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent"
                >
                  <option value="available">Sẵn sàng</option>
                  <option value="in_use">Đang sử dụng</option>
                  <option value="maintenance">Bảo trì</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <Editor
                value={formData.description}
                onChange={(json: any) => {
                  setFormData((prev) => ({ ...prev, description: json }));
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
            <div className="space-y-4">
              {/* Preview các ảnh đã có */}
              {formData.image_urls.filter(Boolean).map((url, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded border border-gray-300"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 truncate">{url}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImageUrl(index)}
                    className="px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                  >
                    Xóa
                  </button>
                </div>
              ))}

              {/* Upload zone */}
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onDrop={handleDropImage}
                  onDragOver={handleDragOver}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 mb-4 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-600">
                      <span className="font-semibold">Click để upload</span>{" "}
                      hoặc kéo thả ảnh
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WEBP (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>

              {uploading && (
                <div className="flex items-center gap-2 text-sm text-[#ff4500]">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Đang upload ảnh...</span>
                </div>
              )}
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
              disabled={loading || uploading}
              className="px-6 py-3 bg-[#ff4500] text-white rounded-lg hover:bg-[#e63e00] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Đang cập nhật..." : "Cập nhật xe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
