import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, Mail, PackageCheck, ShoppingCart, UserRound } from "lucide-react";
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

      <section className="border-b border-[#E5E5E5] px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-[980px]">
          <div className="mb-8">
            <h1 className="text-[32px] font-bold text-black">My Profile</h1>
            <p className="mt-2 text-sm text-[#56585C]">
              Manage your Ivexia Peptide account details.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="rounded-xl border border-[#E5E5E5] bg-white p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF2EF] text-[#F04423]">
                <UserRound size={30} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-black">
                Customer Account
              </h2>

              <p className="mt-2 break-all text-sm text-[#56585C]">
                {session.email}
              </p>

              <form action={signOut} className="mt-6">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#F04423] px-4 py-2.5 text-sm font-semibold text-[#F04423] transition hover:bg-[#FFF2EF]"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </form>
            </aside>

            <section className="rounded-xl border border-[#E5E5E5] bg-white p-6">
              <h2 className="text-xl font-semibold text-black">
                Account Information
              </h2>

              <div className="mt-6 space-y-4">
                <InfoRow icon={Mail} label="Email Address" value={session.email} />
                <InfoRow icon={UserRound} label="Account Type" value="Customer" />
                <InfoRow icon={PackageCheck} label="Status" value="Active" />
              </div>

              <div className="mt-8 border-t border-[#E5E5E5] pt-6">
                <h3 className="text-base font-semibold text-black">
                  Quick Links
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/all-peptides"
                    className="rounded-lg border border-[#E5E5E5] px-4 py-3 text-sm font-medium text-[#111827] transition hover:border-[#F04423] hover:text-[#F04423]"
                  >
                    <PackageCheck className="mb-2 text-[#F04423]" size={20} />
                    Browse Products
                  </Link>

                  <Link
                    href="/cart"
                    className="rounded-lg border border-[#E5E5E5] px-4 py-3 text-sm font-medium text-[#111827] transition hover:border-[#F04423] hover:text-[#F04423]"
                  >
                    <ShoppingCart className="mb-2 text-[#F04423]" size={20} />
                    View Cart
                  </Link>
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

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-[#FAFAFA] px-4 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-[#F04423]">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#56585C]">
          {label}
        </p>
        <p className="mt-1 break-all text-sm font-medium text-[#111827]">
          {value}
        </p>
      </div>
    </div>
  );
}