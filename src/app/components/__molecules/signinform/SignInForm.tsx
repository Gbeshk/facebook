"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import data from "../../../../../data.json";
import { Loginschema } from "@/app/schemas/LoginSchema/LoginSchema";
import Link from "next/link";

function SignInForm() {
  type FormData = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(Loginschema),
  });
  // const calculateAge = (birthDate: string) => {
  //   const birthDateObj = new Date(birthDate);
  //   const today = new Date();
  //   let age = today.getFullYear() - birthDateObj.getFullYear();
  //   const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
  //   if (monthDiff < 0 || 
  //       (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
  //     age--;
  //   }
  //   return age;
  // };

  const onSubmit = (formData: FormData) => {
    const user = data.find(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (!user) {
      alert("No account found with this email");
      return;
    }

    if (user.password === formData.password) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      window.location.href = "/home";
    } else {
      alert("Incorrect password");
    }
  };

  return (
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
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold text-[21px] py-3 h-[50px] rounded-md w-[360px]"
      >
        Log In
      </button>
      <p className="text-[#0866ff] cursor-pointer hover:underline">
        Forgot password?
      </p>
      <div className="w-full h-[1px] bg-gray-300"></div>
      <Link
        href="/signup"
        className="w-[192px] font-bold text-white rounded-[6px] text-[17px] leading-[48px] px-[16px] h-[50px] bg-[#42b72a] cursor-pointer text-center"
      >
        Create new account
      </Link>
    </form>
  );
}

export default SignInForm;