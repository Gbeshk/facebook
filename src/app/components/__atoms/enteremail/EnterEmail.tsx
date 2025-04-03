"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loginschema } from "@/app/schemas/LoginSchema/LoginSchema";
function EnterEmail() {
  type FormData = {
    email: string;
    password: string;
  };
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(Loginschema),
  });

  return (
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
  );
}

export default EnterEmail;
