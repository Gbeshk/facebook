import Link from "next/link";
import React from "react";

function NewAccLink() {
  return (
    <Link
      href="/signup"
      className="w-[192px] font-bold text-white rounded-[6px] text-[17px] leading-[48px] px-[16px] h-[50px] bg-[#42b72a] cursor-pointer text-center"
    >
      Create new account
    </Link>
  );
}

export default NewAccLink;
