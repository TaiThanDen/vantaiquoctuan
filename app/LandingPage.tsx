import Herobanner from "./components/Herobanner";
import bg from "@/public/assets/Herobanner_bg.webp";
import TextWithBento from "./components/TextWithBentoImage";
import StatsSection from "./components/StatsSection";
import StickyImageWithScrollingText from "./components/StickyImageWithScrollingText/StickyImageWithScrollingText";
import SolutionCarousel from "./components/SolutionCarousel";
import TextWithImg from "./components/TextWithImg";
import FormSubmit from "./components/FormSubmit";
import NewsSection from "./components/news/NewsSection";

const stickyImageSections = [
  {
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
    children: (
      <div className="mb-10">
        <h1 className="text-3xl text-bold my-5 ">
          Chuyển Nhà Trọn Gói - An Toàn & Chuyên Nghiệp
        </h1>
        <p className="mb-5">
          Dịch vụ chuyển nhà toàn diện với đội ngũ chuyên nghiệp, giàu kinh
          nghiệm. Từ đóng gói, vận chuyển đến bố trí tại địa điểm mới. Cam kết
          bảo vệ tài sản của bạn như chính của chúng tôi.
        </p>
        <div className="mt-8 gap-4 ">
          <div className="border mb-3 border-white rounded-xl p-4 text-white bg-[#ff4500] flex items-center justify-center h-20 text-center">
            Khảo sát và tư vấn miễn phí tại nhà
          </div>
          <div className="border mb-3 border-white rounded-xl p-4 text-white bg-[#ff4500] flex items-center justify-center h-20 text-center">
            Đóng gói, tháo lắp, vận chuyển trọn gói
          </div>
          <div className="border mb-3 border-white rounded-xl p-4 text-white bg-[#ff4500] flex items-center justify-center h-20 text-center">
            Bảo hiểm hàng hóa, cam kết an toàn tuyệt đối
          </div>
        </div>
      </div>
    ),
  },
  {
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1600&auto=format&fit=crop",
    children: (
      <div className="mb-10">
        <h1 className="text-3xl text-bold my-5 ">
          Vận Chuyển Hàng Công Nghiệp - Tải Trọng Lớn
        </h1>
        <p className="mb-5">
          Chuyên vận chuyển máy móc, thiết bị, nguyên vật liệu cho doanh nghiệp,
          nhà máy. Đội xe tải từ 2 đến 30 tấn, hỗ trợ cẩu hạ và giám sát GPS
          real-time.
        </p>
        <div className="mt-8 gap-4 ">
          <div className="border mb-3 border-white rounded-xl p-4 text-white bg-[#ff4500] flex items-center justify-center h-20 text-center">
            Xe tải chuyên dụng, đa dạng tải trọng
          </div>
          <div className="border mb-3 border-white rounded-xl p-4 text-white bg-[#ff4500] flex items-center justify-center h-20 text-center">
            Hỗ trợ cẩu hạ, bốc xếp chuyên nghiệp
          </div>
          <div className="border mb-3 border-white rounded-xl p-4 text-white bg-[#ff4500] flex items-center justify-center h-20 text-center">
            Theo dõi GPS, bảo hiểm hàng hóa toàn chuyến
          </div>
        </div>
      </div>
    ),
  },
  {
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1600&auto=format&fit=crop",
    children: (
      <div className="mb-10">
        <h1 className="text-3xl text-bold my-5 ">
          Chuyển Văn Phòng & Vận Chuyển Liên Tỉnh
        </h1>
        <p className="mb-5">
          Dịch vụ chuyển văn phòng, kho xưởng, vận chuyển liên tỉnh. Lập kế
          hoạch chi tiết, tháo lắp thiết bị, bảo quản tài liệu và thiết bị an
          toàn, lịch xe cố định toàn quốc.
        </p>
        <div className="mt-8 gap-4 ">
          <div className="border mb-3 border-white rounded-xl p-4 text-white bg-[#ff4500] flex items-center justify-center h-20 text-center">
            Tháo lắp, đóng gói thiết bị văn phòng/kho xưởng
          </div>
          <div className="border mb-3 border-white rounded-xl p-4 text-white bg-[#ff4500] flex items-center justify-center h-20 text-center">
            Vận chuyển liên tỉnh, phủ sóng toàn quốc
          </div>
          <div className="border mb-3 border-white rounded-xl p-4 text-white bg-[#ff4500] flex items-center justify-center h-20 text-center">
            Lịch xe cố định, hàng ghép hoặc xe riêng
          </div>
        </div>
      </div>
    ),
  },
];

