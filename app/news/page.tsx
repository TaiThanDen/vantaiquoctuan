"use client";

import { useState, useMemo } from "react";
import NewsHeroBanner from "../components/news/HeroBannerNews";
import NewsCard from "../components/news/NewsCard";
import NewsSearch from "../components/search/Search";
import TagFilter from "../components/search/TagFilter";

// Demo data cho banner
const HERO_BANNER_ITEMS = [
  {
    image:
      "https://bcp.cdnchinhphu.vn/334894974524682240/2024/10/17/15cf2193d5136c4d3502-17291624598941427026816.jpg",
    title: "Nông sản Việt vươn ra thế giới",
    content:
      "Việt Nam đẩy mạnh truy xuất nguồn gốc, chuẩn hóa quy trình canh tác và đóng gói, giúp lô hàng đi xa hơn với giá trị cao hơn.",
    date: "19/11/2025",
    category: "Nông nghiệp",
    link: "/news/nong-san-viet-vuon-ra-the-gioi",
  },
  {
    image:
      "https://baodongnai.com.vn/file/e7837c02876411cd0187645a2551379f/102025/img_5509_20251007193425_20251007211100.jpg?width=1800",
    title: "Ứng dụng blockchain trong truy xuất thực phẩm",
    content:
      "Blockchain giúp từng bước trong chuỗi cung ứng được ghi lại không thể sửa đổi. Người tiêu dùng quét mã có thể xem nguồn gốc và thời gian vận chuyển.",
    date: "18/11/2025",
    category: "Công nghệ",
    link: "/news/blockchain-truy-xuat-thuc-pham",
  },
  {
    image:
      "https://i.postimg.cc/SKD5yP2H/d662358d-022a-433e-b6ce-c31e5c46165c.jpg",
    title: "Chống hàng giả bằng mã QR thông minh",
    content:
      "Tem QR động sinh mã theo lô và thời điểm xuất xưởng, mỗi lần quét tạo dấu vết giúp phát hiện bất thường.",
    date: "17/11/2025",
    category: "Sự kiện",
    link: "/news/chong-hang-gia-ma-qr",
  },
];

// Demo data cho tất cả tin tức
const ALL_NEWS = [
  {
    id: "1",
    slug: "coindesk-benchmark-2025-binance-khang-dinh-vi-the-trong-buc-tranh-toan-nganh",
    image:
      "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=800&h=500&fit=crop",
    title:
      "CoinDesk Benchmark 2025: Binance Khẳng Định Vị Thế Trong Bức Tranh Toàn Ngành",
    content:
      "Hai lần mỗi năm, CoinDesk Exchange Benchmark cung cấp góc nhìn toàn diện, dựa trên dữ liệu, vẽ cách các sàn giao dịch tập trung vận hành.",
    date: "22/11/2025",
    category: "Công nghệ",
    tags: ["Document", "Files"],
  },
  {
    id: "2",
    slug: "nong-san-viet-vuon-ra-the-gioi",
    image:
      "https://bcp.cdnchinhphu.vn/334894974524682240/2024/10/17/15cf2193d5136c4d3502-17291624598941427026816.jpg",
    title: "Nông sản Việt vươn ra thế giới",
    content:
      "Việt Nam đẩy mạnh truy xuất nguồn gốc, chuẩn hóa quy trình canh tác và đóng gói, giúp lô hàng đi xa hơn với giá trị cao hơn.",
    date: "19/11/2025",
    category: "Nông nghiệp",
    tags: ["Document"],
  },
  {
    id: "3",
    slug: "blockchain-truy-xuat-thuc-pham",
    image:
      "https://baodongnai.com.vn/file/e7837c02876411cd0187645a2551379f/102025/img_5509_20251007193425_20251007211100.jpg?width=1800",
    title: "Ứng dụng blockchain trong truy xuất thực phẩm",
    content:
      "Blockchain giúp từng bước trong chuỗi cung ứng được ghi lại không thể sửa đổi. Người tiêu dùng quét mã có thể xem nguồn gốc và thời gian vận chuyển.",
    date: "18/11/2025",
    category: "Công nghiệp",
    tags: ["Files", "Videos"],
  },
  {
    id: "4",
    slug: "chong-hang-gia-ma-qr",
    image:
      "https://i.postimg.cc/SKD5yP2H/d662358d-022a-433e-b6ce-c31e5c46165c.jpg",
    title: "Chống hàng giả bằng mã QR thông minh",
    content:
      "Tem QR động sinh mã theo lô và thời điểm xuất xưởng, mỗi lần quét tạo dấu vết giúp phát hiện bất thường.",
    date: "17/11/2025",
    category: "Sự kiện",
    tags: ["Document", "Videos"],
  },
  {
    id: "5",
    slug: "giai-phap-truy-xuat-nguon-goc-cho-nong-nghiep",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=500&fit=crop",
    title: "Giải pháp truy xuất nguồn gốc cho nông nghiệp",
    content:
      "Hệ thống truy xuất nguồn gốc giúp nông dân và doanh nghiệp quản lý chuỗi cung ứng hiệu quả hơn.",
    date: "16/11/2025",
    category: "Nông nghiệp",
    tags: ["Document"],
  },
  {
    id: "6",
    slug: "cong-nghe-iot-trong-nong-nghiep-thong-minh",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop",
    title: "Công nghệ IoT trong nông nghiệp thông minh",
    content:
      "Cảm biến IoT giúp theo dõi điều kiện đất, độ ẩm, nhiệt độ và tự động điều chỉnh tưới tiêu.",
    date: "15/11/2025",
    category: "Công nghệ",
    tags: ["Files"],
  },
  {
    id: "7",
    slug: "xuat-khau-gao-viet-nam-tang-truong-manh",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=500&fit=crop",
    title: "Xuất khẩu gạo Việt Nam tăng trưởng mạnh",
    content:
      "Gạo Việt Nam ngày càng được ưa chuộng trên thị trường quốc tế nhờ chất lượng cao và giá cả cạnh tranh.",
    date: "14/11/2025",
    category: "Nông nghiệp",
    tags: ["Document", "Files"],
  },
  {
    id: "8",
    slug: "hoi-thao-cong-nghe-nong-nghiep-4-0",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    title: "Hội thảo công nghệ nông nghiệp 4.0",
    content:
      "Sự kiện tập hợp các chuyên gia và doanh nghiệp hàng đầu về nông nghiệp số tại Việt Nam.",
    date: "13/11/2025",
    category: "Sự kiện",
    tags: ["Videos"],
  },
  {
    id: "9",
    slug: "smart-logistics-cho-nong-san-tuoi",
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&h=500&fit=crop",
    title: "Smart Logistics cho nông sản tươi",
    content:
      "Giải pháp logistics thông minh giúp nông sản tươi đến tay người tiêu dùng nhanh chóng và an toàn.",
    date: "12/11/2025",
    category: "Công nghiệp",
    tags: ["Document"],
  },
];

