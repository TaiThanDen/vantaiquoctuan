# Trang Tin Tức - Hướng Dẫn Sử Dụng

## Mô tả

Trang tin tức tích hợp đầy đủ các component bao gồm:

- Hero Banner với carousel tự động
- Thanh tìm kiếm
- Bộ lọc theo tags
- Hiển thị danh sách tin tức dạng grid

## Truy cập

Mở trình duyệt và truy cập: `http://localhost:3000/news`

Hoặc click vào menu "Tin tức" trên thanh navigation.

## Tính năng

### 1. Hero Banner

- Hiển thị 3 tin tức nổi bật dạng carousel
- Tự động chuyển sau 4 giây
- Có thể click các nút mũi tên để chuyển thủ công
- Các chấm tròn ở dưới để chuyển nhanh đến slide cụ thể

### 2. Tìm kiếm

- Nhập từ khóa vào ô tìm kiếm
- Tìm kiếm theo tiêu đề, nội dung, và danh mục
- Kết quả hiển thị ngay khi gõ

### 3. Bộ lọc Tags

- Click nút "Bộ lọc" để mở panel
- Chọn các tags theo 3 nhóm:
  - **Document**: Hướng dẫn, Báo cáo, Chính sách, Nghiên cứu
  - **Files**: PDF, Excel, Hình ảnh, Biểu mẫu
  - **Videos**: Hướng dẫn, Sự kiện, Webinar, Demo
- Click "Lọc kết quả" để áp dụng
- Click "Đặt lại" để xóa toàn bộ bộ lọc
- Có thể xóa từng tag riêng lẻ bằng nút "×"

### 4. Danh sách tin tức

- Hiển thị dạng grid 3 cột (responsive)
- Mỗi card bao gồm:
  - Hình ảnh
  - Tiêu đề
  - Ngày đăng
  - Danh mục (tag màu xanh)
  - Nội dung tóm tắt
- Click vào card để xem chi tiết

## Dữ liệu Demo

### Tin tức có sẵn

Hệ thống có 9 tin tức mẫu:

1. CoinDesk Benchmark 2025 (Công nghệ)
2. Nông sản Việt vươn ra thế giới (Nông nghiệp)
3. Ứng dụng blockchain trong truy xuất thực phẩm (Công nghiệp)
4. Chống hàng giả bằng mã QR thông minh (Sự kiện)
5. Giải pháp truy xuất nguồn gốc cho nông nghiệp (Nông nghiệp)
6. Công nghệ IoT trong nông nghiệp thông minh (Công nghệ)
7. Xuất khẩu gạo Việt Nam tăng trưởng mạnh (Nông nghiệp)
8. Hội thảo công nghệ nông nghiệp 4.0 (Sự kiện)
9. Smart Logistics cho nông sản tươi (Công nghiệp)

### Tags theo nhóm

- **Document**: Hướng dẫn, Báo cáo, Chính sách, Nghiên cứu
- **Files**: PDF, Excel, Hình ảnh, Biểu mẫu
- **Videos**: Hướng dẫn, Sự kiện, Webinar, Demo

## Cấu trúc File

```
app/
├── news/
│   └── page.tsx              # Trang chính tích hợp tất cả component
├── components/
│   ├── news/
│   │   ├── HeroBannerNews.tsx    # Carousel banner
│   │   ├── NewsCard.tsx          # Card tin tức
│   │   └── NewsSection.tsx       # Section tin tức (dùng cho homepage)
│   └── search/
│       ├── Search.tsx            # Thanh tìm kiếm
│       └── TagFilter.tsx         # Bộ lọc tags
```

## Tùy chỉnh

### Thêm tin tức mới

Mở file `/app/news/page.tsx` và thêm vào mảng `ALL_NEWS`:

```typescript
{
  id: "10",
  slug: "slug-tin-tuc",
  image: "https://example.com/image.jpg",
  title: "Tiêu đề tin tức",
  content: "Nội dung tóm tắt",
  date: "27/11/2025",
  category: "Danh mục",
  tags: ["Document", "Files"],
}
```

### Thêm tag mới

Mở file `/app/components/search/TagFilter.tsx` và chỉnh sửa `DEMO_TAGS_BY_GROUP`:

```typescript
const DEMO_TAGS_BY_GROUP = {
  Document: ["Tag 1", "Tag 2", ...],
  Files: ["Tag 3", "Tag 4", ...],
  Videos: ["Tag 5", "Tag 6", ...],
};
```

### Thay đổi Hero Banner

Mở file `/app/news/page.tsx` và chỉnh sửa `HERO_BANNER_ITEMS`

## Responsive Design

- **Desktop (>= 1024px)**: 3 cột
- **Tablet (768px - 1023px)**: 2 cột
- **Mobile (< 768px)**: 1 cột

## Ghi chú

- Tất cả dữ liệu hiện tại là demo, không kết nối API thật
- Để kết nối API, thay thế các mảng demo bằng fetch API trong `useEffect`
- Links chi tiết tin tức (`/news/{slug}`) sẽ cần page riêng để hiển thị nội dung đầy đủ
