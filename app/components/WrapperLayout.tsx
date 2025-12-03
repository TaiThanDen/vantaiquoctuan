"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import ContactFloatingButton from "./ContactFloatingButton";

export default function ConditionalLayout() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) return null;

  return (
    <>
      <Navbar />
      <ContactFloatingButton />
    </>
  );
}
