//app\checkout\success\page.tsx
"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type StoredOrder = {
  databaseId?: string;
  customer?: {
    address: string;
    city: string;
    company: string;
    country: string;
    email: string;
    name: string;
    phone: string;
    state: string;
    zip: string;
  };
  id: string;
  items?: {
    id: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
  }[];
  status?: string;
  total: number;
  totals?: {
    shipping: number;
    subtotal: number;
    tax: number;
    total: number;
  };
  createdAt: string;
};

const ORDER_STORAGE_KEY = "ivexia_last_order";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const storedOrder = window.localStorage.getItem(ORDER_STORAGE_KEY);
        setOrder(storedOrder ? (JSON.parse(storedOrder) as StoredOrder) : null);
      } catch {
        setOrder(null);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="bg-[#FAFAFA] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-[760px] rounded-md border border-[#E5E5E5] bg-white p-8 text-center sm:p-10">
            <CheckCircle2 className="mx-auto text-[#F04423]" size={56} />
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-[#F04423]">
              Order placed
            </p>
            <h1 className="mt-3 text-3xl font-medium text-[#111827] md:text-4xl">
              Order confirmed
            </h1>
            <p className="mx-auto mt-4 max-w-[540px] text-sm leading-6 text-[#56585C]">
              Your order has been saved and our team will contact you with the
              next steps.
            </p>

            <div className="mt-8 rounded-md bg-[#FAFAFA] p-5 text-left">
              <div className="flex justify-between gap-4 border-b border-[#E5E5E5] pb-4 text-sm">
                <span className="text-[#56585C]">Order number</span>
                <span className="font-semibold text-[#111827]">
                  {order?.id || "IVX-PENDING"}
                </span>
              </div>
              <div className="flex justify-between gap-4 pt-4 text-sm">
                <span className="text-[#56585C]">Order total</span>
                <span className="font-semibold text-[#F04423]">
                  {formatCurrency(order?.total || 0)}
                </span>
              </div>
              {order?.databaseId && (
                <div className="mt-4 flex justify-between gap-4 border-t border-[#E5E5E5] pt-4 text-sm">
                  <span className="text-[#56585C]">Database ID</span>
                  <span className="font-semibold text-[#111827]">
                    {order.databaseId}
                  </span>
                </div>
              )}

              {order?.customer && (
                <div className="mt-4 border-t border-[#E5E5E5] pt-4 text-sm">
                  <p className="font-semibold text-[#111827]">Customer details</p>
                  <p className="mt-2 text-[#56585C]">
                    {order.customer.name} - {order.customer.email}
                  </p>
                  <p className="mt-1 text-[#56585C]">
                    {order.customer.phone}
                  </p>
                  <p className="mt-1 text-[#56585C]">
                    {order.customer.address}, {order.customer.city},{" "}
                    {order.customer.state} {order.customer.zip},{" "}
                    {order.customer.country}
                  </p>
                </div>
              )}

              {order?.items && order.items.length > 0 && (
                <div className="mt-4 border-t border-[#E5E5E5] pt-4 text-sm">
                  <p className="font-semibold text-[#111827]">Items ordered</p>
                  <div className="mt-3 space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between gap-4 text-sm"
                      >
                        <div>
                          <p className="font-semibold text-[#111827]">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-[#56585C]">
                            Qty: {item.quantity}
                            {item.size ? ` - ${item.size}` : ""}
                          </p>
                        </div>
                        <p className="font-semibold text-[#111827]">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/account"
                className="rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A18]"
              >
                View account
              </Link>
              <Link
                href="/all-peptides"
                className="rounded-md border border-[#CFCFCF] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#F04423] hover:text-[#F04423]"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
