"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Truck, TruckClientService } from "@/services/trucks.client";
import Link from "next/link";
import { Dialog } from "@headlessui/react";

// TipTap (read-only renderer)
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import Youtube from "@tiptap/extension-youtube";
import TiptapViewer from "@/app/components/TipTapViewer";
import TipTapViewer from "@/app/components/TipTapViewer";

function TruckDescriptionReadonly({ content }: { content: any }) {
  // Chuẩn hoá dữ liệu: có thể là object JSON hoặc string JSON
  const normalized = useMemo(() => {
    if (!content) return null;

    // Nếu backend trả về string (có thể là HTML hoặc JSON string)
    if (typeof content === "string") {
      const trimmed = content.trim();

      // Thử parse JSON string kiểu {"type":"doc"...}
      if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try {
          return JSON.parse(trimmed);
        } catch {
          // Không parse được => coi như HTML/text thường
          return content;
        }
      }

      // HTML thường
      return content;
    }

    // Object JSON
    return content;
  }, [content]);

  // Nếu là string HTML => render HTML (không stringify nữa)
  if (typeof normalized === "string") {
    return (
      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: normalized }}
      />
    );
  }

  // Nếu là JSON TipTap => render bằng TipTap read-only
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    editorProps: {
      attributes: {
        class:
          // prose để giống bài viết, max-w-none để không bị bó
          "prose max-w-none text-gray-700 focus:outline-none",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        // link: nếu bạn cần link thì thêm extension Link ở đây
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Youtube.configure({
        controls: true,
        nocookie: true,
        width: 640,
        height: 360,
      }),
    ],
    content: normalized ?? { type: "doc", content: [] },
  });

  if (!normalized) return null;

  return <EditorContent editor={editor} />;
}

export default function TruckDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [truck, setTruck] = useState<Truck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      TruckClientService.getBySlug(slug)
        .then((data) => {
          setTruck(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message || "Không thể tải thông tin xe");
        })
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff4500]" />
      </div>
    );
  }

  if (error || !truck) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy xe
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/trucks"
            className="px-6 py-3 bg-[#ff4500] text-white rounded-lg hover:bg-[#e63e00]"
          >
            Quay lại danh sách xe
          </Link>
        </div>
      </div>
    );
  }

  const images =
    truck.images && truck.images.length > 0
      ? truck.images
      : [{ url: "/assets/truck-placeholder.jpeg" }];

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-27 w-full">
      {/* Full width */}
      <div className="mx-auto w-full max-w-none px-4 sm:px-6 lg:px-10 2xl:px-16">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/trucks"
            className="text-[#ff4500] text-lg hover:underline"
          >
            ← Quay lại danh sách xe
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Gallery */}
            <div>
              <div className="mb-4 rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={images[selectedImage].url}
                  alt={truck.name}
                  className="w-full h-96 object-cover cursor-pointer"
                  onClick={() => setShowModal(true)}
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`rounded-lg overflow-hidden border-2 ${
                        selectedImage === idx
                          ? "border-[#ff4500]"
                          : "border-gray-200"
                      }`}
                      type="button"
                    >
                      <img
                        src={img.url}
                        alt={`${truck.name} - ${idx + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              {/* Thông tin chủ xe dưới ảnh */}
              {(truck.owner_name || truck.owner_phone) && (
                <div className="border-t pt-6 mt-6">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Thông tin chủ xe:
                  </h3>
                  <div className="space-y-2">
                    {truck.owner_name && (
                      <div className="flex items-start">
                        <span className="font-semibold text-gray-700 w-40">
                          Tên:
                        </span>
                        <span className="text-gray-600">
                          {truck.owner_name}
                        </span>
                      </div>
                    )}
                    {truck.owner_phone && (
                      <div className="flex items-start">
                        <span className="font-semibold text-gray-700 w-40">
                          Số điện thoại:
                        </span>
                        <a
                          href={`tel:${truck.owner_phone}`}
                          className="text-[#ff4500] hover:underline"
                        >
                          {truck.owner_phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Truck Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {truck.name}
              </h1>

              <div className="mb-6">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold inline-block ${
                    truck.status === "active"
                      ? "bg-green-100 text-green-700"
                      : truck.status === "in_use"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {truck.status === "active"
                    ? "Sẵn sàng"
                    : truck.status === "in_use"
                    ? "Đang sử dụng"
                    : "Bảo trì"}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <span className="font-semibold text-gray-700 w-40">
                    Hãng xe:
                  </span>
                  <span className="text-gray-600">{truck.brand}</span>
                </div>

                <div className="flex items-start">
                  <span className="font-semibold text-gray-700 w-40">
                    Model:
                  </span>
                  <span className="text-gray-600">{truck.models}</span>
                </div>

                <div className="flex items-start">
                  <span className="font-semibold text-gray-700 w-40">
                    Tải trọng:
                  </span>
                  <span className="text-[#ff4500] font-bold text-lg">
                    {truck.load} {truck.load_unit}
                  </span>
                </div>

                {truck.year && (
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 w-40">
                      Năm sản xuất:
                    </span>
                    <span className="text-gray-600">{truck.year}</span>
                  </div>
                )}

                {truck.color && (
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 w-40">
                      Màu sắc:
                    </span>
                    <span className="text-gray-600">{truck.color}</span>
                  </div>
                )}

                {truck.license_plate && (
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 w-40">
                      Biển số:
                    </span>
                    <span className="text-gray-600 font-mono">
                      {truck.license_plate}
                    </span>
                  </div>
                )}
              </div>

              {truck.truck_types && truck.truck_types.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Loại xe:</h3>
                  <div className="flex flex-wrap gap-2">
                    {truck.truck_types.map((type) => (
                      <span
                        key={type.id}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {type.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {truck.service_types && truck.service_types.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Loại dịch vụ:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {truck.service_types.map((service) => (
                      <span
                        key={service.id}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {service.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <Link
                  href="/order#booking"
                  className="block w-full text-center px-6 py-3 bg-[#ff4500] text-white rounded-lg hover:bg-[#e63e00] font-semibold transition-colors"
                >
                  Đặt xe ngay
                </Link>
              </div>
            </div>
          </div>

          {/* Description Section */}
          {truck.description && (
            <div className="border-t p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Mô tả chi tiết
              </h2>
              <TipTapViewer
                content={truck.description}
                className="simple-editor-content !max-w-none !w-full !mx-0"
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal xem full ảnh */}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      >
        <Dialog.Panel>
          <img
            src={images[selectedImage].url}
            alt={truck.name}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-xl"
            onClick={() => setShowModal(false)}
          />
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
