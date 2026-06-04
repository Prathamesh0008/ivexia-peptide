"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="mx-auto max-w-xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="mt-3 text-sm leading-6 text-[#56585C]">
          Create an Ivexia account to keep checkout and account information organized.
        </p>

        <form
          className="mt-8 space-y-5 rounded-xl border border-[#E5E5E5] p-6"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-[#374151]">Name</span>
            <input
              required
              className="w-full rounded-lg border border-[#D1D5DB] p-3 text-sm outline-none focus:ring-2 focus:ring-[#F04423]/25"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-[#374151]">Email</span>
            <input
              type="email"
              required
              className="w-full rounded-lg border border-[#D1D5DB] p-3 text-sm outline-none focus:ring-2 focus:ring-[#F04423]/25"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-[#374151]">Password</span>
            <input
              type="password"
              required
              minLength={6}
              className="w-full rounded-lg border border-[#D1D5DB] p-3 text-sm outline-none focus:ring-2 focus:ring-[#F04423]/25"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white hover:bg-[#D93A18]"
          >
            Create Account
          </button>

          {submitted && (
            <p className="text-sm font-semibold text-[#F04423]">
              Account request received. Please sign in or contact support for help.
            </p>
          )}
        </form>

        <Link href="/sign-in" className="mt-6 inline-block text-sm font-semibold text-[#F04423]">
          Already have an account?
        </Link>
      </section>

      <Footer />
    </main>
  );
}
