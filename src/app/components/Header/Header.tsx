"use client";
import React from "react";
import HeaderLeft from "../headerleft/HeaderLeft";
import Nav from "../nav/Nav";
import HeaderRight from "../headerright/HeaderRight";
import { usePathname } from "next/navigation";
function Header() {
  const pathname = usePathname();
  if (pathname === "/signin" || pathname === "/signup" || pathname === "/") {
    return null;
  } else
    return (
      <>
        <header className="flex items-center justify-between p-4 bg-white shadow-md h-[56px]">
          <HeaderLeft />
          <Nav />
          <HeaderRight />
        </header>
      </>
    );
}

export default Header;
