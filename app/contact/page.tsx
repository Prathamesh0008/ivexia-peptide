"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Truck } from "lucide-react";

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
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="border-t border-[#E5E5E5]">
   <div className="mx-auto max-w-[1360px] px-6 py-10 lg:px-20">
          <h1 className="mb-8 text-[28px] font-bold text-black">Contact Us</h1>

          <div className="max-w-[520px]">
            <h2 className="mb-6 text-[20px] font-bold">Got Any Questions?</h2>

            <form onSubmit={sendEmail} className="space-y-6">
              <input type="hidden" name="time" value={new Date().toLocaleString()} />
              <input type="hidden" name="subject" value="Contact page inquiry" />

              <Field label="Name" required>
                <input name="user_name" required className="contact-input" />
              </Field>

              <Field label="Email" required>
                <input name="user_email" type="email" required className="contact-input" />
              </Field>

              <Field label="Phone">
                <input name="phone" className="contact-input" />
              </Field>

              <Field label="Comment" required>
                <textarea name="message" required rows={6} className="contact-input resize-y" />
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="h-[36px] w-[170px] rounded-md bg-[#F04423] text-[13px] font-bold text-white transition hover:bg-[#D93A18] disabled:opacity-60"
              >
                {loading ? "Sending..." : "Submit"}
              </button>

              {status && (
                <p className="text-[13px] font-semibold text-[#F04423]">
                  {status}
                </p>
              )}
            </form>
          </div>

          <div className="mt-14">
            <h2 className="mb-5 text-[20px] font-bold">Contact Information</h2>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard
                icon={MapPin}
                title="Mailing Address"
                lines={[
                  "Ivexia Peptide",
                  "110 SE 6th St #1797,",
                  "Ft. Lauderdale, FL 33301",
                  "USA",
                ]}
              />

              <InfoCard
                icon={Mail}
                title="Email"
                lines={["service@ivexiapeptide.com"]}
              />

              <InfoCard
                icon={Phone}
                title="Phone"
                lines={["T: 1-800-986-6401", "Monday - Friday 9AM - 4PM PST"]}
              />

              <InfoCard
                icon={Truck}
                title="Shipping Days"
                lines={[
                  "Mon - Fri / Except Holidays",
                  "Orders placed and paid after 12 PM PST",
                  "are shipped the following business day",
                ]}
              />
            </div>
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
      <span className="mb-1 block text-[12px] font-bold text-black">
        {label}
        {required && <span className="text-[#F04423]"> *</span>}
      </span>
      {children}
    </label>
  );
}

function InfoCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: React.ElementType;
  title: string;
  lines: string[];
}) {
  return (
    <div className="grid min-h-[120px] grid-cols-[24px_1fr] gap-3 bg-[#F7F7F7] p-5">
      <Icon className="mt-1 text-[#F04423]" size={18} strokeWidth={2.8} />

      <div>
        <h3 className="text-[13px] font-bold text-black">{title}</h3>

        <div className="mt-2 space-y-0.5 text-[12px] leading-5 text-[#374151]">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}