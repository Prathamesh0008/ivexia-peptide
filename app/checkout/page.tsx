"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const ORDER_STORAGE_KEY = "ivexia_last_order";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const shipping = subtotal > 0 ? 18 : 0;
  const tax = subtotal * 0.0825;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const res = await fetch("/api/session");
        const data = (await res.json()) as { loggedIn?: boolean };

        if (!active) {
          return;
        }

        if (!data.loggedIn) {
          router.replace("/sign-in?returnTo=/checkout");
          return;
        }

        setAuthChecking(false);
      } catch {
        if (active) {
          router.replace("/sign-in?returnTo=/checkout");
        }
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);

    const payload = {
      customer: {
        name: String(formData.get("name") || ""),
        company: String(formData.get("company") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        address: String(formData.get("address") || ""),
        city: String(formData.get("city") || ""),
        state: String(formData.get("state") || ""),
        zip: String(formData.get("zip") || ""),
        country: String(formData.get("country") || ""),
      },
      items,
      payment: {
        cardLast4: "0000",
        status: "pending",
      },
      totals: {
        subtotal,
        shipping,
        tax,
        total,
      },
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      window.localStorage.setItem(
        ORDER_STORAGE_KEY,
        JSON.stringify({
          databaseId: data.id,
          id: data.orderNumber,
          createdAt: data.createdAt,
          customer: payload.customer,
          items: payload.items,
          status: data.status,
          total: payload.totals.total,
          totals: payload.totals,
        }),
      );

      clearCart();
      router.push("/checkout/success");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="border-b border-[#E5E5E5] px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-8">
            <Link
              href="/cart"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#56585C] hover:text-[#F04423]"
            >
              <ArrowLeft size={16} />
              Back to Cart
            </Link>

            <h1 className="text-[34px] font-bold text-black">Checkout</h1>
            <p className="mt-2 text-sm text-[#56585C]">
              Complete your details to place your order.
            </p>
          </div>

          {authChecking ? (
            <div className="rounded-xl border border-[#E5E5E5] px-6 py-14 text-center">
              <h2 className="text-2xl font-semibold text-black">
                Checking account
              </h2>

              <p className="mx-auto mt-3 max-w-[420px] text-sm leading-6 text-[#56585C]">
                Please sign in or create an account before checkout.
              </p>
            </div>
          ) : items.length === 0 && !message ? (
            <div className="rounded-xl border border-[#E5E5E5] px-6 py-14 text-center">
              <h2 className="text-2xl font-semibold text-black">
                Your cart is empty
              </h2>

              <p className="mx-auto mt-3 max-w-[420px] text-sm leading-6 text-[#56585C]">
                Add products before continuing to checkout.
              </p>

              <Link
                href="/all-peptides"
                className="mt-6 inline-flex rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A18]"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {message && (
                  <div className="rounded-lg border border-[#E5E5E5] bg-[#F7F7F7] p-4 text-sm font-semibold text-black">
                    {message}
                  </div>
                )}

                <div className="rounded-xl border border-[#E5E5E5] p-6">
                  <h2 className="text-xl font-semibold text-black">
                    Contact Information
                  </h2>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Input name="name" label="Full Name" required />
                    <Input name="company" label="Company" />
                    <Input name="email" label="Email Address" type="email" required />
                    <Input name="phone" label="Phone Number" required />
                  </div>
                </div>

                <div className="rounded-xl border border-[#E5E5E5] p-6">
                  <h2 className="text-xl font-semibold text-black">
                    Shipping Address
                  </h2>

                  <div className="mt-5 grid gap-4">
                    <Input name="address" label="Address" required />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input name="city" label="City" required />
                      <Input name="state" label="State" required />
                      <Input name="zip" label="ZIP Code" required />
                      <Input name="country" label="Country" required />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A18] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Placing Order..." : "Place Order"}
                  <ArrowRight size={16} />
                </button>
              </form>

              <aside className="h-fit rounded-xl border border-[#E5E5E5] bg-white p-6 lg:sticky lg:top-28">
                <h2 className="text-xl font-semibold text-black">
                  Order Summary
                </h2>

                <div className="mt-5 space-y-4 border-b border-[#E5E5E5] pb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-black">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-[#56585C]">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-semibold text-black">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <dl className="mt-5 space-y-4 text-sm">
                  <Row label="Subtotal" value={formatCurrency(subtotal)} />
                  <Row label="Shipping" value={formatCurrency(shipping)} />

                  <div className="flex justify-between border-b border-[#E5E5E5] pb-4">
                    <dt className="text-[#56585C]">Estimated Tax</dt>
                    <dd className="font-semibold text-black">
                      {formatCurrency(tax)}
                    </dd>
                  </div>

                  <div className="flex justify-between text-lg">
                    <dt className="font-bold text-black">Total</dt>
                    <dd className="font-bold text-[#F04423]">
                      {formatCurrency(total)}
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-black">
        {label}
      </span>

      <input
        {...props}
        className="h-11 w-full rounded-md border border-[#D1D5DB] px-4 text-sm text-black outline-none transition placeholder:text-[#9CA3AF] focus:border-[#F04423]"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-[#56585C]">{label}</dt>
      <dd className="font-semibold text-black">{value}</dd>
    </div>
  );
}
