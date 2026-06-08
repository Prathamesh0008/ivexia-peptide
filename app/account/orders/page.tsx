import Link from "next/link";
import { redirect } from "next/navigation";
import { PackageCheck, ShoppingCart } from "lucide-react";
import { getSession } from "@/app/auth/session";
import clientPromise from "@/lib/mongodb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Orders | Ivexia Peptide",
  description: "View your Ivexia Peptide order history.",
};

type OrderItem = {
  id?: string;
  name?: string;
  quantity?: number;
  qty?: number;
  slug?: string;
};

async function getUserOrders(email: string) {
  const client = await clientPromise;
  const db = client.db();

  const orders = await db
    .collection("orders")
    .find({ $or: [{ email }, { "customer.email": email }] })
    .sort({ createdAt: -1 })
    .toArray();

  return orders.map((order) => ({
    id: String(order._id),
    orderNumber: order.orderNumber || String(order._id).slice(-6),
    email: order.email || "",
    total: order.totals?.total || order.total || order.totalAmount || 0,
    status: order.status || "Pending",
    createdAt: order.createdAt
      ? new Date(order.createdAt).toLocaleDateString()
      : "N/A",
    items: (order.items || order.cartItems || []) as OrderItem[],
  }));
}

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const orders = await getUserOrders(session.email);

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="border-b border-[#E5E5E5] px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-[980px]">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-[32px] font-bold text-black">My Orders</h1>
              <p className="mt-2 text-sm text-[#56585C]">
                View your order history and saved checkout details.
              </p>
            </div>

            <Link
              href="/account"
              className="text-sm font-semibold text-[#F04423] hover:text-[#D93A18]"
            >
              Back to Profile
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF2EF] text-[#F04423]">
                <ShoppingCart size={26} />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-black">
                No orders yet
              </h2>

              <p className="mx-auto mt-2 max-w-[420px] text-sm leading-6 text-[#56585C]">
                Your order history will appear here after checkout.
              </p>

              <Link
                href="/all-peptides"
                className="mt-6 inline-flex rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A18]"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <section
                  key={order.id}
                  className="rounded-xl border border-[#E5E5E5] bg-white p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#FFF2EF] text-[#F04423]">
                          <PackageCheck size={20} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-black">
                            Order #{order.orderNumber}
                          </p>
                          <p className="mt-1 text-xs text-[#56585C]">
                            {order.createdAt}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-sm font-semibold text-[#111827]">
                        ${Number(order.total).toFixed(2)}
                      </p>
                      <p className="mt-1 text-xs font-medium text-[#F04423]">
                        {order.status}
                      </p>
                    </div>
                  </div>

                  {order.items.length > 0 && (
                    <div className="mt-5 border-t border-[#E5E5E5] pt-4">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#56585C]">
                        Items
                      </p>

                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={`${item.id || item.slug || index}`}
                            className="flex justify-between gap-4 rounded-lg bg-[#FAFAFA] px-4 py-3 text-sm"
                          >
                            <span className="font-medium text-[#111827]">
                              {item.name || "Product"}
                            </span>
                            <span className="text-[#56585C]">
                              Qty: {item.qty || item.quantity || 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
