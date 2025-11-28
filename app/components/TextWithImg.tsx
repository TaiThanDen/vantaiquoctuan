import Image from "next/image";
import bg from "@/public/assets/area-removebg-preview.png";

export default function TextWithImg() {
  return (
    <section className="bg-white">
      <div className="grid max-w-screen-xl px-4 py-16 mx-auto lg:gap-12 xl:gap-16 lg:grid-cols-12">
        {/* TEXT CONTENT */}
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1
            className="mb-6 text-4xl font-extrabold tracking-tight leading-tight 
                         md:text-5xl xl:text-6xl text-[#ff4500]"
          >
            Phạm vi hoạt động
          </h1>

          <p className="mb-6 text-gray-600 text-lg leading-relaxed">
            Chúng tôi cung cấp dịch vụ vận chuyển <b>nội thành và liên tỉnh </b>
            đến hầu hết các tỉnh, thành trên cả nước. Mỗi chuyến xe đều được
            điều phối chặt chẽ và theo dõi hành trình liên tục để đảm bảo
            <b> an toàn – nhanh chóng – đúng hẹn</b>.
          </p>

          <p className="mb-4 text-[#ff4500] font-semibold">
            Các tuyến vận chuyển chính:
          </p>
          <ul className="space-y-2 mb-6 text-gray-600 leading-relaxed list-disc list-inside">
            <li>
              <b>Nội thành:</b> Giao hàng nhanh trong ngày, phục vụ 24/7.
            </li>
            <li>
              <b>Liên tỉnh:</b> Vận chuyển hàng hóa doanh nghiệp, nhà xưởng, kho
              bãi.
            </li>
            <li>
              <b>Chuyển nhà – văn phòng:</b> Trọn gói, tháo lắp, vận chuyển và
              sắp đặt tận nơi.
            </li>
            <li>
              <b>Hàng lẻ – hàng ghép:</b> Tiết kiệm chi phí, có lịch xe cố định
              mỗi ngày.
            </li>
          </ul>

          <p className="mb-4 text-[#ff4500] font-semibold ">
            Hạ tầng & năng lực:
          </p>
          <ul className="space-y-2 text-gray-600 leading-relaxed list-disc list-inside mb-8">
            <li>
              Mạng lưới hơn <b>30 đầu xe</b> từ tải nhỏ đến container lớn.
            </li>
            <li>
              Bãi xe & điểm trung chuyển tại{" "}
              <b>TP.HCM, Hà Nội, Bình Dương, Đà Nẵng</b>.
            </li>
            <li>
              Hệ thống <b>GPS theo dõi hành trình</b> và quản lý đơn hàng trực
              tuyến.
            </li>
            <li>Đội ngũ hỗ trợ sẵn sàng phục vụ 24/7.</li>
          </ul>

          <p className="italic text-gray-500 mb-8">
            “Dù bạn ở đâu – chỉ cần một cuộc gọi, chúng tôi sẽ có mặt.”
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 text-base 
                         font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 
                         focus:ring-4 focus:ring-primary-300"
            >
              Nhận báo giá
            </a>

            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 text-base 
                         font-medium text-gray-900 border border-gray-300 rounded-lg 
                         hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
            >
              Liên hệ tư vấn
            </a>
          </div>
        </div>

        {/* IMAGE */}
        <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
          <Image
            src={bg}
            alt="Phạm vi hoạt động"
            width={520}
            height={520}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
