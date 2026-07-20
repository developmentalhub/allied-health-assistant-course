"use client";

import { useState } from "react";
import Link from "next/link";

const pathways = [
  "Allied Health Assistant pathway",
  "Educator pathway",
  "Resource shop updates",
  "Reflective practice options",
  "Not sure yet",
];

const interests = [
  "Free webinar updates",
  "Future AHA resources",
  "Reflective PD options",
  "Resource shop releases",
  "Custom build / request a quote",
  "AHA course pathway updates",
  "Community hub",
  "Educator pathway",
  "Joyful Educator tools",
  "Business partnership module",
  "Other",
];

type WaitlistForm = {
  name: string;
  email: string;
  heard_from: string;
  pathway: string;
  interest: string;
  message: string;
};

export default function WaitlistPage() {
  const [form, setForm] = useState<WaitlistForm>({
    name: "",
    email: "",
    heard_from: "",
    pathway: "",
    interest: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          pathway: form.pathway,
          interest: form.interest,
          message: form.heard_from
            ? `Heard from: ${form.heard_from}\n\n${form.message}`
            : form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
        <section className="mx-auto max-w-3xl rounded-3xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm md:p-12">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            You&apos;re on the list
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            Thanks for joining the academy waitlist
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-[#5f5b73]">
            We&apos;ll let you know when future AHA resources, webinar updates,
            reflective PD options, resource shop releases or course pathway
            updates are ready.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Back to academy
            </Link>

            <Link
              href="/community"
              className="rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-7 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
            >
              View community hub
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        <div className="mb-10">
          <Link
            href="/"
            className="text-base font-semibold text-[#0f766e] hover:underline"
          >
            Back to academy
          </Link>
        </div>

        <header className="mb-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Academy waitlist
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Tell us what you&apos;re interested in
          </h1>

          <p className="text-xl leading-relaxed text-[#5f5b73]">
            Join the waitlist for future AHA resources, free webinar updates,
            reflective PD options, resource shop releases and course pathway
            updates.
          </p>
        </header>

        <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-lg font-semibold text-[#1e1b2e]"
              >
                Your name
              </label>

              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Jane Smith"
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-4 text-lg text-[#1e1b2e] outline-none transition focus:border-[#0f766e]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-lg font-semibold text-[#1e1b2e]"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="jane@example.com"
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-4 text-lg text-[#1e1b2e] outline-none transition focus:border-[#0f766e]"
              />
            </div>

            <div>
              <label
                htmlFor="heard_from"
                className="mb-2 block text-lg font-semibold text-[#1e1b2e]"
              >
                How did you hear about the academy?{" "}
                <span className="font-normal text-[#5f5b73]">(optional)</span>
              </label>

              <input
                id="heard_from"
                name="heard_from"
                value={form.heard_from}
                onChange={handleChange}
                placeholder="Example: Instagram, email, colleague, training event"
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-4 text-lg text-[#1e1b2e] outline-none transition focus:border-[#0f766e]"
              />
            </div>

            <div>
              <label
                htmlFor="pathway"
                className="mb-2 block text-lg font-semibold text-[#1e1b2e]"
              >
                Which pathway are you interested in?
              </label>

              <select
                id="pathway"
                name="pathway"
                value={form.pathway}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-4 text-lg text-[#1e1b2e] outline-none transition focus:border-[#0f766e]"
              >
                <option value="">Select a pathway</option>
                {pathways.map((pathway) => (
                  <option key={pathway} value={pathway}>
                    {pathway}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="interest"
                className="mb-2 block text-lg font-semibold text-[#1e1b2e]"
              >
                What are you most interested in?
              </label>

              <select
                id="interest"
                name="interest"
                value={form.interest}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-4 text-lg text-[#1e1b2e] outline-none transition focus:border-[#0f766e]"
              >
                <option value="">Select an option</option>
                {interests.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-lg font-semibold text-[#1e1b2e]"
              >
                Anything else you&apos;d like us to know?{" "}
                <span className="font-normal text-[#5f5b73]">(optional)</span>
              </label>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Add anything helpful here."
                className="w-full resize-y rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-4 text-lg leading-relaxed text-[#1e1b2e] outline-none transition focus:border-[#0f766e]"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0f766e] px-7 py-4 text-lg font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Submitting..." : "Join the waitlist"}
            </button>
          </form>
        </section>

        <p className="mt-6 text-center text-base leading-relaxed text-[#5f5b73]">
          We&apos;ll only contact you about academy updates connected to your
          interest.
        </p>
      </section>
    </main>
  );
}