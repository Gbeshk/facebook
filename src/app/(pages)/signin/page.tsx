import React from "react";
import SignInLeftSide from "@/app/components/__molecules/signinleftside/SignInLeftSide";
import SignInForm from "@/app/components/__molecules/signinform/SignInForm";
import SignInSpan from "@/app/components/__atoms/signinspan/SignInSpan";
function SignIn() {
  return (
    <>
      <div className="w-full h-[78vh] bg-[#f0f2f5] flex items-center justify-center gap-[60px] flex-wrap">
        <SignInLeftSide />
        <div>
          <SignInForm />
          <SignInSpan/>
        </div>
      </div>
    </>
  );
}

export default SignIn;
