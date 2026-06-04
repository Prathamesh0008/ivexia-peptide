"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const form = event.currentTarget;

    try {
      await emailjs.sendForm("service_mcpdje4", "template_rxfkmfm", form, {
        publicKey: "u7xiyzEAFzoY1nPfR",
      });

      setStatus("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.log(error);
      setStatus("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="mx-auto max-w-[1400px] px-6 pb-0 pt-16 md:px-10 xl:px-20">
        <div className="grid gap-14 lg:grid-cols-2">
          <div className="space-y-6 rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-md">
            <h1 className="text-3xl font-bold text-[#090909]">
              Got Any Questions?
            </h1>

            <p className="text-[16px] leading-relaxed text-[#56585C]">
              Send Ivexia Peptide a message and our support team will respond as soon as possible.
            </p>

            <form className="space-y-5" onSubmit={sendEmail}>
              <input type="hidden" name="time" value={new Date().toLocaleString()} />
              <input type="hidden" name="subject" value="Contact page inquiry" />

              <Field label="Name" required>
                <input
                  name="user_name"
                  required
                  className="w-full rounded-lg border border-[#D1D5DB] p-3 text-sm outline-none focus:ring-2 focus:ring-[#F04423]/25"
                />
              </Field>

              <Field label="Email" required>
                <input
                  name="user_email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-[#D1D5DB] p-3 text-sm outline-none focus:ring-2 focus:ring-[#F04423]/25"
                />
              </Field>

              <Field label="Phone">
                <input
                  name="phone"
                  className="w-full rounded-lg border border-[#D1D5DB] p-3 text-sm outline-none focus:ring-2 focus:ring-[#F04423]/25"
                />
              </Field>

              <Field label="Comment" required>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-lg border border-[#D1D5DB] p-3 text-sm outline-none focus:ring-2 focus:ring-[#F04423]/25"
                />
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#F04423] py-3 font-semibold text-white shadow-md transition hover:bg-[#D93A18] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Submit"}
              </button>

              {status && (
                <p className="text-sm font-semibold text-[#F04423]">{status}</p>
              )}
            </form>
          </div>

          <div className="space-y-6 rounded-xl border border-[#F04423]/30 bg-[#FFF7F4] p-10 shadow-md">
            <h2 className="text-3xl font-bold text-[#090909]">
              Contact Information
            </h2>

            <p className="text-[16px] leading-relaxed text-[#56585C]">
              For questions about Ivexia Peptide research-use-only products,
              support, or orders, contact us through the details below.
            </p>

            <InfoBlock title="Email" value="service@ivexiapeptide.com" />
            <InfoBlock title="Phone" value="T: 1-800-986-6401" />
            <InfoBlock title="Mailing Address" value="110 SE 6th St #1797, Ft. Lauderdale, FL 33301, USA" />
            <InfoBlock title="Shipping Days" value="Mon - Fri / Except Holidays" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Field({
  children,
  label,
  required = false,
}: {
  children: React.ReactNode;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-[#374151]">
        {label}
        {required && <span className="text-[#F04423]"> *</span>}
      </span>
      {children}
    </label>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="text-[16px]">
      <p className="font-semibold text-[#090909]">{title}</p>
      <p className="mt-1 text-[#56585C]">{value}</p>
    </div>
  );
}
