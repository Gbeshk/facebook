import React from "react";
import SignInFbLogo from "@/app/components/__atoms/signinfblogo/SignInFbLogo";
import SignInHeader from "@/app/components/__atoms/SignInHeader/SignInHeader";
function SignInLeftSide() {
  return (
    <div className="flex flex-col max-bg:items-center">
      <SignInFbLogo />
      <SignInHeader />
    </div>
  );
}

export default SignInLeftSide;
