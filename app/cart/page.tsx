"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
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

      <section className="border-b border-[#E5E5E5] px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-[34px] font-bold text-black">Shopping Cart</h1>
              <p className="mt-2 text-sm text-[#56585C]">
                Review your selected products before checkout.
              </p>
            </div>

            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="w-fit text-sm font-semibold text-[#F04423] hover:text-[#D93A18]"
              >
                Clear Cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="rounded-xl border border-[#E5E5E5] px-6 py-14 text-center">
              <h2 className="text-2xl font-semibold text-black">
                Your cart is empty
              </h2>

              <p className="mx-auto mt-3 max-w-[420px] text-sm leading-6 text-[#56585C]">
                Add products to your cart and they will appear here.
              </p>

              <Link
                href="/all-peptides"
                className="mt-6 inline-flex rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A18]"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div className="rounded-xl border border-[#E5E5E5]">
                <div className="hidden border-b border-[#E5E5E5] px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#56585C] md:grid md:grid-cols-[1fr_120px_130px_100px]">
                  <span>Product</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span className="text-right">Total</span>
                </div>

                <div className="divide-y divide-[#E5E5E5]">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="grid gap-5 px-5 py-5 md:grid-cols-[1fr_120px_130px_100px] md:items-center"
                    >
                      <div className="flex gap-4">
                        <div className="relative h-[92px] w-[92px] shrink-0 rounded-lg bg-[#FFF7F4]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>

                        <div>
                          <h2 className="text-sm font-semibold text-black">
                            {item.name}
                          </h2>

                          {item.size && (
                            <p className="mt-1 text-xs text-[#56585C]">
                              {item.size}
                            </p>
                          )}

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#F04423] hover:text-[#D93A18]"
                          >
                            <Trash2 size={13} />
                            Remove
                          </button>
                        </div>
                      </div>

                      <p className="text-sm font-medium text-[#111827]">
                        {formatCurrency(item.price)}
                      </p>

                      <div className="flex w-fit items-center rounded-md border border-[#D1D5DB]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-9 w-9 items-center justify-center text-[#56585C] hover:text-[#F04423]"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="w-9 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center text-[#56585C] hover:text-[#F04423]"
                          aria-label="Increase quantity"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <p className="text-sm font-semibold text-black md:text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="h-fit rounded-xl border border-[#E5E5E5] bg-white p-6 lg:sticky lg:top-28">
                <h2 className="text-xl font-semibold text-black">
                  Order Summary
                </h2>

                <dl className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[#56585C]">Subtotal</dt>
                    <dd className="font-semibold text-black">
                      {formatCurrency(subtotal)}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="text-[#56585C]">Shipping</dt>
                    <dd className="font-semibold text-black">
                      {formatCurrency(shipping)}
                    </dd>
                  </div>

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

                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A18]"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/all-peptides"
                  className="mt-3 flex w-full items-center justify-center rounded-md border border-[#E5E5E5] px-5 py-3 text-sm font-semibold text-black transition hover:border-[#F04423] hover:text-[#F04423]"
                >
                  Continue Shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}