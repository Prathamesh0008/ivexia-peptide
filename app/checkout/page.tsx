"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CreditCard,
  Loader2,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  Truck,
  UserRound,
} from "lucide-react";
import { useCart } from "@/components/CartProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const ORDER_STORAGE_KEY = "ivexia_last_order";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function normalizeCardNumber(value: string) {
  return value.replace(/\D/g, "");
}

export default function CheckoutPage() {
  const router = useRouter();
  const { clearCart, items, subtotal } = useCart();
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = subtotal > 0 ? 18 : 0;
  const tax = subtotal * 0.0825;
  const total = subtotal + shipping + tax;

  async function handlePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const cardNumber = normalizeCardNumber(String(formData.get("cardNumber")));
    const expiry = String(formData.get("expiry") || "").trim();
    const cvv = String(formData.get("cvv") || "").trim();

    if (cardNumber.length < 12 || cardNumber.length > 19) {
      setError("Please enter a valid card number.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("Please enter expiry as MM/YY.");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      setError("Please enter a valid CVV.");
      return;
    }

    setError("");
    setIsProcessing(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            address: String(formData.get("address") || "").trim(),
            city: String(formData.get("city") || "").trim(),
            company: String(formData.get("company") || "").trim(),
            country: String(formData.get("country") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            name: String(formData.get("name") || "").trim(),
            phone: String(formData.get("phone") || "").trim(),
            state: String(formData.get("state") || "").trim(),
            zip: String(formData.get("zip") || "").trim(),
          },
          items,
          payment: {
            cardLast4: cardNumber.slice(-4),
            status: "authorized",
          },
          totals: {
            subtotal,
            shipping,
            tax,
            total,
          },
        }),
      });

      const data = (await response.json()) as {
        id?: string;
        message?: string;
        orderNumber?: string;
        total?: number;
      };

      if (!response.ok) {
        throw new Error(data.message || "Unable to process payment.");
      }

      window.localStorage.setItem(
        ORDER_STORAGE_KEY,
        JSON.stringify({
          databaseId: data.id,
          id: data.orderNumber,
          items,
          subtotal,
          shipping,
          tax,
          total: data.total ?? total,
          createdAt: new Date().toISOString(),
        }),
      );

      clearCart();
      router.push("/checkout/success");
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Unable to process payment.",
      );
      setIsProcessing(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="border-b border-[#E5E5E5] bg-[linear-gradient(180deg,#FFF2EF_0%,#FAFAFA_42%,#FFFFFF_100%)] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="rounded-md border border-[#F04423]/15 bg-white/85 p-6 shadow-sm">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#56585C] transition hover:text-[#F04423]"
            >
              <ArrowLeft size={16} />
              Back to cart
            </Link>
            <p className="mt-6 inline-flex rounded-md bg-[#F04423] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Checkout
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-[#111827] md:text-4xl">
              Complete payment
            </h1>
            <p className="mt-3 max-w-[620px] text-sm leading-6 text-[#56585C]">
              Enter customer, shipping, and payment details to create the order
              in MongoDB.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold">
              <span className="inline-flex items-center gap-2 rounded-md bg-[#EEFDF3] px-3 py-2 text-[#176B2C]">
                <BadgeCheck size={15} /> MongoDB order save
              </span>
              <span className="inline-flex items-center gap-2 rounded-md bg-[#FFF8E6] px-3 py-2 text-[#8A5A00]">
                <LockKeyhole size={15} /> Demo secure payment
              </span>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="mt-8 rounded-md border border-[#F04423]/20 bg-white px-6 py-14 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-[#FFF2EF] text-[#F04423] shadow-sm">
                <PackageCheck size={28} />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-[#111827]">
                No items to checkout
              </h2>
              <Link
                href="/#products"
                className="mt-6 inline-flex rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A18]"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
              <form
                onSubmit={handlePayment}
                className="overflow-hidden rounded-md border border-[#E5E5E5] bg-white shadow-sm sm:p-0"
              >
                <div className="bg-[#111827] px-6 py-5 text-white sm:px-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F04423]">
                    Order details
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Checkout information
                  </h2>
                </div>
                <div className="p-6 sm:p-8">
                {error && (
                  <div className="mb-6 rounded-md border border-[#F04423]/30 bg-[#FFF2EF] px-4 py-3 text-sm text-[#B52B13]">
                    {error}
                  </div>
                )}

                <section>
                  <SectionTitle
                    icon={UserRound}
                    eyebrow="Step 1"
                    title="Contact information"
                  />
                  <div className="mt-5 grid gap-4 rounded-md bg-[#FAFAFA] p-4 sm:grid-cols-2">
                    <Input label="Full name" name="name" autoComplete="name" />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      autoComplete="email"
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                    />
                    <Input
                      label="Company / lab"
                      name="company"
                      autoComplete="organization"
                    />
                  </div>
                </section>

                <section className="mt-8 border-t border-[#E5E5E5] pt-8">
                  <SectionTitle
                    icon={Truck}
                    eyebrow="Step 2"
                    title="Shipping address"
                  />
                  <div className="mt-5 grid gap-4 rounded-md bg-[#FAFAFA] p-4 sm:grid-cols-2">
                    <Input
                      label="Address"
                      name="address"
                      autoComplete="street-address"
                      className="sm:col-span-2"
                    />
                    <Input label="City" name="city" autoComplete="address-level2" />
                    <Input label="State" name="state" autoComplete="address-level1" />
                    <Input
                      label="ZIP code"
                      name="zip"
                      autoComplete="postal-code"
                    />
                    <Input
                      label="Country"
                      name="country"
                      defaultValue="United States"
                      autoComplete="country-name"
                    />
                  </div>
                </section>

                <section className="mt-8 border-t border-[#E5E5E5] pt-8">
                  <SectionTitle icon={CreditCard} eyebrow="Step 3" title="Payment" />
                  <div className="mt-5 grid gap-4 rounded-md bg-[#FAFAFA] p-4 sm:grid-cols-2">
                    <Input
                      label="Card number"
                      name="cardNumber"
                      inputMode="numeric"
                      placeholder="4242 4242 4242 4242"
                      className="sm:col-span-2"
                    />
                    <Input
                      label="Expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      inputMode="numeric"
                    />
                    <Input
                      label="CVV"
                      name="cvv"
                      placeholder="123"
                      inputMode="numeric"
                    />
                  </div>
                </section>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A18] disabled:cursor-wait disabled:opacity-80"
                >
                  {isProcessing ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <ShieldCheck size={18} />
                  )}
                  {isProcessing ? "Processing payment..." : `Pay ${formatCurrency(total)}`}
                </button>
                </div>
              </form>

              <aside className="h-fit overflow-hidden rounded-md border border-[#F04423]/20 bg-white shadow-sm lg:sticky lg:top-28">
                <div className="bg-[#111827] p-6 text-white">
                  <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F04423] text-white">
                    <LockKeyhole size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      Order summary
                    </h2>
                    <p className="mt-1 text-xs text-white/70">
                      Demo payment authorization
                    </p>
                  </div>
                  </div>
                </div>
                <div className="p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-md border border-[#E5E5E5] bg-[#FAFAFA] p-3 text-sm"
                    >
                      <div className="flex justify-between gap-4">
                      <div>
                        <p className="font-medium text-[#111827]">{item.name}</p>
                        <p className="mt-1 text-[#56585C]">Qty {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-[#111827]">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      </div>
                    </div>
                  ))}
                </div>
                <dl className="mt-6 space-y-4 border-t border-[#E5E5E5] pt-5 text-sm">
                  <SummaryLine label="Subtotal" value={subtotal} />
                  <SummaryLine label="Shipping" value={shipping} />
                  <SummaryLine label="Estimated tax" value={tax} />
                  <div className="rounded-md bg-[#FFF2EF] px-4 py-3">
                    <div className="flex justify-between text-lg">
                    <dt className="font-semibold text-[#111827]">Total</dt>
                    <dd className="font-semibold text-[#F04423]">
                      {formatCurrency(total)}
                    </dd>
                    </div>
                  </div>
                </dl>
                <div className="mt-6 rounded-md bg-[#EEFDF3] p-4 text-xs leading-5 text-[#176B2C]">
                  Card details are used for this demo flow only. Successful
                  orders are saved to MongoDB.
                </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function SectionTitle({
  eyebrow,
  icon: Icon,
  title,
}: {
  eyebrow: string;
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#FFF2EF] text-[#F04423]">
        <Icon size={21} />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#F04423]">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-medium text-[#111827]">{title}</h2>
      </div>
    </div>
  );
}

function Input({
  className = "",
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={className}>
      <span className="text-sm font-medium text-[#111827]">{label}</span>
      <input
        {...props}
        required
        className="mt-2 w-full rounded-md border border-[#CFCFCF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F04423] focus:ring-2 focus:ring-[#F04423]/10"
      />
    </label>
  );
}

function SummaryLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <dt className="text-[#56585C]">{label}</dt>
      <dd className="font-semibold text-[#111827]">{formatCurrency(value)}</dd>
    </div>
  );
}
