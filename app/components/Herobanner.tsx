import { ReactNode } from "react";
import Image from "next/image";

type HerobannerProps = {
  bg: any;
  title: ReactNode;
  description: ReactNode;
};

export default function Herobanner({
  bg,
  title,
  description,
}: HerobannerProps) {
  return (
    <div className="bg-base-100">
      <main className="flex h-full flex-col justify-between gap-18 overflow-x-hidden pt-34 md:pt-34 lg:pt-42">
        <div className="flex flex-col items-center gap-8 justify-self-center px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-base-content relative z-1 text-5xl leading-[1.15] font-bold max-md:text-2xl md:max-w-3xl md:text-balance">
            <span>{title}</span>
          </h1>
          <p className="text-lg max-w-3xl">{description}</p>
          <button className="mx-auto rounded-full bg-[#ff4500] px-8 py-3 text-lg font-medium text-white hover:bg-[#e03e00]">
            Đặt Xe Ngay
          </button>
        </div>
        <div className="relative">
          <Image src={bg} alt="Dishes" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,white_10%,transparent_65%)]"></div>
        </div>
      </main>
    </div>
  );
}
