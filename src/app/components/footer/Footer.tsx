import React from "react";
import Link from "next/link";
function Footer() {
  return (
    <>
      <div className="pb-[36px]">
        <div className="flex w-[100%] items-center justify-center">
          <div className="flex max-w-[700px] w-full flex-wrap mt-[24px]">
            <p className="text-xs text-[#65676b] text-center hover:underline ml-3 cursor-pointer">
              English (US)
            </p>
            <p className="text-xs text-[#65676b] text-center hover:underline ml-4  cursor-pointer">
              ქართული
            </p>
            <p className="text-xs text-[#65676b] text-center hover:underline ml-4  cursor-pointer">
              Русский
            </p>
          </div>
        </div>
        <div className="flex justify-center mb-4 mt-4 ml-4">
          <div className="w-[100%] max-w-[700px] border-t border-gray-300"></div>
        </div>
        <div className="flex w-[100%]  items-center justify-center">
          <div className="flex ml-[-8px] max-w-[700px] w-full flex-wrap">
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://www.messenger.com/"
            >
              Sign up
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://www.messenger.com/"
            >
              Login
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://www.facebook.com/lite/"
            >
              Facebook Lite
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://about.meta.com/technologies/meta-pay"
            >
              Meta Play
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://www.meta.com/quest/"
            >
              Meta Quest
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://www.meta.com"
            >
              Meta Store
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://www.instagram.com/"
            >
              Instagram
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://www.threads.net/"
            >
              Threads
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://www.facebook.com/privacy/center/?entry_point=facebook_page_footer"
            >
              Privacy Center
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://www.facebook.com/privacy/policy/?entry_point=facebook_page_footer"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://about.meta.com/"
            >
              About
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://developers.facebook.com/?ref=pf"
            >
              Developers
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://www.metacareers.com/"
            >
              Cariers
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://www.facebook.com/privacy/policies/cookies/?entry_point=cookie_policy_redirect&entry=0"
            >
              Cookies
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://www.facebook.com/policies_center/"
            >
              Terms
            </Link>
            <Link
              className="text-xs text-[#65676b] text-center hover:underline ml-4"
              href="https://www.facebook.com/help/?ref=pf"
            >
              Help
            </Link>
          </div>
        </div>
        <div className="flex w-[100%] items-center justify-center">
          <div className="max-w-[700px] w-full">
            <p className="text-xs text-[#65676b] text-left mt-[8px] hover:underline ml-3 block cursor-pointer">
              Meta © 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
