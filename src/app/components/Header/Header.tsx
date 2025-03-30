import Link from "next/link";
import React from "react";
import HeaderLeft from "../headerleft/HeaderLeft";
import Nav from "../nav/Nav";
import HeaderRight from "../headerright/HeaderRight";
function Header() {
  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white shadow-md h-[56px]">
        <HeaderLeft />
        <Nav/>
       <HeaderRight/>
      </header>
    </>
  );
}

export default Header;
