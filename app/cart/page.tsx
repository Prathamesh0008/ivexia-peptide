"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  Trash2,
  Truck,
} from "lucide-react";
import { useCart } from "@/components/CartProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function CartPage() {
  const { clearCart, items, removeItem, subtotal, updateQuantity } = useCart();
  const shipping = subtotal > 0 ? 18 : 0;
  const tax = subtotal * 0.0825;
  const total = subtotal + shipping + tax;

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="border-b border-[#E5E5E5] bg-gradient-to-br from-white via-[#fff7f4] to-white px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 rounded-2xl border border-[#F04423]/15 bg-white/90 p-6 shadow-sm sm:flex-row sm:items-end">
            <div>
              <p className="inline-flex rounded-md bg-[#F04423] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                Shopping cart
              </p>
              <h1 className="mt-4 text-3xl font-semibold text-[#111827] md:text-4xl">
                Review your cart
              </h1>
              <p className="mt-3 max-w-[560px] text-sm leading-6 text-[#56585C]">
                Confirm product quantities before moving to secure checkout.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold">
                <span className="inline-flex items-center gap-2 rounded-md bg-[#EEFDF3] px-3 py-2 text-[#176B2C]">
                  <CheckCircle2 size={15} /> Cart saved locally
                </span>
                <span className="inline-flex items-center gap-2 rounded-md bg-[#FFF8E6] px-3 py-2 text-[#8A5A00]">
                  <Truck size={15} /> Fast order review
                </span>
              </div>
            </div>

            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center gap-2 rounded-md border border-[#F04423]/30 bg-white px-4 py-3 text-sm font-semibold text-[#111827] shadow-sm transition hover:border-[#F04423] hover:text-[#F04423]"
              >
                <Trash2 size={16} />
                Clear cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-[#F04423]/20 bg-white px-6 py-14 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-[#FFF2EF] text-[#F04423] shadow-sm">
                <PackageCheck size={28} />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-[#111827]">
                Your cart is empty
              </h2>
              <p className="mx-auto mt-3 max-w-[520px] text-sm leading-6 text-[#56585C]">
                Add research-use-only peptide products to your cart before
                checkout.
              </p>
              <Link
                href="/all-peptides"
                className="mt-6 inline-flex rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A18]"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="grid gap-5 overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm transition hover:border-[#F04423]/50 hover:shadow-md sm:grid-cols-[132px_1fr_auto]"
                  >
                    <div className="flex h-[132px] items-center justify-center rounded-md border border-[#F04423]/10 bg-[#FFF8F5]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={132}
                        height={132}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div>
                      <p className="inline-flex rounded-md bg-[#FFF2EF] px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#F04423]">
                        Research use only
                      </p>
                      <h2 className="mt-3 text-lg font-semibold text-[#111827]">
                        {item.name}
                      </h2>
                      {item.size && (
                        <p className="mt-2 text-sm text-[#56585C]">
                          {item.size}
                        </p>
                      )}
                      <p className="mt-4 text-sm text-[#56585C]">
                        Unit price{" "}
                        <span className="font-semibold text-[#F04423]">
                          {formatCurrency(item.price)}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="flex items-center rounded-md border border-[#F04423]/25 bg-[#FFF8F5]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-10 w-10 items-center justify-center text-[#56585C] transition hover:text-[#F04423]"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-10 w-10 items-center justify-center text-[#56585C] transition hover:text-[#F04423]"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#56585C] transition hover:text-[#F04423]"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                      <p className="rounded-md bg-[#EEFDF3] px-3 py-2 text-right text-lg font-semibold text-[#176B2C]">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="h-fit overflow-hidden rounded-2xl border border-[#F04423]/20 bg-white shadow-md lg:sticky lg:top-28">
                <div className="bg-[#111827] p-6 text-white">
                  <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F04423] text-white">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      Order summary
                    </h2>
                    <p className="mt-1 text-xs text-white/70">
                      Secure checkout ready
                    </p>
                  </div>
                  </div>
                </div>
                <div className="p-6">
                <dl className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[#56585C]">Subtotal</dt>
                    <dd className="font-semibold text-[#111827]">
                      {formatCurrency(subtotal)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#56585C]">Shipping</dt>
                    <dd className="font-semibold text-[#111827]">
                      {formatCurrency(shipping)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E5E5] pb-4">
                    <dt className="text-[#56585C]">Estimated tax</dt>
                    <dd className="font-semibold text-[#111827]">
                      {formatCurrency(tax)}
                    </dd>
                  </div>
                  <div className="rounded-md bg-[#FFF2EF] px-4 py-3">
                    <div className="flex justify-between text-lg">
                    <dt className="font-semibold text-[#111827]">Total</dt>
                    <dd className="font-semibold text-[#F04423]">
                      {formatCurrency(total)}
                    </dd>
                    </div>
                  </div>
                </dl>

                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A18]"
                >
                  Checkout <ArrowRight size={17} />
                </Link>
                <p className="mt-4 text-center text-xs leading-5 text-[#56585C]">
                  Taxes and shipping are estimated for checkout review.
                </p>
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
