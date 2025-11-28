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
  { title: "Tin tức", href: "/news" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav className="fixed w-full z-50 top-0 start-0 bg-white/30 backdrop-blur ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6 text-xl">
        <Link href="/" className="flex items-center space-x-3">
          <Image src={logo} alt="Logo" width={100} height={80} />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Vận Tải Quốc Tuấn
          </span> */}
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-lg font-medium hover:text-blue-700 ${
                  pathname === link.href ? "text-blue-700" : "text-gray-900"
                }`}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="text-white text-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center"
        >
          Đặt xe ngay
        </button>
        {/* Mobile toggle */}
        <button
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
        >
          {open ? (
            <X className="h-6 w-6 text-blue-700" />
          ) : (
            <Menu className="h-6 w-6 text-blue-700" />
          )}
        </button>

        {/* Mobile dropdown */}
        <div
          id="mobile-nav"
          className={`md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur transition-[max-height,opacity] duration-300 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="py-2 border-t border-gray-200 ">
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