const EXPERT_ITEMS = [
  {
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
    imageAlt: "Giải pháp chuyển nhà",
    title: "Giải pháp Chuyển Nhà Trọn Gói",
    label: "Quy trình A–Z | Không giới hạn tải trọng",
    description:
      "Khác với dịch vụ van nhỏ, chúng tôi xử lý trọn quy trình cho các hộ gia đình và doanh nghiệp: khảo sát – lập kế hoạch – đóng gói – vận chuyển – bố trí. Tối ưu lộ trình, giảm thời gian, an toàn tuyệt đối.",
    features: [
      "Đội xe đa tải trọng (500kg–5 tấn)",
      "Vật liệu đóng gói chuyên dụng",
      "Bảo hiểm hàng hóa toàn chuyến",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=600&fit=crop",
    imageAlt: "Giải pháp hàng công nghiệp",
    title: "Giải pháp Hàng Công Nghiệp",
    label: "2–30 tấn | Cẩu hạ & Giám sát GPS",
    description:
      "Ưu thế ở năng lực tải trọng lớn và hàng cồng kềnh: máy móc, thiết bị, vật tư. Hỗ trợ cẩu hạ chuyên nghiệp, giám sát GPS real-time, quy trình kiểm soát rủi ro chặt chẽ.",
    features: [
      "Xe tải nặng & container",
      "Cẩu hạ, bốc xếp an toàn",
      "GPS realtime + checklist",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=600&fit=crop",
    imageAlt: "Giải pháp chuyển văn phòng",
    title: "Giải pháp Chuyển Văn Phòng",
    label: "Giảm downtime | Bảo quản hồ sơ",
    description:
      "Thiết kế lộ trình chuyển đổi giảm gián đoạn hoạt động: phân loại – đóng gói – đánh dấu – vận chuyển – lắp đặt. Phù hợp các công ty cần di dời nhanh, gọn và an toàn.",
    features: [
      "Kế hoạch theo timeline",
      "Niêm phong tài liệu",
      "Lắp đặt thiết bị tại điểm đến",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&h=600&fit=crop",
    imageAlt: "Giải pháp liên tỉnh",
    title: "Giải pháp Vận Chuyển Liên Tỉnh",
    label: "Lịch xe cố định | Hàng ghép/xe riêng",
    description:
      "Mạng lưới toàn quốc với lịch xe cố định. Linh hoạt lựa chọn hàng ghép tối ưu chi phí hoặc xe riêng cho đơn lớn, đáp ứng nhanh, minh bạch chi phí.",
    features: [
      "Phủ sóng toàn quốc",
      "Bảng giá minh bạch",
      "Theo dõi hành trình",
    ],
  },
];

export default function LandingPage() {
  return (
    <>
      <Herobanner
        bg={bg}
        title={
          <>
            Vận Tải Quốc Tuấn
            <br />
            <span className="text-[#ff4500]">
              Giải Pháp Vận Chuyển Toàn Diện
            </span>
          </>
        }
        description={
          <>
            Chuyên vận chuyển hàng công nghiệp, chuyển nhà trọn gói và hàng tải
            trọng lớn, tải trọng đa dạng từ 100kg - 5 tấn Với hơn 20 năm kinh
            nghiệm
            <br />
            <span className="font-semibold text-[#ff4500]">
              An Toàn - Nhanh Chóng - Đúng Hẹn
            </span>
          </>
        }
      />
      <StatsSection />
      <TextWithBento />
      <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl text-center pt-16">
        Dịch vụ đa dạng
      </h1>
      <StickyImageWithScrollingText
        sections={stickyImageSections}
        imagePosition="left"
        className=""
      />
      <SolutionCarousel
        items={EXPERT_ITEMS}
        autoPlay={true}
        autoPlayDelay={3000}
      />
      <TextWithImg />
      <NewsSection />
      <FormSubmit />
    </>
  );
}
