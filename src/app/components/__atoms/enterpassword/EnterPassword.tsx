"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loginschema } from "@/app/schemas/LoginSchema/LoginSchema";
function EnterPassword() {
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
        type="password"
        placeholder="Password"
        {...register("password")}
        className="border border-gray-300 rounded-md p-3 w-[360px] h-[50px] text-[18px]"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
    </div>
  );
}

export default EnterPassword;
