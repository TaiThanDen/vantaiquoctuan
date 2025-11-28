"use client";

type TocItem = { id: string; text: string; level: 2 | 3 };

interface TableOfContentsProps {
  items: TocItem[];
  activeId: string;
  onItemClick: (id: string) => void;
  scrollProgress?: number;
  showProgress?: boolean;
}

const TableOfContents = ({
  items,
  activeId,
  onItemClick,
  scrollProgress = 0,
  showProgress = false,
}: TableOfContentsProps) => {
  return (
    <div className="rounded-xl border bg-white shadow-sm p-4">
      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-500">
              Tiến độ đọc
            </span>
            <span className="text-xs text-gray-600">{scrollProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* TOC Title */}
      <div className="text-xs font-semibold text-gray-500 mb-2">Mục lục</div>

      {/* TOC Items */}
      <nav
        className={`space-y-1 ${
          showProgress
            ? "max-h-[500px]"
            : "max-h-[350px] overflow-y-auto no-scrollbar"
        }`}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemClick(item.id)}
            className={`block w-full text-left py-2 px-3 rounded hover:bg-indigo-50 transition-colors ${
              activeId === item.id
                ? "bg-indigo-100 text-indigo-800 font-semibold border-l-4 border-indigo-600"
                : "text-gray-700"
            } ${item.level === 3 ? "ml-4 text-sm" : ""}`}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;
