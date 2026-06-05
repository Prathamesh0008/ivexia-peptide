"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { register } from "@/app/auth/actions";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="border-y border-[#E5E5E5] bg-white px-4 py-8 sm:px-6 lg:py-10">
        <div className="mx-auto max-w-[1180px]">
          <h1 className="text-[30px] font-bold leading-tight text-black sm:text-[36px]">
            Create New Customer Account
          </h1>

          <form action={register} className="mt-8 max-w-[440px]">
            <h2 className="text-base font-bold text-[#56585C]">
              Personal Information
            </h2>

            <div className="mt-6 space-y-8">
              <label className="block">
                <span className="text-sm font-semibold text-black">
                  First Name <span className="text-[#F04423]">*</span>
                </span>
                <input
                  name="firstName"
                  required
                  className="mt-2 h-[50px] w-full rounded-md border border-[#BDBDBD] bg-white px-4 text-sm outline-none transition focus:border-[#F04423]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-black">
                  Last Name <span className="text-[#F04423]">*</span>
                </span>
                <input
                  name="lastName"
                  required
                  className="mt-2 h-[50px] w-full rounded-md border border-[#BDBDBD] bg-white px-4 text-sm outline-none transition focus:border-[#F04423]"
                />
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-black">
                <input
                  name="newsletter"
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#BDBDBD] accent-[#F04423]"
                />
                Sign Up for Newsletter
              </label>
            </div>

            <h2 className="mt-12 text-base font-bold text-[#56585C]">
              Sign-in Information
            </h2>

            <div className="mt-6 space-y-8">
              <label className="block">
                <span className="text-sm font-semibold text-black">
                  Email <span className="text-[#F04423]">*</span>
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 h-[50px] w-full rounded-md border border-[#BDBDBD] bg-white px-4 text-sm outline-none transition focus:border-[#F04423]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-black">
                  Password <span className="text-[#F04423]">*</span>
                </span>
                <span className="mt-2 flex h-[50px] items-center rounded-md border border-[#BDBDBD] bg-white px-4 transition focus-within:border-[#F04423]">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    className="w-full text-sm outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-[#BDBDBD] transition hover:text-[#F04423]"
                  >
                    {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
                  </button>
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-black">
                  Confirm Password <span className="text-[#F04423]">*</span>
                </span>
                <span className="mt-2 flex h-[50px] items-center rounded-md border border-[#BDBDBD] bg-white px-4 transition focus-within:border-[#F04423]">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength={6}
                    className="w-full text-sm outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="text-[#BDBDBD] transition hover:text-[#F04423]"
                  >
                    {showConfirmPassword ? (
                      <Eye size={17} />
                    ) : (
                      <EyeOff size={17} />
                    )}
                  </button>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 w-[260px] rounded-md bg-[#F04423] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#D93A18]"
            >
              Create an Account
            </button>

            <p className="mt-6 text-xs text-[#F04423]">* Required Fields</p>

            <Link
              href="/sign-in"
              className="mt-6 inline-block text-sm font-semibold text-[#F04423]"
            >
              Already have an account?
            </Link>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}