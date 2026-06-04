"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarClock, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const form = e.currentTarget;

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
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <ProductListTab />

      <section className="px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1550px]">
          <h1 className="text-[44px] font-black leading-tight text-black">
            Contact Us
          </h1>

          <form onSubmit={sendEmail} className="mt-14 max-w-[680px]">
            <h2 className="mb-8 text-[30px] font-black leading-tight text-black">
              Got Any Questions?
            </h2>

            <input type="hidden" name="time" value={new Date().toLocaleString()} />
            <input type="hidden" name="subject" value="Contact page inquiry" />

            <Field label="Name" required>
              <input
                name="user_name"
                required
                className="h-[62px] w-full rounded-[6px] border border-[#C8C8C8] px-4 text-[16px] outline-none focus:border-[#F04423]"
              />
            </Field>

            <Field label="Email" required>
              <input
                name="user_email"
                type="email"
                required
                className="h-[62px] w-full rounded-[6px] border border-[#C8C8C8] px-4 text-[16px] outline-none focus:border-[#F04423]"
              />
            </Field>

            <Field label="Phone">
              <input
                name="phone"
                className="h-[62px] w-full rounded-[6px] border border-[#C8C8C8] px-4 text-[16px] outline-none focus:border-[#F04423]"
              />
            </Field>

            <Field label="Comment" required>
              <textarea
                name="message"
                required
                rows={8}
                className="min-h-[192px] w-full rounded-[6px] border border-[#C8C8C8] px-4 py-3 text-[16px] outline-none focus:border-[#F04423]"
              />
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 h-[50px] w-[226px] rounded-[8px] bg-[#F04423] text-[20px] font-bold text-white transition hover:bg-[#D93A18] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Submit"}
            </button>

            {status && (
              <p className="mt-5 text-[15px] font-semibold text-[#F04423]">
                {status}
              </p>
            )}
          </form>

          <section className="mt-28">
            <h2 className="text-[30px] font-black leading-tight text-black">
              Contact Information
            </h2>

            <div className="mt-8 grid gap-9 md:grid-cols-2 xl:grid-cols-4">
              <ContactInfoCard
                icon={MapPin}
                title="Mailing Address"
                lines={["Ivexia Peptide", "110 SE 6th St #1797,", "Ft. Lauderdale, FL 33301", "USA"]}
              />
              <ContactInfoCard
                icon={Mail}
                title="Email"
                lines={["service@ivexiapeptide.com"]}
              />
              <ContactInfoCard
                icon={Phone}
                title="Phone"
                lines={["T: 1-800-986-6401", "Monday - Friday 9AM - 4PM PST"]}
              />
              <ContactInfoCard
                icon={CalendarClock}
                title="Shipping Days"
                lines={[
                  "Mon - Fri / Except Holidays",
                  "Orders placed and paid after 12 PM PST",
                  "are shipped the following business day",
                ]}
              />
            </div>
          </section>
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
    <label className="mb-9 block">
      <span className="mb-2 block text-[18px] leading-none text-black">
        {label}
        {required && <span className="text-[#F04423]"> *</span>}
      </span>
      {children}
    </label>
  );
}

function ContactInfoCard({
  icon: Icon,
  lines,
  title,
}: {
  icon: React.ElementType;
  lines: string[];
  title: string;
}) {
  return (
    <article className="flex min-h-[198px] gap-4 bg-[#F7F7F7] px-7 py-11">
      <Icon className="mt-1 shrink-0 fill-[#F04423] text-[#F04423]" size={26} />
      <div>
        <h3 className="text-[20px] font-medium leading-tight text-black">{title}</h3>
        <div className="mt-2 space-y-1 text-[18px] leading-[1.2] text-[#56585C]">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProductListTab() {
  return (
    <div className="fixed left-0 top-[206px] z-40 hidden h-[69px] w-[177px] items-center justify-center rounded-r-[8px] bg-[#F04423] text-[18px] font-bold text-white lg:flex">
      Product List
      <span className="ml-5 block h-4 w-4 rotate-45 border-r-[4px] border-t-[4px] border-white" />
    </div>
  );
}
