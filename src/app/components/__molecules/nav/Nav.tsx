"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Nav = () => {
  const [selectedIcon, setSelectedIcon] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    router.push("/friends");
  };
  const handleHomeClick = () => {
    router.push("/home");
  };
  useEffect(() => {
    if (pathname == "/friends") {
      setSelectedIcon(1);
    }
    const userRouteRegex = /^\/users(\/\d+)?$/;
    if (userRouteRegex.test(pathname)) {
      setSelectedIcon(5);
    }
    if (pathname == "/profile" || pathname == "/saved") {
      setSelectedIcon(5);
    }
    if (pathname == "/home") {
      setSelectedIcon(0);
    }
  }, [pathname]);
  return (
    <>
      <div className="flex space-x-2 ml-[47px] max-lg:hidden">
        <div
          className={`w-[102px] h-[56px]  hover:bg-gray-100 flex items-center rounded-[15%] justify-center cursor-pointer
          ${
            selectedIcon === 0
              ? "border-b-[3px] border-solid border-blue-500 rounded-b-none"
              : ""
          }`}
          onClick={() => {
            handleHomeClick();
            setSelectedIcon(0);
          }}
        >
          {selectedIcon === 0 ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#0866ff">
              <path d="M9.464 1.286C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977zM10.5 13A1.5 1.5 0 0 0 9 14.5V21h6v-6.5a1.5 1.5 0 0 0-1.5-1.5h-3z"></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="rgb(101, 104, 108)"
            >
              <path d="M8.99 23H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H8.99zM7.8 4.9l-2 1.5C4.15 7.638 3.61 8.074 3.317 8.658 3.025 9.242 3 9.937 3 12v4c0 1.442.002 2.424.101 3.159.095.706.262 1.033.485 1.255.223.223.55.39 1.256.485.734.099 1.716.1 3.158.1V14.5a2.5 2.5 0 0 1 2.5-2.5h3a2.5 2.5 0 0 1 2.5 2.5V21c1.443 0 2.424-.002 3.159-.101.706-.095 1.033-.262 1.255-.485.223-.222.39-.55.485-1.256.099-.734.101-1.716.101-3.158v-4c0-2.063-.025-2.758-.317-3.342-.291-.584-.832-1.02-2.483-2.258l-2-1.5c-1.174-.881-1.987-1.489-2.67-1.886C12.87 2.63 12.425 2.5 12 2.5c-.425 0-.87.13-1.53.514-.682.397-1.495 1.005-2.67 1.886zM14 21v-6.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V21h4z"></path>
            </svg>
          )}
        </div>

        <div
          className={`w-[102px] h-[56px] hover:bg-gray-100 flex items-center rounded-[15%] justify-center cursor-pointer
          ${
            selectedIcon === 1
              ? "border-b-[3px] border-solid border-blue-500 rounded-b-none"
              : ""
          }`}
          onClick={() => {
            setSelectedIcon(1);
            handleClick();
          }}
        >
          {selectedIcon === 1 ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#0866ff">
              <path d="M16.496 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-9 4.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM5.5 15a5 5 0 0 0-5 5 3 3 0 0 0 3 3h8.006a3 3 0 0 0 3-3 5 5 0 0 0-5-5H5.5zm9-4.5c-.671 0-1.158.46-1.333.966a5.948 5.948 0 0 1-.303.718 1.558 1.558 0 0 0 .525 1.99 7.026 7.026 0 0 1 2.663 3.34c.215.565.76.986 1.418.986h3.036a3 3 0 0 0 3-3 5 5 0 0 0-5-5H14.5z"></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="rgb(101, 104, 108)"
            >
              <path d="M12.496 5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-9 2.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM5.5 15a5 5 0 0 0-5 5 3 3 0 0 0 3 3h8.006a3 3 0 0 0 3-3 5 5 0 0 0-5-5H5.5zm-3 5a3 3 0 0 1 3-3h4.006a3 3 0 0 1 3 3 1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1zm12-9.5a5.04 5.04 0 0 0-.37.014 1 1 0 0 0 .146 1.994c.074-.005.149-.008.224-.008h4.006a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-3.398a1 1 0 1 0 0 2h3.398a3 3 0 0 0 3-3 5 5 0 0 0-5-5H14.5z"></path>
            </svg>
          )}
        </div>

        <div
          className={`w-[102px] h-[56px] hover:bg-gray-100 flex items-center rounded-[15%] justify-center cursor-pointer
          ${
            selectedIcon === 2
              ? "border-b-[3px] border-solid border-blue-500 rounded-b-none"
              : ""
          }`}
          onClick={() => setSelectedIcon(2)}
        >
          {selectedIcon === 2 ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#0866ff">
              <path d="M12 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
              <path d="M12 .5C5.649.5.5 5.649.5 12S5.649 23.5 12 23.5 23.5 18.351 23.5 12 18.351.5 12 .5zM3.34 8.088A9.502 9.502 0 0 1 12 2.5a9.502 9.502 0 0 1 8.66 5.588 4.001 4.001 0 0 0 0 7.824 9.514 9.514 0 0 1-1.755 2.613A5.002 5.002 0 0 0 14 14.5h-4a5.002 5.002 0 0 0-4.905 4.025 9.515 9.515 0 0 1-1.755-2.613 4.001 4.001 0 0 0 0-7.824z"></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="rgb(101, 104, 108)"
            >
              <path d="M12 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
              <path d="M12 .5C5.649.5.5 5.649.5 12S5.649 23.5 12 23.5 23.5 18.351 23.5 12 18.351.5 12 .5zM2.5 12c0-.682.072-1.348.209-1.99a2 2 0 0 1 0 3.98A9.539 9.539 0 0 1 2.5 12zm4 0a4.001 4.001 0 0 0-3.16-3.912A9.502 9.502 0 0 1 12 2.5a9.502 9.502 0 0 1 8.66 5.588 4.001 4.001 0 0 0 0 7.824 9.514 9.514 0 0 1-1.755 2.613A5.002 5.002 0 0 0 14 14.5h-4a5.002 5.002 0 0 0-4.905 4.025 9.515 9.515 0 0 1-1.755-2.613A4.001 4.001 0 0 0 6.5 12zm13 0a2 2 0 0 1 1.791-1.99 9.538 9.538 0 0 1 0 3.98A2 2 0 0 1 19.5 12zm-2.51 8.086A9.455 9.455 0 0 1 12 21.5c-1.83 0-3.54-.517-4.99-1.414a1.004 1.004 0 0 1-.01-.148V19.5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v.438a1 1 0 0 1-.01.148z"></path>
            </svg>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
