"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ServiceTypesClient } from "@/services/serviceTypes.Client";
import toast, { Toaster } from "react-hot-toast";

export default function CreateServiceTypePage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Tên loại dịch vụ không được để trống");
      return;
    }
    setLoading(true);
    try {
      await ServiceTypesClient.create(name.trim());
      toast.success("Tạo loại dịch vụ thành công!");
      router.push("/admin/service-types");
    } catch (error: any) {
      toast.error(error?.message || "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded shadow">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-6">Thêm loại dịch vụ mới</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">
            Tên loại dịch vụ
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#ff4500]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên loại dịch vụ"
            disabled={loading}
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-[#ff4500] text-white px-5 py-2 rounded hover:bg-[#e63e00] transition"
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded hover:bg-gray-300 transition"
            onClick={() => router.push("/admin/service-types")}
            disabled={loading}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
