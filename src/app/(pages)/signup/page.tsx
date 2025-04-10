import React from "react";
import SignInFbLogo from "@/app/components/__atoms/signinfblogo/SignInFbLogo";
import SignUph1 from "@/app/components/__atoms/Signuph1/SignUph1";
import SignUph2 from "@/app/components/__atoms/SignUph2/SignUph2";
import Line from "@/app/components/__atoms/line/Line";
import SignUpForm from "@/app/components/__molecules/singupform/SignUpForm";
import AlreadyHaveAcc from "@/app/components/__atoms/alreadyhaveacc/AlreadyHaveAcc";
function SignUp() {

  return (
    <>
      <div className="flex justify-center min-h-[90vh]  mt-[-50px] flex-col items-center bg-[#f0f2f5] py-5">
       <SignInFbLogo/>
        <div className="flex flex-col mt-4 w-full max-w-[420px] bg-white px-[12px] h-auto rounded-lg pb-[24px] shadow-lg ">
         <SignUph1/>
         <SignUph2/>
            <Line/>
          <SignUpForm/>
          <AlreadyHaveAcc/>
        </div>
      </div>
    </>
  );
}

export default SignUp;
