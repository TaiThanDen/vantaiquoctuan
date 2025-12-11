"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ServiceTypesClient } from "@/services/serviceTypes.Client";
import toast, { Toaster } from "react-hot-toast";

export default function EditServiceTypePage() {
  const router = useRouter();
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    ServiceTypesClient.getById(id)
      .then((data) => setName(data.name || ""))
      .catch(() => toast.error("Không tìm thấy loại dịch vụ"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Tên loại dịch vụ không được để trống");
      return;
    }
    setSaving(true);
    try {
      await ServiceTypesClient.update(id, name.trim());
      toast.success("Cập nhật thành công!");
      router.push("/admin/service-types");
    } catch (error: any) {
      toast.error(error?.message || "Đã có lỗi xảy ra");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-lg mx-auto mt-10 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff4500] mx-auto mb-4" />
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded shadow">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-6">Chỉnh sửa loại dịch vụ</h1>
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
            disabled={saving}
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-[#ff4500] text-white px-5 py-2 rounded hover:bg-[#e63e00] transition"
            disabled={saving}
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded hover:bg-gray-300 transition"
            onClick={() => router.push("/admin/service-types")}
            disabled={saving}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
