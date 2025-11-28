import NewsCard from "./NewsCard";

const NEWS_ITEMS = [
  {
    image:
      "https://bcp.cdnchinhphu.vn/334894974524682240/2024/10/17/15cf2193d5136c4d3502-17291624598941427026816.jpg",
    title: "Nông sản Việt vươn ra thế giới",
    content:
      "Việt Nam đẩy mạnh truy xuất nguồn gốc, chuẩn hóa quy trình canh tác và đóng gói, giúp lô hàng đi xa hơn với giá trị cao hơn.",
    href: "/news/1",
  },
  {
    image:
      "https://baodongnai.com.vn/file/e7837c02876411cd0187645a2551379f/102025/img_5509_20251007193425_20251007211100.jpg?width=1800",
    title: "Ứng dụng blockchain trong truy xuất thực phẩm",
    content:
      "Blockchain giúp từng bước trong chuỗi cung ứng được ghi lại không thể sửa đổi. Người tiêu dùng quét mã có thể xem nguồn gốc và thời gian vận chuyển.",
    href: "/news/2",
  },
  {
    image:
      "https://i.postimg.cc/SKD5yP2H/d662358d-022a-433e-b6ce-c31e5c46165c.jpg",
    title: "Chống hàng giả bằng mã QR thông minh",
    content:
      "Tem QR động sinh mã theo lô và thời điểm xuất xưởng, mỗi lần quét tạo dấu vết giúp phát hiện bất thường.",
    href: "/news/3",
  },
];

const NewsSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-5xl font-bold text-center my-5 pb-2 text-[#ff4500] font-montserrat">
        Tin tức nổi bật
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-8">
        {NEWS_ITEMS.map((item, index) => (
          <NewsCard
            key={index}
            image={item.image}
            href={item.href}
            title={item.title}
          >
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.content}
            </p>
          </NewsCard>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
