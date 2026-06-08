import Link from "next/link";
import { redirect } from "next/navigation";
import { EyeOff } from "lucide-react";
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
  searchParams: Promise<{ error?: string; returnTo?: string }>;
}) {
  const { error, returnTo } = await searchParams;
  const redirectTo =
    returnTo?.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/account";
  const session = await getSession();

  if (session) {
    redirect(redirectTo);
  }

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="border-y border-[#E5E5E5] bg-white px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-2 lg:gap-0">
          {/* Sign In */}
          <div className="lg:border-r lg:border-[#E5E5E5] lg:pr-24">
            <h1 className="text-[34px] font-bold leading-tight text-black sm:text-[40px]">
              Sign In
            </h1>

            <p className="mt-8 text-sm leading-6 text-[#4B5563]">
              If you have an account, sign in with your email address
            </p>

            {error === "invalid" && (
              <div className="mt-5 rounded-md border border-[#F04423]/30 bg-[#FFF2EF] px-4 py-3 text-sm text-[#B52B13]">
                Please enter a valid email and password.
              </div>
            )}

            <form action={signIn} className="mt-8 max-w-[420px] space-y-8">
              <input type="hidden" name="redirectTo" value={redirectTo} />

              <label className="block">
                <span className="text-sm font-medium text-black">
                  Email <span className="text-[#F04423]">*</span>
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 h-[50px] w-full rounded-md border border-[#BDBDBD] bg-white px-4 text-sm outline-none transition focus:border-[#F04423]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-black">
                  Password <span className="text-[#F04423]">*</span>
                </span>

                <span className="mt-2 flex h-[50px] items-center rounded-md border border-[#BDBDBD] bg-white px-4 transition focus-within:border-[#F04423]">
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    minLength={6}
                    className="w-full text-sm outline-none"
                  />
                  <EyeOff size={18} className="text-[#BDBDBD]" />
                </span>
              </label>

              <div className="flex items-center gap-5">
                <button
                  type="submit"
                  className="min-w-[180px] rounded-md bg-[#F04423] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#D93A18]"
                >
                  Sign In
                </button>

                <Link
                  href="/forgot-password"
                  className="text-xs text-[#4B5563] transition hover:text-[#F04423]"
                >
                  Forgot Your Password?
                </Link>
              </div>

              <p className="text-xs text-[#F04423]">* Required Fields</p>
            </form>
          </div>

          {/* Sign Up */}
          <div className="lg:pl-24">
            <h2 className="text-[34px] font-bold leading-tight text-black sm:text-[40px]">
              Sign Up
            </h2>

            <p className="mt-8 max-w-[390px] text-sm leading-7 text-[#4B5563]">
              Creating an account has many benefits: check out faster, keep more
              than one address, track orders and more.
            </p>

            <Link
              href={`/register?returnTo=${encodeURIComponent(redirectTo)}`}
              className="mt-8 inline-flex rounded-md bg-[#F04423] px-9 py-3 text-sm font-bold text-white transition hover:bg-[#D93A18]"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
