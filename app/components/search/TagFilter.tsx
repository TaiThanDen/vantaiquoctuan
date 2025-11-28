"use client";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";

// Demo data cho tags
const DEMO_TAGS_BY_GROUP = {
  Document: ["Hướng dẫn", "Báo cáo", "Chính sách", "Nghiên cứu"],
  Files: ["PDF", "Excel", "Hình ảnh", "Biểu mẫu"],
  Videos: ["Hướng dẫn", "Sự kiện", "Webinar", "Demo"],
};

const TAG_GROUPS = [
  { key: "Document", owner: "document" },
  { key: "Files", owner: "file" },
  { key: "Videos", owner: "video" },
];

export default function TagFilter({
  onFilter,
}: {
  onFilter: (tags: { tag: string; group: string }[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{ tag: string; group: string }[]>(
    []
  );

  const toggleTag = (tag: string, group: string) => {
    setSelected((prev) =>
      prev.some((t) => t.tag === tag && t.group === group)
        ? prev.filter((t) => !(t.tag === tag && t.group === group))
        : [...prev, { tag, group }]
    );
  };

  const handleFilter = () => {
    onFilter(selected);
    setOpen(false);
  };

  return (
    <div className="w-full px-5">
      {/* FILTER BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        <FiFilter size={18} />
        <span>Bộ lọc</span>
      </button>

      {/* FILTER PANEL */}
      {open && (
        <div className="mt-4 w-full bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
          {TAG_GROUPS.map((group) => (
            <div key={group.key}>
              <p className="font-semibold mb-2 text-green-700">{group.key}:</p>
              <div className="flex flex-wrap gap-2">
                {(
                  DEMO_TAGS_BY_GROUP[
                    group.key as keyof typeof DEMO_TAGS_BY_GROUP
                  ] || []
                ).map((tag: string) => {
                  const active = selected.some(
                    (t) => t.tag === tag && t.group === group.key
                  );
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag, group.key)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${
                        active
                          ? "bg-green-100 text-green-700 border-green-400"
                          : "bg-white text-gray-700 border-gray-300 hover:border-green-500"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ACTION BUTTONS */}
          <div className="pt-4 flex gap-4">
            <button
              className="bg-green-600 px-4 py-2 rounded-lg text-white font-medium hover:bg-green-700"
              onClick={handleFilter}
            >
              Lọc kết quả
            </button>
            <button
              onClick={() => setSelected([])}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              Đặt lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
