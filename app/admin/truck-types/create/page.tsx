"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function CreateTruckTypePage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Tên loại xe không được để trống");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Đang tạo loại xe...");
    try {
      const res = await fetch("/api/truck-types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        throw new Error((await res.json()).error || "Lỗi tạo loại xe");
      }
      toast.dismiss(toastId);
      toast.success("Tạo loại xe thành công!");
      router.push("/admin/truck-types");
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err.message || "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Thêm loại xe mới
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tên loại xe
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ff4500]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên loại xe..."
            disabled={loading}
            required
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-5 py-2 bg-[#ff4500] text-white rounded hover:bg-[#e63e00] font-medium"
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
          <button
            type="button"
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium"
            disabled={loading}
            onClick={() => router.push("/admin/truck-types")}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
