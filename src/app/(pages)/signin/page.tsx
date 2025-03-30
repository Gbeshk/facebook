"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

import { Loginschema } from "@/app/components/LoginSchema/LoginSchema";
import Footer from "@/app/components/footer/Footer";
import Link from "next/link";

function SignIn() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(Loginschema),
  });

  const onSubmit = (data: any) => {
    const storedUsers = localStorage.getItem("signupData");
  
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
  
      if (Array.isArray(parsedUsers)) {
  
        const user = parsedUsers.find(
          (user: { email: string; password: string }) =>
            user.email === data.email && user.password === data.password
        );
  
        if (user) {
            window.location.href = '/home';
        } else {
          alert("Invalid email or password");
        }
      } 
    } else {
      alert("No account found. Please sign up first.");
    }
  };
  
  
  

  return (
    <>
      <div className="w-full h-[78vh] bg-[#f0f2f5] flex items-center justify-center gap-[60px] flex-wrap">
        <div>
          <Image
            src="/images/fblogo.svg"
            width={100}
            height={100}
            className="w-[320px] h-[106px]"
            alt="Facebook Logo"
          />
          <p className="font-sf-pro text-[28px] font-normal leading-[32px] w-[500px] mt-[-12px] ml-[32px]">
            Connect with friends and the world around you on Facebook.
          </p>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col bg-white rounded-lg w-[400px] h-auto pb-[24px] items-center gap-[16px] pt-[24px] shadow-[0px_2px_4px_rgba(0,_0,_0,_0.1),_0px_8px_16px_rgba(0,_0,_0,_0.1)] box-border"
          >
            <div>
              <input
                type="text"
                placeholder="Email or phone number"
                {...register("email")}
                className="border border-gray-300 rounded-md p-3 h-[50px] w-[360px] text-[18px]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="border border-gray-300 rounded-md p-3 w-[360px] h-[50px] text-[18px]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button className="bg-blue-500 text-white font-bold text-[21px] py-3 h-[50px] rounded-md w-[360px]">
              Log In
            </button>
            <p className="text-[#0866ff] cursor-pointer hover:underline">forgor password?</p>
            <div className="w-full h-[1px] bg-gray-300"></div>
            {!errors.password && !errors.email && (
              <div className="h-[1px]"></div>
            )}
            <Link href={"/signup"} className="w-[192px font-bold ] text-white rounded-[6px] text-[17px] leading-[48px] px-[16px] h-[50px] bg-[#42b72a] cursor-pointer">
              Create new account
            </Link>
          </form>
          <p className="text-center border-t-0 text-[#1c1e21] font-sf-pro text-sm font-normal pt-0 mt-[24px]">
            <span className="text-black font-bold cursor-pointer focus:outline-none hover:underline">
              Create a Page{" "}
            </span>
            for a celebrity, brand, or business.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
