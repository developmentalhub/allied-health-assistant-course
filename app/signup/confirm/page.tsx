import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MailCheck,
  RefreshCw,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Confirm Your Email | Allied Health Hive",
  description:
    "Confirm your email address to finish creating your Allied Health Hive learner account.",
};

type PageProps = {
  searchParams?: Promise<{
    redirect?: string;
  }>;
};

export default async function SignupConfirmPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const redirectTo = getSafeRedirect(params?.redirect);

  const loginHref = `/login?redirect=${encodeURIComponent(redirectTo)}`;

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 text-center md:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0f766e] text-white">
              <MailCheck size={31} />
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              Allied Health Hive | Workforce Development
            </p>

            <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Check your email to finish setting up your account.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#5f5b73]">
              We may have sent you an email asking you to confirm your email
              address before you can sign in.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5f5b73]">
              Open the confirmation email and select the verification link.
              You can then return to Allied Health Hive and sign in.
            </p>
          </div>

          <div className="grid gap-6 p-7 md:grid-cols-2 md:p-10">
            <section className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
                <Mail size={23} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                What to look for
              </h2>

              <div className="grid gap-3">
                <CheckItem text="An account confirmation or verification email" />
                <CheckItem text="A link asking you to confirm your email address" />
                <CheckItem text="The email address you entered during registration" />
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#3f5f5a]">
                The sender name may refer to Allied Health Hive or the secure
                account system used by the website.
              </p>
            </section>

            <section className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
                <RefreshCw size={22} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Email not showing?
              </h2>

              <div className="grid gap-3">
                <CheckItem text="Wait a few minutes and refresh your inbox" />
                <CheckItem text="Check your spam, junk and promotions folders" />
                <CheckItem text="Make sure you registered with the correct email" />
                <CheckItem text="Avoid creating several accounts with the same email" />
              </div>
            </section>
          </div>

          <div className="border-t border-[#e8e4de] p-7 md:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold">
                Already confirmed your email?
              </h2>

              <p className="mt-3 text-base leading-relaxed text-[#6b6880]">
                Continue to the sign-in page and enter the email and password
                you used when creating your account.
              </p>

              <Link
                href={loginHref}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Continue to sign in
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="bg-[#1e1b2e] p-7 text-white md:p-9">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold">
                Still unable to access your account?
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[#d9d7e5]">
                Contact Allied Health Hive support and include the email address
                you used to register. Do not include your password.
              </p>

              <a
                href="mailto:jess@spectrumvillage.com.au?subject=Allied Health Hive email confirmation help"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Contact account support
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2
        size={18}
        className="mt-0.5 shrink-0 text-[#0f766e]"
      />

      <p className="text-sm leading-relaxed text-[#3f5f5a]">{text}</p>
    </div>
  );
}

function getSafeRedirect(redirectValue?: string) {
  if (
    redirectValue &&
    redirectValue.startsWith("/") &&
    !redirectValue.startsWith("//")
  ) {
    return redirectValue;
  }

  return "/dashboard";
}