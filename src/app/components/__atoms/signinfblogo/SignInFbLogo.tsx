import Image from "next/image";
import React from "react";

function SignInFbLogo() {
  return (
    <div>
      <Image
        src="/images/fblogo.svg"
        width={100}
        height={100}
        className="w-[320px] h-[106px]"
        alt="Facebook Logo"
      />
    </div>
  );
}

export default SignInFbLogo;
