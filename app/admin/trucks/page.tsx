"use client";

import { useState } from "react";
import { useTrucks } from "@/app/hooks/trucks/getTrucks";
import { useDeleteTruck } from "@/app/hooks/trucks/DeleteTruckByID";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import ConfirmDialog from "@/app/components/ConfirmDialog";

export default function AdminTrucksPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { trucks, loading, error, refetch } = useTrucks(page, limit);
  const { deleteTruck, loading: deleting } = useDeleteTruck();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingTruck, setPendingTruck] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleDeleteClick = (id: string, name: string) => {
    setPendingTruck({ id, name });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingTruck) return;
    setConfirmOpen(false);
    const toastId = toast.loading("Đang xóa xe...");
    try {
      const success = await deleteTruck(pendingTruck.id);
      if (success) {
        toast.success("Xóa xe thành công!", { id: toastId });
        refetch();
      } else {
        toast.error("Xóa xe thất bại!", { id: toastId });
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra!", { id: toastId });
    }
    setPendingTruck(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff4500]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  // Pagination controls
  return (
    <div>
      <Toaster position="top-center" />
      <ConfirmDialog
        open={confirmOpen}
        title="Xác nhận xóa xe"
        message={`Bạn có chắc chắn muốn xóa xe "${pendingTruck?.name}"?`}
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingTruck(null);
        }}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý xe</h1>
        <Link
          href="/admin/trucks/create"
          className="px-4 py-2 bg-[#ff4500] text-white rounded-lg hover:bg-[#e63e00]"
        >
          + Tạo xe mới
        </Link>
      </div>

      {/* Header với search */}
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800"></h3>
        </div>
        <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <input
              className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-gray-400 text-gray-700 text-sm border border-gray-200 rounded transition duration-200 ease focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md"
              placeholder="Tìm kiếm xe..."
            />
            <button
              className="absolute h-8 w-8 right-1 top-1 flex items-center justify-center bg-white rounded"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bảng danh sách xe */}
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-gray-200 bg-gray-50">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Hình ảnh
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Tên xe
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Model
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Hãng
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Tải trọng
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Biển số
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Trạng thái
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Hành động
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {trucks.map((truck) => {
              const firstImage =
                truck.images && truck.images.length > 0
                  ? truck.images[0].url
                  : "/assets/truck-placeholder.jpg";
              return (
                <tr
                  key={truck.id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="p-4 py-5">
                    <img
                      src={firstImage}
                      alt={truck.name}
                      className="object-cover rounded w-20 h-14 bg-gray-100"
                    />
                  </td>
                  <td className="p-4 py-5 font-semibold text-sm text-gray-800">
                    {truck.name}
                  </td>
                  <td className="p-4 py-5 text-sm text-gray-500">
                    {truck.models}
                  </td>
                  <td className="p-4 py-5 text-sm text-gray-500">
                    {truck.brand}
                  </td>
                  <td className="p-4 py-5 text-sm text-gray-500">
                    {truck.load} {truck.load_unit}
                  </td>
                  <td className="p-4 py-5 text-sm text-gray-500">
                    {truck.license_plate || "-"}
                  </td>
                  <td className="p-4 py-5">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        truck.status === "active"
                          ? "bg-green-100 text-green-800"
                          : truck.status === "in_use"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {truck.status === "active"
                        ? "Sẵn sàng"
                        : truck.status === "in_use"
                        ? "Đang dùng"
                        : "Bảo trì"}
                    </span>
                  </td>
                  <td className="p-4 py-5 text-sm font-medium">
                    <Link
                      href={`/cars/${truck.id}`}
                      className="text-[#ff4500] hover:text-[#e63e00] mr-3"
                    >
                      Xem
                    </Link>
                    <Link
                      href={`/admin/trucks/${truck.id}/edit`}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(truck.id, truck.name)}
                      disabled={deleting}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-sm text-gray-500">
            Hiển thị{" "}
            <b>
              {(page - 1) * limit + 1}-{(page - 1) * limit + trucks.length}
            </b>
          </div>
          <div className="flex space-x-1">
            <button
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-gray-500 bg-white border border-gray-200 rounded hover:bg-gray-50 hover:border-gray-400 transition duration-200 ease"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-gray-800 border border-gray-800 rounded hover:bg-gray-600 hover:border-gray-600 transition duration-200 ease">
              {page}
            </button>
            <button
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-gray-500 bg-white border border-gray-200 rounded hover:bg-gray-50 hover:border-gray-400 transition duration-200 ease"
              disabled={trucks.length < limit}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
