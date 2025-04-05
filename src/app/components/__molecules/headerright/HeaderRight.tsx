"use client";
import React, { useState } from "react";
import Link from "next/link";

function HeaderRight() {
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

  function SelectIcon(index: number) {
    setSelectedIcon(index === selectedIcon ? null : index);
  }

  return (
    <>
      <div className="flex items-center justify-center gap-[10px]">
        <div className="w-[105px] h-[36px] bg-gray-200 flex items-center justify-center rounded-[20px]">
          <Link href="/" className="color-black font-semibold">
            Find friends
          </Link>
        </div>

        <div
          className="w-[40px] h-[40px] rounded-[50%] flex items-center justify-center cursor-pointer
             bg-gray-200"
          onClick={() => SelectIcon(0)}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill={selectedIcon === 0 ? "#0866ff" : "currentColor"}
          >
            <path d="M18.5 1A1.5 1.5 0 0 0 17 2.5v3A1.5 1.5 0 0 0 18.5 7h3A1.5 1.5 0 0 0 23 5.5v-3A1.5 1.5 0 0 0 21.5 1h-3zm0 8a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 21.5 9h-3zm-16 8A1.5 1.5 0 0 0 1 18.5v3A1.5 1.5 0 0 0 2.5 23h3A1.5 1.5 0 0 0 7 21.5v-3A1.5 1.5 0 0 0 5.5 17h-3zm8 0A1.5 1.5 0 0 0 9 18.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm8 0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm-16-8A1.5 1.5 0 0 0 1 10.5v3A1.5 1.5 0 0 0 2.5 15h3A1.5 1.5 0 0 0 7 13.5v-3A1.5 1.5 0 0 0 5.5 9h-3zm0-8A1.5 1.5 0 0 0 1 2.5v3A1.5 1.5 0 0 0 2.5 7h3A1.5 1.5 0 0 0 7 5.5v-3A1.5 1.5 0 0 0 5.5 1h-3zm8 0A1.5 1.5 0 0 0 9 2.5v3A1.5 1.5 0 0 0 10.5 7h3A1.5 1.5 0 0 0 15 5.5v-3A1.5 1.5 0 0 0 13.5 1h-3zm0 8A1.5 1.5 0 0 0 9 10.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 13.5 9h-3z"></path>
          </svg>
        </div>

        <div
          className="w-[40px] h-[40px] rounded-[50%] flex items-center justify-center cursor-pointer
             bg-gray-200"
          onClick={() => SelectIcon(1)}
        >
          <svg
            viewBox="0 0 12 12"
            width="20"
            height="20"
            fill={selectedIcon === 1 ? "#0866ff" : "currentColor"}
          >
            <g stroke="none" strokeWidth="1" fillRule="evenodd">
              <path
                d="m106.868 921.248-1.892 2.925a.32.32 0 0 1-.443.094l-1.753-1.134a.2.2 0 0 0-.222.003l-1.976 1.363c-.288.199-.64-.143-.45-.437l1.892-2.925a.32.32 0 0 1 .443-.095l1.753 1.134a.2.2 0 0 0 .222-.003l1.976-1.363c.288-.198.64.144.45.438m-3.368-4.251c-3.323 0-5.83 2.432-5.83 5.658 0 1.642.652 3.128 1.834 4.186a.331.331 0 0 1 .111.234l.03 1.01a.583.583 0 0 0 .82.519l1.13-.5a.32.32 0 0 1 .22-.015c.541.148 1.108.223 1.685.223 3.323 0 5.83-2.432 5.83-5.657 0-3.226-2.507-5.658-5.83-5.658"
                transform="translate(-450 -1073.5) translate(352.5 156.845)"
              ></path>
            </g>
          </svg>
        </div>

        <div
          className="w-[40px] h-[40px] rounded-[50%] flex items-center justify-center cursor-pointer
             bg-gray-200"
          onClick={() => SelectIcon(2)}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill={selectedIcon === 2 ? "#0866ff" : "currentColor"}
          >
            <path d="M3 9.5a9 9 0 1 1 18 0v2.927c0 1.69.475 3.345 1.37 4.778a1.5 1.5 0 0 1-1.272 2.295h-4.625a4.5 4.5 0 0 1-8.946 0H2.902a1.5 1.5 0 0 1-1.272-2.295A9.01 9.01 0 0 0 3 12.43V9.5zm6.55 10a2.5 2.5 0 0 0 4.9 0h-4.9z"></path>
          </svg>
        </div>
      </div>
    </>
  );
}

export default HeaderRight;
