"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { SignUpSchema } from "@/app/components/signupschema/SignUpSchema"; 
import Footer from "@/app/components/footer/Footer";
import Link from "next/link";
function SignUp() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = Array.from({ length: 100 }, (_, index) => 2023 - index);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = (data: any) => {
    // Get the existing users from localStorage
    const existingUsers = localStorage.getItem("signupData");
    
    // Parse the existing users or initialize an empty array if no users exist
    let usersArray = existingUsers ? JSON.parse(existingUsers) : [];
  
    // Add the new user to the array
    usersArray.push(data);
  
    // Save the updated array back to localStorage
    localStorage.setItem("signupData", JSON.stringify(usersArray));
  
    // Show an alert and redirect to the signin page
    alert("Account Registered");
    window.location.href = '/signin';
  };
  
  return (
    <>
      <div className="flex justify-center flex-col items-center bg-[#f0f2f5] h-[90vh]">
        <Image
          src="/images/fblogo.svg"
          width={100}
          height={100}
          className="w-[320px] h-[106px]"
          alt="Facebook Logo"
        />
        <div className="flex flex-col mt-4 w-[420px] bg-white px-[12px] h-auto rounded-lg pb-[24px] shadow-lg ">
          <h2 className="text-2xl mt-[2px] font-bold text-center text-[#1c1e21] mb-2">
            Create a new account
          </h2>
          <p className="text-sm text-center text-[#1c1e21] mb-4">
            It's quick and easy.
          </p>
          <div className="flex justify-center mb-4">
            <div className="w-[100%] border-t border-gray-300"></div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="flex gap-3">
              <div>
                <input
                  type="text"
                  placeholder="First name"
                  {...register("firstName")}
                  className="border border-gray-300 rounded-md p-3 text-sm w-[100%] h-[36px]"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last name"
                  {...register("lastName")}
                  className="border border-gray-300 rounded-md p-3 w-[100%] h-[36px]"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs  mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-600">Birthday</p>
            <div className="flex gap-3">
              <div>
                <select
                  {...register("day")}
                  className="border border-gray-300 rounded-md text-sm w-[124px] h-[36px]"
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                {errors.day && (
                  <p className="text-red-500 text-xs  mt-1">Must be selected</p>
                )}
              </div>
              <div>
                <select
                  {...register("month")}
                  className="border border-gray-300 rounded-md text-sm w-[124px] h-[36px]"
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                {errors.month && (
                  <p className="text-red-500 text-xs  mt-1">Must be selected</p>
                )}
              </div>
              <div>
                <select
                  {...register("year")}
                  className="border border-gray-300 rounded-md h-[36px] text-sm w-[124px]"
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.year && (
                  <p className="text-red-500 text-xs  mt-1">Must be selected</p>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-600">Gender</p>
            <div>
              <div className="flex justify-center gap-4">
                <div className="border border-gray-300 rounded-md flex items-center justify-between px-3 text-sm w-[32%] h-[36px]">
                  <label
                    htmlFor="female"
                    className="flex items-center text-sm text-[#1c1e21]"
                  >
                    Female
                  </label>
                  <input
                    type="radio"
                    id="female"
                    {...register("gender")}
                    value="female"
                  />
                </div>

                <div className="border border-gray-300 rounded-md flex items-center justify-between px-3 text-sm w-[32%] h-[36px]">
                  <label
                    htmlFor="male"
                    className="flex items-center text-sm text-[#1c1e21]"
                  >
                    Male
                  </label>
                  <input
                    type="radio"
                    id="male"
                    {...register("gender")}
                    value="male"
                  />
                </div>

                <div className="border border-gray-300 rounded-md flex items-center justify-between px-3 text-sm w-[32%] h-[36px]">
                  <label
                    htmlFor="other"
                    className="flex items-center text-sm text-[#1c1e21]"
                  >
                    Other
                  </label>
                  <input
                    type="radio"
                    id="other"
                    {...register("gender")}
                    value="other"
                  />
                </div>
              </div>

              {errors.gender && (
                <p className="text-red-500 text-xs  mt-1">{errors.gender.message}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Mobile number or email"
                {...register("email")}
                className="border w-full border-gray-300 rounded-md p-3 text-sm mt-1 h-[36px]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs  mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="New password"
                {...register("password")}
                className="border border-gray-300 rounded-md w-full p-3 text-sm mt-1 h-[36px]"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <p className="text-[11px] text-gray-600">
              People who use our service may have uploaded your contact
              information to Facebook.{" "}
              <span className="text-blue-700 cursor-pointer"> Learn more.</span>
            </p>
            <p className="text-gray-600 text-[11px]">
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy. You may receive SMS Notifications from us and can
              opt out any time.
            </p>
            <div className="w-full flex items-center justify-center">
              <button className="bg-[#00a400] w-[194px] h-[36px] font-bold text-white text-lg rounded-md mt-2 hover:bg-green-600 transition duration-200">
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-center text-xs mt-4 text-[#1c1e21]">
            <Link href="signin" className="text-[#1877f2] hover:underline  font-[SFProText-Semibold, Helvetica, Arial, sans-serif] mt-5 text-[17px] leading-[20px] cursor-pointer">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default SignUp;
