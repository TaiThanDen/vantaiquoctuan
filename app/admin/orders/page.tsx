"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import { useOrders } from "@/app/hooks/orders";
import { OrderClientService } from "@/services/order.client";

type OrderStatus = "pending" | "completed" | "cancelled";

type Order = {
  id: string | number;

  customer_name?: string;
  customer_phone?: string;

  weight?: number | string;
  weight_type?: string;
  from_location?: string;
  to_location?: string;
  eta?: string;

  service_type_name?: string;
  status: OrderStatus;
};

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { orders, loading, error, refetch } = useOrders(page, limit);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<{
    id: string | number;
    customer_name?: string;
  } | null>(null);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<Order[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const displayOrders = useMemo(() => {
    return searchKeyword.trim() ? searchResults : (orders as Order[]);
  }, [orders, searchKeyword, searchResults]);

  const handleSearch = (keyword: string) => {
    setIsSearching(true);
    setTimeout(() => {
      const lower = keyword.toLowerCase();
      const list = (orders as Order[]) ?? [];
      setSearchResults(
        list.filter(
          (o) =>
            (o.customer_name ?? "").toLowerCase().includes(lower) ||
            (o.customer_phone ?? "").toLowerCase().includes(lower) ||
            (o.from_location ?? "").toLowerCase().includes(lower) ||
            (o.to_location ?? "").toLowerCase().includes(lower) ||
            (o.service_type_name ?? "").toLowerCase().includes(lower)
        )
      );
      setIsSearching(false);
    }, 250);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    if (keyword.trim()) handleSearch(keyword.trim());
    else setSearchResults([]);
  };

  const clearSearch = () => {
    setSearchKeyword("");
    setSearchResults([]);
  };

  const handleDeleteClick = (id: string | number, customer_name?: string) => {
    setPendingOrder({ id, customer_name });
    setConfirmOpen(true);
  };
  async function deleteOrder(id: string | number) {
    try {
      await OrderClientService.delete(String(id));
      return true;
    } catch (err) {
      return false;
    }
  }
  const handleConfirmDelete = async () => {
    if (!pendingOrder) return;
    setConfirmOpen(false);

    const toastId = toast.loading("Đang xóa đơn hàng...");

    try {
      const success = await deleteOrder(pendingOrder.id);
      if (!success) throw new Error("Xóa đơn hàng thất bại");
      await refetch();

      toast.dismiss(toastId);
      toast.success("Xóa đơn hàng thành công!");
      setPendingOrder(null);
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(`Lỗi xóa đơn hàng: ${error?.message || "Đã có lỗi xảy ra"}`);
    }
  };

  const statusBadgeClass = (status: OrderStatus) => {
    const base =
      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap";
    if (status === "completed") return `${base} bg-green-100 text-green-800`;
    if (status === "pending") return `${base} bg-yellow-100 text-yellow-800`;
    return `${base} bg-red-100 text-red-800`;
  };

  const statusLabel = (status: OrderStatus) => {
    if (status === "completed") return "Hoàn thành";
    if (status === "pending") return "Đang xử lý";
    return "Đã hủy";
  };

  if (loading || isSearching) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff4500]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Lỗi tải dữ liệu: {String(error)}
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-center" />

      <ConfirmDialog
        open={confirmOpen}
        title="Xác nhận xóa đơn hàng"
        message={`Bạn có chắc chắn muốn xóa đơn hàng của  "${
          pendingOrder?.customer_name ?? ""
        }"?`}
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingOrder(null);
        }}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý đơn hàng</h1>
        <Link
          href="/admin/orders/create"
          className="px-4 py-2 bg-[#ff4500] text-white rounded-lg hover:bg-[#e63e00]"
        >
          + Tạo đơn hàng mới
        </Link>
      </div>

      {/* Header với search */}
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {searchKeyword.trim() && (
              <span className="text-sm text-gray-500 ml-2">
                Tìm thấy {displayOrders.length} kết quả cho &quot;
                {searchKeyword}&quot;
              </span>
            )}
          </h3>
        </div>

        <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <input
              className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-gray-400 text-gray-700 text-sm border border-gray-200 rounded transition duration-200 ease focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md"
              placeholder="Tìm kiếm đơn hàng..."
              value={searchKeyword}
              onChange={handleSearchChange}
            />

            {searchKeyword && (
              <button
                className="absolute h-8 w-8 right-10 top-1 flex items-center justify-center bg-white rounded hover:bg-gray-100"
                type="button"
                onClick={clearSearch}
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
            <col className="w-[140px]" />
            <col className="w-[160px]" />
            <col className="w-[110px]" />
            <col className="w-[140px]" />
            <col className="w-[220px]" />
            <col className="w-[220px]" />
            <col className="w-[140px]" />
            <col className="w-[140px]" />
            <col className="w-[180px]" />
          </colgroup>

          <thead>
            <tr>
              <th className="p-4 border-b border-gray-200 bg-gray-50 whitespace-nowrap">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Số điện thoại
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50 whitespace-nowrap">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Khách hàng
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50 whitespace-nowrap">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Trọng lượng
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50 whitespace-nowrap">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Kiểu trọng lượng
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50 whitespace-nowrap">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Đi từ
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50 whitespace-nowrap">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Đến nơi
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50 whitespace-nowrap">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Thời gian
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50 whitespace-nowrap">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Kiểu dịch vụ
                </span>
              </th>
              <th className="p-4 border-b border-gray-200 bg-gray-50 whitespace-nowrap">
                <span className="text-sm font-normal leading-none text-gray-500">
                  Trạng thái / Hành động
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.length === 0 ? (
              <tr>
                <td colSpan={10} className="p-8 text-center text-gray-500">
                  {searchKeyword.trim()
                    ? "Không tìm thấy đơn hàng nào phù hợp"
                    : "Chưa có đơn hàng nào"}
                </td>
              </tr>
            ) : (
              displayOrders.map((order: any) => (
                <tr
                  key={String(order.id)}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="p-4 py-5 text-sm text-gray-700 whitespace-nowrap">
                    {order.customer_phone ?? "—"}
                  </td>

                  <td className="p-4 py-5 text-sm text-gray-700">
                    <div className="truncate" title={order.customer_name ?? ""}>
                      {order.customer_name ?? "—"}
                    </div>
                  </td>

                  <td className="p-4 py-5 text-sm text-gray-700 whitespace-nowrap">
                    {order.weight ?? "—"}
                  </td>

                  <td className="p-4 py-5 text-sm text-gray-700 whitespace-nowrap">
                    {order.weight_unit ?? "—"}
                  </td>

                  <td className="p-4 py-5 text-sm text-gray-700">
                    <div className="truncate" title={order.from_location ?? ""}>
                      {order.from_location ?? "—"}
                    </div>
                  </td>

                  <td className="p-4 py-5 text-sm text-gray-700">
                    <div className="truncate" title={order.to_location ?? ""}>
                      {order.to_location ?? "—"}
                    </div>
                  </td>

                  <td className="p-4 py-5 text-sm text-gray-700 whitespace-nowrap">
                    {order.eta ?? "—"}
                  </td>

                  <td className="p-4 py-5 text-sm text-gray-700">
                    <div
                      className="truncate"
                      title={order.service_type_name ?? ""}
                    >
                      {order.service_type_name ?? "—"}
                    </div>
                  </td>

                  {/* gộp trạng thái + hành động vào 1 cột cho gọn */}
                  <td className="p-4 py-5 text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className={statusBadgeClass(order.status)}>
                        {statusLabel(order.status)}
                      </span>
                      <Link
                        href={`/admin/orders/${order.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() =>
                          handleDeleteClick(order.id, order.customer_name)
                        }
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
              {(page - 1) * limit + displayOrders.length}
            </b>
          </div>

          <div className="flex space-x-1">
            <button
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-gray-500 bg-white border border-gray-200 rounded hover:bg-gray-50 hover:border-gray-400 transition duration-200 ease disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>

            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-gray-800 border border-gray-800 rounded">
              {page}
            </button>

            <button
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-gray-500 bg-white border border-gray-200 rounded hover:bg-gray-50 hover:border-gray-400 transition duration-200 ease disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={displayOrders.length < limit}
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
