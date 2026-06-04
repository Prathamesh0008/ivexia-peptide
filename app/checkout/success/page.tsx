"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type StoredOrder = {
  databaseId?: string;
  id: string;
  total: number;
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
      const storedOrder = window.localStorage.getItem(ORDER_STORAGE_KEY);
      setOrder(storedOrder ? (JSON.parse(storedOrder) as StoredOrder) : null);
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
              Payment processed
            </p>
            <h1 className="mt-3 text-3xl font-medium text-[#111827] md:text-4xl">
              Order confirmed
            </h1>
            <p className="mx-auto mt-4 max-w-[540px] text-sm leading-6 text-[#56585C]">
              Your payment was authorized and your order has been created.
            </p>

            <div className="mt-8 rounded-md bg-[#FAFAFA] p-5 text-left">
              <div className="flex justify-between gap-4 border-b border-[#E5E5E5] pb-4 text-sm">
                <span className="text-[#56585C]">Order number</span>
                <span className="font-semibold text-[#111827]">
                  {order?.id || "IVX-PENDING"}
                </span>
              </div>
              <div className="flex justify-between gap-4 pt-4 text-sm">
                <span className="text-[#56585C]">Total paid</span>
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
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/account"
                className="rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A18]"
              >
                View account
              </Link>
              <Link
                href="/#products"
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
