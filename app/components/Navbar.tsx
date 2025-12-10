"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "@/public/assets/logo_remove_bg-cropped.svg";
const links = [
  { title: "Home", href: "/" },
  { title: "Lịch đặt xe", href: "/order" },
  { title: "Danh mục xe", href: "/trucks" },
  // { title: "Tin tức", href: "/news" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const pathname = usePathname();
  const isLandingOrNews =
    pathname === "/" ||
    pathname.startsWith("/news") ||
    pathname.startsWith("/trucks/");

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 top-0 start-0 transition-colors duration-300 ${
        open || !isTop ? "bg-white/30 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6 text-xl">
        <Link href="/" className="flex items-center space-x-3">
          <Image src={logo} alt="Logo" width={100} height={80} />
        </Link>

        {/* Desktop menu */}
        <div
          className={`hidden md:flex items-center gap-4 px-4 py-2 rounded-2xl transition-all ${
            !isLandingOrNews && isTop
              ? "bg-white/20 backdrop-blur-xl border border-white/30 shadow-sm"
              : "bg-transparent border-none backdrop-blur-0"
          }`}
        >
          <ul className="flex items-center gap-12 px-6 py-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-lg font-medium transition-colors ${
                    !isLandingOrNews && isTop
                      ? "text-white hover:text-gray-200"
                      : pathname === link.href
                      ? "text-blue-700"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/order#booking"
          className={`text-lg font-medium rounded-lg px-4 py-2 text-center  transition-colors ${
            !isLandingOrNews && isTop
              ? "bg-[#ff4500] hover:bg-[#e03e00] text-white"
              : "bg-blue-700 hover:bg-blue-800 text-white"
          }`}
        >
          Đặt xe ngay
        </Link>
        {/* Mobile toggle */}
        <button
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden p-2 rounded-md transition-colors ${
            isTop
              ? "bg-transparent text-[#ff4500]"
              : "hover:bg-gray-100 text-blue-700"
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile dropdown */}
        <div
          id="mobile-nav"
          className={`md:hidden absolute top-full left-0 w-full transition-[max-height,opacity] duration-300
            ${
              isLandingOrNews && isTop
                ? "bg-white/90 text-gray-900"
                : "bg-white/90 text-gray-900"
            }
            ${open ? "max-h-96 opacity-100 " : "max-h-0 opacity-0"}`}
        >
          <ul className="py-2 ">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-4 py-2 text-lg font-medium ${
                    pathname === link.href
                      ? "text-blue-700"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
