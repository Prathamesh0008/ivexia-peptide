import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Database,
  LogOut,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { signOut } from "@/app/auth/actions";
import { getSession } from "@/app/auth/session";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Account | Ivexia Peptide",
  description: "Ivexia Peptide customer account area.",
};

export default async function AccountPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="border-b border-[#E5E5E5] bg-gradient-to-br from-white via-[#fff7f4] to-white px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl border border-[#F04423]/20 bg-white shadow-xl">
            <div className="bg-[#111827] px-6 py-6 text-white sm:px-8">
              <p className="inline-flex rounded-md bg-[#F04423] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                Account dashboard
              </p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                Welcome back
              </h1>
              <p className="mt-3 max-w-[620px] text-sm leading-6 text-white/70">
                Manage your Ivexia account, review product access, and continue
                research-use-only browsing from one workspace.
              </p>
            </div>
            <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-[#FFF2EF] text-[#F04423] shadow-sm">
                  <UserRound size={28} />
                </div>
                <div>
                  <p className="text-sm text-[#56585C]">Signed in as</p>
                  <h2 className="mt-1 text-2xl font-semibold text-[#111827]">
                    {session.email}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="inline-flex items-center gap-2 rounded-md bg-[#EEFDF3] px-3 py-2 text-[#176B2C]">
                      <BadgeCheck size={15} /> Active session
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-md bg-[#FFF8E6] px-3 py-2 text-[#8A5A00]">
                      <ShieldCheck size={15} /> Customer access
                    </span>
                  </div>
                </div>
              </div>

              <form action={signOut}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md border border-[#F04423]/30 bg-white px-5 py-3 text-sm font-semibold text-[#111827] shadow-sm transition hover:border-[#F04423] hover:text-[#F04423]"
                >
                  <LogOut size={17} /> Sign out
                </button>
              </form>
            </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <ActionCard
              icon={PackageCheck}
              title="Product access"
              text="Browse research-use-only peptide product information and details."
              href="/all-peptides"
              cta="View products"
            />

            <ActionCard
              icon={ShoppingCart}
              title="Cart"
              text="Review selected products and continue checkout when ready."
              href="/cart"
              cta="Open cart"
            />

            <ActionCard
              icon={Database}
              title="Orders"
              text="Checkout orders are stored in MongoDB after successful payment."
              href="/checkout"
              cta="Go checkout"
            />
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
            <section className="rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#FFF2EF] text-[#F04423]">
                  <PackageCheck size={22} />
                </div>
                <h2 className="text-xl font-semibold text-[#111827]">
                Product access
              </h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#56585C]">
                Browse product information and keep your research-use-only
                peptide account ready for future order features.
              </p>
              <div className="mt-5 rounded-md bg-[#EEFDF3] p-4 text-sm leading-6 text-[#176B2C]">
                Account session is active and ready for cart, checkout, and
                order creation.
              </div>
              <Link
                href="/all-peptides"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A18]"
              >
                View products <ArrowRight size={17} />
              </Link>
            </section>

            <section className="overflow-hidden rounded-2xl border border-[#F04423]/20 bg-white shadow-xl">
              <div className="bg-[#111827] p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F04423] text-white">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Account status</h2>
                    <p className="mt-1 text-xs text-white/70">
                      Session and role overview
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-[#E5E5E5] pb-4">
                  <dt className="text-[#56585C]">Session</dt>
                  <dd className="rounded-md bg-[#EEFDF3] px-3 py-1 font-semibold text-[#176B2C]">
                    Active
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#E5E5E5] pb-4">
                  <dt className="text-[#56585C]">Role</dt>
                  <dd className="font-semibold text-[#111827]">Customer</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#56585C]">Access</dt>
                  <dd className="font-semibold text-[#111827]">7 days</dd>
                </div>
              </dl>
              <div className="mt-6 flex gap-3 rounded-md bg-[#FFF8E6] p-4">
                <Clock className="mt-1 shrink-0 text-[#8A5A00]" size={19} />
                <p className="text-sm leading-6 text-[#6B4B00]">
                  Your demo session is cookie-based and can be replaced with
                  full production authentication later.
                </p>
              </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ActionCard({
  cta,
  href,
  icon: Icon,
  text,
  title,
}: {
  cta: string;
  href: string;
  icon: React.ElementType;
  text: string;
  title: string;
}) {
  return (
    <section className="rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm transition hover:border-[#F04423]/50 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#FFF2EF] text-[#F04423]">
        <Icon size={22} />
      </div>
      <h2 className="mt-5 text-lg font-semibold text-[#111827]">{title}</h2>
      <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#56585C]">
        {text}
      </p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F04423] transition hover:text-[#D93A18]"
      >
        {cta} <ArrowRight size={16} />
      </Link>
    </section>
  );
}