export default function NewsPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedTags, setSelectedTags] = useState<
    { tag: string; group: string }[]
  >([]);

  // Lọc tin tức dựa trên từ khóa tìm kiếm và tags
  const filteredNews = useMemo(() => {
    let result = ALL_NEWS;

    // Lọc theo từ khóa
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      result = result.filter(
        (news) =>
          news.title.toLowerCase().includes(keyword) ||
          news.content.toLowerCase().includes(keyword) ||
          news.category.toLowerCase().includes(keyword)
      );
    }

    // Lọc theo tags
    if (selectedTags.length > 0) {
      result = result.filter((news) => {
        // Kiểm tra nếu tin tức có bất kỳ tag nào trong danh sách selected
        return selectedTags.some((selected) =>
          news.tags.includes(selected.tag)
        );
      });
    }

    return result;
  }, [searchKeyword, selectedTags]);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Banner */}
      <NewsHeroBanner
        items={HERO_BANNER_ITEMS}
        autoPlay={true}
        autoPlayDelay={4000}
      />

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <NewsSearch onSearch={setSearchKeyword} />
        </div>

        {/* Filter Tags */}
        <div className="mb-8">
          <TagFilter onFilter={setSelectedTags} />
        </div>

        {/* Active Filters Display */}
        {selectedTags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-600">Đang lọc:</span>
            {selectedTags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2"
              >
                {tag.tag}
                <button
                  onClick={() =>
                    setSelectedTags((prev) =>
                      prev.filter(
                        (t) => t.tag !== tag.tag || t.group !== tag.group
                      )
                    )
                  }
                  className="hover:text-green-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {searchKeyword || selectedTags.length > 0
              ? "Kết quả tìm kiếm"
              : "Tất cả tin tức"}
          </h2>
          <p className="text-gray-600 mt-2">
            Tìm thấy {filteredNews.length} bài viết
          </p>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <NewsCard
                key={news.id}
                image={news.image}
                href={`/news/${news.slug}`}
                title={news.title}
                category={news.category}
                date={news.date}
              >
                <p className="text-sm text-gray-600 line-clamp-3">
                  {news.content}
                </p>
              </NewsCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-500">
              Thử thay đổi từ khóa hoặc bộ lọc để tìm kiếm tin tức khác
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
