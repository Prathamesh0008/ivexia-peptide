import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  BadgeCheck,
  ClipboardCheck,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { signIn } from "@/app/auth/actions";
import { getSession } from "@/app/auth/session";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sign in | Ivexia Peptide",
  description: "Sign in to your Ivexia Peptide account.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getSession();

  if (session) {
    redirect("/account");
  }

  const { error } = await searchParams;

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="border-b border-[#E5E5E5] bg-[linear-gradient(180deg,#FFF2EF_0%,#FAFAFA_44%,#FFFFFF_100%)] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1280px] overflow-hidden rounded-md border border-[#F04423]/20 bg-white shadow-sm lg:grid-cols-[1fr_0.9fr]">
          <div className="flex min-h-[560px] flex-col justify-center px-6 py-10 sm:px-10 lg:px-14">
            <p className="inline-flex w-fit rounded-md bg-[#F04423] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Customer account
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-[#111827] sm:text-4xl">
              Sign in to continue
            </h1>
            <p className="mt-4 max-w-[460px] text-sm leading-6 text-[#56585C]">
              Access your account, review product interest, and keep your
              research-use-only peptide browsing details in one place.
            </p>

            <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold">
              <span className="inline-flex items-center gap-2 rounded-md bg-[#EEFDF3] px-3 py-2 text-[#176B2C]">
                <BadgeCheck size={15} /> Secure account
              </span>
              <span className="inline-flex items-center gap-2 rounded-md bg-[#FFF8E6] px-3 py-2 text-[#8A5A00]">
                <ClipboardCheck size={15} /> Order-ready access
              </span>
            </div>

            {error === "invalid" && (
              <div className="mt-6 rounded-md border border-[#F04423]/30 bg-[#FFF2EF] px-4 py-3 text-sm text-[#B52B13]">
                Please enter a valid email and a password with at least 6
                characters.
              </div>
            )}

            <form
              action={signIn}
              className="mt-8 max-w-[460px] space-y-5 rounded-md border border-[#E5E5E5] bg-[#FAFAFA] p-5"
            >
              <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#FFF2EF] text-[#F04423]">
                  <UserRound size={21} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F04423]">
                    Login
                  </p>
                  <h2 className="mt-1 font-semibold text-[#111827]">
                    Account credentials
                  </h2>
                </div>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-[#111827]">Email</span>
                <span className="mt-2 flex items-center rounded-md border border-[#CFCFCF] bg-white px-4 py-3 transition focus-within:border-[#F04423] focus-within:ring-2 focus-within:ring-[#F04423]/10">
                  <Mail size={18} className="shrink-0 text-[#F04423]" />
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="ml-3 w-full text-sm outline-none"
                    placeholder="you@example.com"
                  />
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[#111827]">
                  Password
                </span>
                <span className="mt-2 flex items-center rounded-md border border-[#CFCFCF] bg-white px-4 py-3 transition focus-within:border-[#F04423] focus-within:ring-2 focus-within:ring-[#F04423]/10">
                  <LockKeyhole size={18} className="shrink-0 text-[#F04423]" />
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    minLength={6}
                    className="ml-3 w-full text-sm outline-none"
                    placeholder="Enter your password"
                  />
                </span>
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 text-[#56585C]">
                  <input
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 accent-[#F04423]"
                  />
                  Remember me
                </label>
                <Link href="/forgot-password" className="font-medium text-[#F04423]">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A18]"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-sm text-[#56585C]">
              New to Ivexia?{" "}
              <Link href="/register" className="font-medium text-[#F04423]">
                Create an account
              </Link>
            </p>
          </div>

          <div className="relative hidden min-h-[560px] bg-[#111827] lg:block">
            <Image
              src="/medicineproduct.jpg"
              alt="Ivexia peptide product packaging"
              fill
              sizes="(min-width: 1024px) 504px, 0px"
              priority
              className="object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/45 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-2 text-xs font-semibold backdrop-blur">
                <ShieldCheck size={16} /> Ivexia account access
              </div>
              <h2 className="mt-5 text-3xl font-semibold leading-tight">
                Research-use-only product management
              </h2>
              <p className="mt-3 max-w-[390px] text-sm leading-6 text-white/75">
                Keep product browsing, checkout, and account activity organized
                in one clean workspace.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md bg-white/12 p-4 backdrop-blur">
                  <p className="text-2xl font-semibold text-[#F04423]">24/7</p>
                  <p className="mt-1 text-white/75">Account access</p>
                </div>
                <div className="rounded-md bg-white/12 p-4 backdrop-blur">
                  <p className="text-2xl font-semibold text-[#F04423]">RUO</p>
                  <p className="mt-1 text-white/75">Product support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
