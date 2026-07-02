"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <div className="mb-10">
          <Link
            href="/"
            className="text-base font-semibold text-[#0f766e] hover:underline"
          >
            Back to academy
          </Link>
        </div>

        <header className="mb-12 max-w-3xl">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Contact
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Get in touch
          </h1>

          <p className="text-xl leading-relaxed text-[#5f5b73]">
            Send a message about the academy, access options, technical issues,
            contributor enquiries, or future training and resource areas.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-5">
            <a
              href="mailto:robyn@playmoveimprove.com.au"
              className="block rounded-3xl border border-[#e8e4de] bg-white p-6 no-underline shadow-sm transition hover:border-[#0f766e]"
            >
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#5f5b73]">
                Email
              </p>
              <p className="text-lg font-semibold text-[#0f766e]">
                robyn@playmoveimprove.com.au
              </p>
            </a>

            <a
              href="https://www.instagram.com/playmoveimprove"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-3xl border border-[#e8e4de] bg-white p-6 no-underline shadow-sm transition hover:border-[#0f766e]"
            >
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#5f5b73]">
                Instagram
              </p>
              <p className="text-lg font-semibold text-[#1e1b2e]">
                @playmoveimprove
              </p>
            </a>

            <a
              href="https://www.facebook.com/playmoveimprove"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-3xl border border-[#e8e4de] bg-white p-6 no-underline shadow-sm transition hover:border-[#0f766e]"
            >
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#5f5b73]">
                Facebook
              </p>
              <p className="text-lg font-semibold text-[#1e1b2e]">
                @playmoveimprove
              </p>
            </a>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#f0fdfa] p-6">
              <h2 className="mb-3 text-2xl font-bold">
                Not ready to message?
              </h2>
              <p className="mb-5 text-lg leading-relaxed text-[#5f5b73]">
                Join the waitlist for updates as the academy opens new areas.
              </p>
              <Link
                href="/waitlist"
                className="inline-flex rounded-full bg-[#0f766e] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Join the waitlist
              </Link>
            </div>
          </aside>

          {success ? (
            <section className="rounded-3xl border border-[#bbf7d0] bg-[#f0fdf4] p-8 text-center md:p-12">
              <h2 className="mb-4 text-3xl font-bold text-[#166534]">
                Message sent
              </h2>

              <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#166534]">
                Thank you. Your message has been sent to Robyn at Play Move
                Improve.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="rounded-full bg-[#166534] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#14532d]"
                >
                  Back to academy
                </Link>

                <Link
                  href="/community"
                  className="rounded-full border border-[#166534] bg-white px-6 py-4 text-base font-semibold text-[#166534] transition hover:bg-[#dcfce7]"
                >
                  View community hub
                </Link>
              </div>
            </section>
          ) : (
            <section className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
              <h2 className="mb-6 text-3xl font-bold">
                Send a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-base font-semibold text-[#1e1b2e]">
                      Your name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                      className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-5 py-4 text-base text-[#1e1b2e] outline-none focus:border-[#0f766e]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-base font-semibold text-[#1e1b2e]">
                      Email address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@example.com"
                      className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-5 py-4 text-base text-[#1e1b2e] outline-none focus:border-[#0f766e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-base font-semibold text-[#1e1b2e]">
                    What is this about?
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-5 py-4 text-base text-[#1e1b2e] outline-none focus:border-[#0f766e]"
                  >
                    <option value="">Select a topic</option>
                    <option value="Academy access">Academy access</option>
                    <option value="Allied Health pathway">
                      Allied Health pathway
                    </option>
                    <option value="Educator pathway">Educator pathway</option>
                    <option value="Community or live sessions">
                      Community or live sessions
                    </option>
                    <option value="Technical issue">Technical issue</option>
                    <option value="Contributor enquiry">
                      Contributor enquiry
                    </option>
                    <option value="Something else">Something else</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-base font-semibold text-[#1e1b2e]">
                    Your message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us what you need help with."
                    className="w-full resize-y rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-5 py-4 text-base leading-relaxed text-[#1e1b2e] outline-none focus:border-[#0f766e]"
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-[#fecaca] bg-[#fef2f2] px-5 py-4 text-base text-[#b91c1c]">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer rounded-full border-none bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send message"}
                </button>
              </form>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}