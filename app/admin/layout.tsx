"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  const [openSidebar, setOpenSidebar] = useState(false); // Mobile open/close
  const [miniSidebar, setMiniSidebar] = useState(false); // Minified sidebar

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/trucks", label: "Quản lý xe", icon: "🚛" },
    { href: "/admin/orders", label: "Quản lý đơn hàng", icon: "📦" },
    { href: "/admin/news", label: "Quản lý tin tức", icon: "📰" },
    { href: "/admin/users", label: "Quản lý người dùng", icon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md h-16 md:hidden">
        <div className="flex items-center justify-between h-full px-4">
          {/* MOBILE OPEN BUTTON */}
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setOpenSidebar(true)}
          >
            <span className="text-2xl">☰</span>
          </button>
          {/* 
          <Link href="/admin" className="text-2xl font-bold text-[#ff4500]">
            Admin Panel
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Xem trang web
            </Link>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Đăng xuất
            </button>
          </div> */}
        </div>
      </nav>

      <div className="flex">
        {/* OVERLAY (mobile only) */}
        {openSidebar && (
          <div
            className="fixed inset-0 bg-black/40 z-30 sm:hidden"
            onClick={() => setOpenSidebar(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
            fixed sm:static z-40 bg-white min-h-screen ]
            transition-all duration-300 
            ${miniSidebar ? "w-20" : "w-64"}
            ${
              openSidebar
                ? "translate-x-0"
                : "-translate-x-full sm:translate-x-0"
            }
          `}
        >
          {/* SIDEBAR HEADER */}
          <div className="flex items-center justify-between px-4 py-4 border-b">
            {!miniSidebar && <h1 className="font-bold text-lg">Admin Panel</h1>}

            {/* MINIFY BUTTON */}
            <button
              className="hidden sm:flex items-center justify-center p-4 hover:bg-gray-100 rounded-full"
              onClick={() => setMiniSidebar(!miniSidebar)}
            >
              <VscThreeBars className="text-2xl" />
            </button>
          </div>

          {/* MENU */}
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-colors 
                        ${
                          isActive
                            ? "bg-[#ff4500] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                        ${miniSidebar ? "justify-center" : ""}
                      `}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {!miniSidebar && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8 ml-0 sm:ml-0 ">{children}</main>
      </div>
    </div>
  );
}
