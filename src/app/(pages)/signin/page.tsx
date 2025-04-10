import React from "react";
import SignInLeftSide from "@/app/components/__molecules/signinleftside/SignInLeftSide";
import SignInForm from "@/app/components/__molecules/signinform/SignInForm";
import SignInSpan from "@/app/components/__atoms/signinspan/SignInSpan";
function SignIn() {
  return (
    <>
      <div className="w-full mt-[-50px] h-[78vh] bg-[#f0f2f5] flex items-center justify-center max-bg:gap-[30px] gap-[60px] max-bg:flex-col max-bg:overflow-hidden">
        <SignInLeftSide />
        <div className="px-3 ">
          <SignInForm />
          <SignInSpan/>
        </div>
      </div>
    </>
  );
}

export default SignIn;
