"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  ServiceTypesClient,
  ServiceTypes,
} from "@/services/serviceTypes.Client";
import ConfirmDialog from "@/app/components/ConfirmDialog";

export default function ServiceTypesPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [serviceTypes, setServiceTypes] = useState<ServiceTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    setLoading(true);
    ServiceTypesClient.getAll(page, limit, keyword)
      .then(setServiceTypes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, keyword]);

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  const displayServiceTypes = serviceTypes;

  const handleDeleteClick = (id: string, name: string) => {
    setPendingDelete({ id, name });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    setConfirmOpen(false);
    const toastId = toast.loading("Đang xóa loại dịch vụ...");
    try {
      await ServiceTypesClient.deleteById(pendingDelete.id);
      toast.dismiss(toastId);
      toast.success("Xóa loại dịch vụ thành công!");
      setServiceTypes((prev) => prev.filter((t) => t.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(
        `Lỗi xóa loại dịch vụ: ${error?.message || "Đã có lỗi xảy ra"}`
      );
    }
  };

  return (
    <div>
      <Toaster position="top-center" />
      <ConfirmDialog
        open={confirmOpen}
        title="Xác nhận xóa loại dịch vụ"
        message={`Bạn có chắc chắn muốn xóa loại dịch vụ "${pendingDelete?.name}"?`}
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingDelete(null);
        }}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Quản lý loại dịch vụ
        </h1>
        <Link
          href="/admin/service-types/create"
          className="px-4 py-2 bg-[#ff4500] text-white rounded-lg hover:bg-[#e63e00]"
        >
          + Thêm loại dịch vụ mới
        </Link>
      </div>

      {/* Header với search */}
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          {keyword && (
            <span className="text-sm text-gray-500 ml-2">
              Tìm thấy {displayServiceTypes.length} kết quả cho &quot;{keyword}
              &quot;
            </span>
          )}
        </div>
        <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <input
              className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-gray-400 text-gray-700 text-sm border border-gray-200 rounded transition duration-200 ease focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md"
              placeholder="Tìm kiếm loại dịch vụ..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword && (
              <button
                className="absolute h-8 w-8 right-10 top-1 flex items-center justify-center bg-white rounded hover:bg-gray-100"
                type="button"
                onClick={() => setKeyword("")}
                aria-label="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <button
              className="absolute h-8 w-8 right-1 top-1 flex items-center justify-center bg-white rounded"
              type="button"
              aria-label="Search"
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

      <div className="relative w-full overflow-x-auto text-gray-700 bg-white shadow-md rounded-lg">
        <table className="w-full text-left table-fixed border-collapse">
          <colgroup>
            <col className="w-[60px]" />
            <col />
            <col className="w-[180px]" />
          </colgroup>
          <thead>
            <tr>
              <th className="p-4 border-b border-gray-200 bg-gray-50 whitespace-nowrap">
                <span className="text-sm font-normal leading-none text-gray-500">
                  #
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50 whitespace-nowrap">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Tên loại dịch vụ
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50 whitespace-nowrap">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Hành động
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff4500]" />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-red-500">
                  Lỗi tải dữ liệu: {error}
                </td>
              </tr>
            ) : displayServiceTypes.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">
                  {keyword.trim()
                    ? "Không tìm thấy loại dịch vụ nào phù hợp"
                    : "Chưa có loại dịch vụ nào"}
                </td>
              </tr>
            ) : (
              displayServiceTypes.map((type, idx) => (
                <tr
                  key={type.id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="p-4 py-5 text-sm text-gray-700 whitespace-nowrap">
                    {(page - 1) * limit + idx + 1}
                  </td>
                  <td className="p-4 py-5 text-sm text-gray-700">
                    {type.name}
                  </td>
                  <td className="p-4 py-5 text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/service-types/${type.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(type.id, type.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-sm text-gray-500">
            Hiển thị{" "}
            <b>
              {(page - 1) * limit + 1}-
              {(page - 1) * limit + displayServiceTypes.length}
            </b>
          </div>
          <div className="flex space-x-1">
            <button
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-gray-500 bg-white border border-gray-200 rounded hover:bg-gray-50 hover:border-gray-400 transition duration-200 ease"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-gray-800 border border-gray-800 rounded hover:bg-gray-600 hover:border-gray-600 transition duration-200 ease">
              {page}
            </button>
            <button
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-gray-500 bg-white border border-gray-200 rounded hover:bg-gray-50 hover:border-gray-400 transition duration-200 ease"
              disabled={displayServiceTypes.length < limit}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
