// Demo news service
export const getNewsBySlug = async (slug: string) => {
  // Demo data
  const newsData: { [key: string]: any } = {
    "coindesk-benchmark-2025-binance-khang-dinh-vi-the-trong-buc-tranh-toan-nganh": {
      id: "1",
      slug: "coindesk-benchmark-2025-binance-khang-dinh-vi-the-trong-buc-tranh-toan-nganh",
      title: "CoinDesk Benchmark 2025: Binance Khẳng Định Vị Thế Trong Bức Tranh Toàn Ngành",
      content: {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Các điểm chính" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Hai lần mỗi năm, CoinDesk Exchange Benchmark cung cấp góc nhìn toàn diện, dựa trên dữ liệu, vẽ cách các sàn giao dịch tập trung vận hành. Ấn bản tháng 11/2025 đã đánh giá 81 sàn giao dịch (79 sàn Spot và 29 sàn phái sinh), dựa trên hơn 100 tiêu chí bao gồm chất lượng thị trường, tuân thủ, minh bạch và bảo mật." 
            }]
          },
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Vị thế của Binance trong ngành" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Trong bối cảnh ngành đang trưởng thành, Binance được công nhận là đơn vị dẫn đầu ở cả hai mảng Spot và Phái sinh." 
            }]
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Quy mô và chất lượng thị trường song hành" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Các nhóm tiêu chí được chấm điểm gồm: Chất lượng thị trường (25%), Bảo mật (20%), Pháp lý & Quy định (15%), KYC / Rủi ro giao dịch (15%), Minh bạch (10%). Binance đạt điểm cao ở tất cả các tiêu chí." 
            }]
          },
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Cạnh tranh đang nâng chuẩn toàn ngành" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Sự cạnh tranh khốc liệt giữa các sàn đã thúc đẩy toàn ngành nâng cao tiêu chuẩn về bảo mật, minh bạch và tuân thủ pháp lý." 
            }]
          },
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Một tương lai được quản lý chặt chẽ hơn" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Binance cam kết tiếp tục đầu tư vào công nghệ, bảo mật và tuân thủ để duy trì vị thế dẫn đầu trong ngành." 
            }]
          },
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Lời kết" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "CoinDesk Benchmark 2025 không chỉ là bảng xếp hạng mà còn là kim chỉ nam cho toàn ngành. Binance tiếp tục khẳng định vị thế dẫn đầu với cam kết mang đến trải nghiệm an toàn, minh bạch và hiệu quả cho người dùng toàn cầu." 
            }]
          }
        ]
      },
      bannerImage: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=1200&h=600&fit=crop",
      banner: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=1200&h=600&fit=crop",
      createdTime: "2025-11-19T10:00:00Z",
      updatedTime: "2025-11-22T14:30:00Z"
    },
    "nong-san-viet-vuon-ra-the-gioi": {
      id: "2",
      slug: "nong-san-viet-vuon-ra-the-gioi",
      title: "Nông sản Việt vươn ra thế giới",
      content: {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Xu hướng toàn cầu hóa nông sản" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Việt Nam đẩy mạnh truy xuất nguồn gốc, chuẩn hóa quy trình canh tác và đóng gói, giúp lô hàng đi xa hơn với giá trị cao hơn." 
            }]
          },
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Công nghệ truy xuất nguồn gốc" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Ứng dụng blockchain và IoT giúp theo dõi từng bước trong chuỗi cung ứng nông sản, tăng cường niềm tin của người tiêu dùng." 
            }]
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Chuẩn hóa quy trình" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Các tiêu chuẩn GlobalGAP, VietGAP được áp dụng rộng rãi, giúp nông sản Việt đáp ứng yêu cầu khắt khe của thị trường quốc tế." 
            }]
          }
        ]
      },
      bannerImage: "https://bcp.cdnchinhphu.vn/334894974524682240/2024/10/17/15cf2193d5136c4d3502-17291624598941427026816.jpg",
      banner: "https://bcp.cdnchinhphu.vn/334894974524682240/2024/10/17/15cf2193d5136c4d3502-17291624598941427026816.jpg",
      createdTime: "2025-11-19T09:00:00Z",
      updatedTime: "2025-11-19T09:00:00Z"
    },
    "chong-hang-gia-ma-qr": {
      id: "4",
      slug: "chong-hang-gia-ma-qr",
      title: "Chống hàng giả bằng mã QR thông minh",
      content: {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Giới thiệu công nghệ mã QR động" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Tem QR động sinh mã theo lô và thời điểm xuất xưởng, mỗi lần quét tạo dấu vết giúp phát hiện bất thường và chống hàng giả hiệu quả." 
            }]
          },
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Ưu điểm của mã QR thông minh" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Mã QR thông minh cho phép người tiêu dùng xác thực sản phẩm ngay lập tức thông qua smartphone. Hệ thống ghi lại mọi lần quét và cảnh báo nếu phát hiện hành vi bất thường." 
            }]
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Tích hợp blockchain" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Kết hợp với công nghệ blockchain, mỗi sản phẩm có lịch sử minh bạch, không thể chỉnh sửa, đảm bảo tính xác thực tuyệt đối." 
            }]
          },
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Triển khai thực tế" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Nhiều doanh nghiệp tại Việt Nam đã áp dụng thành công giải pháp mã QR động, giảm thiểu tỷ lệ hàng giả xuống 95% và tăng niềm tin của khách hàng." 
            }]
          }
        ]
      },
      bannerImage: "https://i.postimg.cc/SKD5yP2H/d662358d-022a-433e-b6ce-c31e5c46165c.jpg",
      banner: "https://i.postimg.cc/SKD5yP2H/d662358d-022a-433e-b6ce-c31e5c46165c.jpg",
      createdTime: "2025-11-17T08:00:00Z",
      updatedTime: "2025-11-17T08:00:00Z"
    },
    "blockchain-truy-xuat-thuc-pham": {
      id: "3",
      slug: "blockchain-truy-xuat-thuc-pham",
      title: "Ứng dụng blockchain trong truy xuất thực phẩm",
      content: {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Blockchain - Công nghệ của tương lai" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Blockchain giúp từng bước trong chuỗi cung ứng được ghi lại không thể sửa đổi. Người tiêu dùng quét mã có thể xem nguồn gốc và thời gian vận chuyển." 
            }]
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Lợi ích cho doanh nghiệp" }]
          },
          {
            type: "paragraph",
            content: [{ 
              type: "text", 
              text: "Doanh nghiệp tăng uy tín, giảm tranh chấp về chất lượng và tối ưu hóa quy trình quản lý kho bãi." 
            }]
          }
        ]
      },
      bannerImage: "https://baodongnai.com.vn/file/e7837c02876411cd0187645a2551379f/102025/img_5509_20251007193425_20251007211100.jpg?width=1800",
      banner: "https://baodongnai.com.vn/file/e7837c02876411cd0187645a2551379f/102025/img_5509_20251007193425_20251007211100.jpg?width=1800",
      createdTime: "2025-11-18T07:00:00Z",
      updatedTime: "2025-11-18T07:00:00Z"
    }
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return newsData[slug] || null;
};

