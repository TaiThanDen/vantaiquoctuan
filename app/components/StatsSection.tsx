export default function StatsSection() {
  const items = [
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <rect x="3" y="7" width="13" height="8" rx="2" stroke="white" />
          <path d="M16 10h3l2 3v2h-5v-5z" stroke="white" />
          <circle cx="7.5" cy="18" r="2" stroke="white" />
          <circle cx="17.5" cy="18" r="2" stroke="white" />
        </svg>
      ),
      value: "50k+",
      label: "Chuyến hàng",
    },
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <polygon
            points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
            stroke="white"
            fill="none"
          />
        </svg>
      ),
      value: "4.9/5",
      label: "Đánh giá",
    },
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" stroke="white" />
          <path d="M8 15c1.333 1.333 4.667 1.333 6 0" stroke="white" />
          <circle cx="9" cy="10" r="1" fill="white" />
          <circle cx="15" cy="10" r="1" fill="white" />
        </svg>
      ),
      value: "3,500+",
      label: "Khách hàng",
    },
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <rect x="3" y="7" width="13" height="8" rx="2" stroke="white" />
          <path d="M16 10h3l2 3v2h-5v-5z" stroke="white" />
          <circle cx="7.5" cy="18" r="2" stroke="white" />
          <circle cx="17.5" cy="18" r="2" stroke="white" />
        </svg>
      ),
      value: "35+",
      label: "Đầu xe",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block bg-[#ff4500] text-white rounded-full px-6 py-2 mb-4 font-medium">
          Tại sao bạn nên chọn chúng tôi
        </span>
        <h2 className="text-4xl md:text-5xl font-medium leading-snug text-neutral-900">
          Con số ấn tượng của
          <br />
          Vận Tải Quốc Tuấn
        </h2>
      </div>

      <div className="max-w-6xl mx-auto mt-14">
        {/* Border chỉ hiện trên md trở lên */}
        <div className="hidden md:block mx-auto lg:w-[85.59%] md:w-[90%] border-t border-gray-600"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 md:gap-40 relative">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center pt-0 md:pt-18"
            >
              {/* Line chỉ hiện trên md trở lên */}
              <span className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-18 bg-gray-700" />
              {/* Icon */}
              <span className="w-20 h-20 flex items-center justify-center rounded-full bg-[#ff4500] mb-4">
                {item.icon}
              </span>
              <div className="text-5xl font-medium text-neutral-800">
                {item.value}
              </div>
              <div className="mt-2 text-base text-neutral-600">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