export const getNewsTags = async (newsId: string) => {
  // Demo tags
  return [
    { id: "1", name: "Công nghệ", type: "category" },
    { id: "2", name: "Blockchain", type: "tag" }
  ];
};

export const getNewsList = async (params?: any) => {
  // Return demo news list with full details
  const newsList = [
    {
      id: "1",
      slug: "coindesk-benchmark-2025-binance-khang-dinh-vi-the-trong-buc-tranh-toan-nganh",
      title: "CoinDesk Benchmark 2025: Binance Khẳng Định Vị Thế Trong Bức Tranh Toàn Ngành",
      excerpt: "Hai lần mỗi năm, CoinDesk Exchange Benchmark cung cấp góc nhìn toàn diện, dựa trên dữ liệu, vẽ cách các sàn giao dịch tập trung vận hành.",
      bannerImage: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=800&h=500&fit=crop",
      createdTime: "2025-11-19T10:00:00Z"
    },
    {
      id: "2",
      slug: "nong-san-viet-vuon-ra-the-gioi",
      title: "Nông sản Việt vươn ra thế giới",
      excerpt: "Việt Nam đẩy mạnh truy xuất nguồn gốc, chuẩn hóa quy trình canh tác và đóng gói, giúp lô hàng đi xa hơn với giá trị cao hơn.",
      bannerImage: "https://bcp.cdnchinhphu.vn/334894974524682240/2024/10/17/15cf2193d5136c4d3502-17291624598941427026816.jpg",
      createdTime: "2025-11-19T09:00:00Z"
    },
    {
      id: "3",
      slug: "blockchain-truy-xuat-thuc-pham",
      title: "Ứng dụng blockchain trong truy xuất thực phẩm",
      excerpt: "Blockchain giúp từng bước trong chuỗi cung ứng được ghi lại không thể sửa đổi. Người tiêu dùng quét mã có thể xem nguồn gốc và thời gian vận chuyển.",
      bannerImage: "https://baodongnai.com.vn/file/e7837c02876411cd0187645a2551379f/102025/img_5509_20251007193425_20251007211100.jpg?width=1800",
      createdTime: "2025-11-18T08:00:00Z"
    },
    {
      id: "4",
      slug: "chong-hang-gia-ma-qr",
      title: "Chống hàng giả bằng mã QR thông minh",
      excerpt: "Tem QR động sinh mã theo lô và thời điểm xuất xưởng, mỗi lần quét tạo dấu vết giúp phát hiện bất thường.",
      bannerImage: "https://i.postimg.cc/SKD5yP2H/d662358d-022a-433e-b6ce-c31e5c46165c.jpg",
      createdTime: "2025-11-17T08:00:00Z"
    },
    {
      id: "5",
      slug: "giai-phap-truy-xuat-nguon-goc-cho-nong-nghiep",
      title: "Giải pháp truy xuất nguồn gốc cho nông nghiệp",
      excerpt: "Hệ thống truy xuất nguồn gốc giúp nông dân và doanh nghiệp quản lý chuỗi cung ứng hiệu quả hơn, tăng cường uy tín thương hiệu.",
      bannerImage: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=500&fit=crop",
      createdTime: "2025-11-16T07:00:00Z"
    },
    {
      id: "6",
      slug: "cong-nghe-iot-trong-nong-nghiep-thong-minh",
      title: "Công nghệ IoT trong nông nghiệp thông minh",
      excerpt: "Cảm biến IoT giúp theo dõi điều kiện đất, độ ẩm, nhiệt độ và tự động điều chỉnh tưới tiêu để tối ưu năng suất.",
      bannerImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop",
      createdTime: "2025-11-15T06:00:00Z"
    },
    {
      id: "7",
      slug: "xuat-khau-gao-viet-nam-tang-truong-manh",
      title: "Xuất khẩu gạo Việt Nam tăng trưởng mạnh mẽ",
      excerpt: "Gạo Việt Nam ngày càng được ưa chuộng trên thị trường quốc tế nhờ chất lượng cao, giá cả cạnh tranh và cam kết bền vững.",
      bannerImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=500&fit=crop",
      createdTime: "2025-11-14T05:00:00Z"
    },
    {
      id: "8",
      slug: "hoi-thao-cong-nghe-nong-nghiep-4-0",
      title: "Hội thảo công nghệ nông nghiệp 4.0 tại Hà Nội",
      excerpt: "Sự kiện tập hợp các chuyên gia và doanh nghiệp hàng đầu về nông nghiệp số, AI và IoT ứng dụng trong canh tác hiện đại.",
      bannerImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
      createdTime: "2025-11-13T04:00:00Z"
    },
    {
      id: "9",
      slug: "smart-logistics-cho-nong-san-tuoi",
      title: "Smart Logistics - Giải pháp cho nông sản tươi",
      excerpt: "Giải pháp logistics thông minh với chuỗi lạnh hiện đại giúp nông sản tươi đến tay người tiêu dùng nhanh chóng, an toàn và giữ nguyên chất lượng.",
      bannerImage: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&h=500&fit=crop",
      createdTime: "2025-11-12T03:00:00Z"
    },
    {
      id: "10",
      slug: "tieu-chuan-vietgap-va-globalgap",
      title: "Tiêu chuẩn VietGAP và GlobalGAP trong nông nghiệp",
      excerpt: "Các tiêu chuẩn quốc tế giúp nông sản Việt Nam đáp ứng yêu cầu khắt khe của thị trường xuất khẩu, tăng giá trị sản phẩm.",
      bannerImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop",
      createdTime: "2025-11-11T02:00:00Z"
    },
    {
      id: "11",
      slug: "nong-nghiep-sach-va-huu-co",
      title: "Xu hướng nông nghiệp sạch và hữu cơ",
      excerpt: "Người tiêu dùng ngày càng ưu tiên sản phẩm hữu cơ, không hóa chất. Đây là cơ hội lớn cho nông dân chuyển đổi mô hình canh tác.",
      bannerImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=500&fit=crop",
      createdTime: "2025-11-10T01:00:00Z"
    },
    {
      id: "12",
      slug: "ung-dung-ai-trong-chan-nuoi",
      title: "Ứng dụng AI trong chăn nuôi thông minh",
      excerpt: "Trí tuệ nhân tạo giúp theo dõi sức khỏe đàn gia súc, tối ưu khẩu phần ăn và phát hiện sớm dịch bệnh.",
      bannerImage: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=500&fit=crop",
      createdTime: "2025-11-09T00:00:00Z"
    }
  ];

  return { data: newsList, total: newsList.length };
};
