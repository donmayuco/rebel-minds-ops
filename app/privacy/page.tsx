import type { Metadata } from "next";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Rebel Minds OPS",
  description:
    "How Rebel Minds OPS collects, uses, and protects the information you share through our contact and workshop intake forms. Plain-English, no data sold.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

function Section({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t py-10" style={{ borderColor: "rgba(233,237,244,0.10)" }}>
      <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[#8fa0b3]">{label}</p>
      <h2 className="serif mt-3 text-2xl font-medium text-[#e9edf4]">{title}</h2>
      <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-[#8fa0b3]">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0c131e]">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
          Rebel Minds OPS
        </p>
        <h1 className="serif mt-4 text-4xl font-medium leading-[1.08] tracking-tight text-[#e9edf4]">
          Privacy Policy
        </h1>
        <p className="mt-5 text-[1.02rem] leading-relaxed text-[#8fa0b3]">
          Plain English, no fine-print games. This page explains what we collect when
          you reach out, how we use it, and how you get it deleted. We deliver our
          systems remotely to businesses across the United States, and we handle your
          information the same careful way whether you are down the street or across
          the country.
        </p>
        <p className="mt-3 text-sm text-[#8fa0b3]">Last updated: July 2026.</p>

        <Section label="What we collect" title="Only what you hand us">
          <p>
            We collect the details you enter into our contact form and our security
            workshop intake form: your name or business name, email address, phone
            number, industry, and a short note about what you want to improve. We do
            not ask for sensitive personal data, and our public forms are not intended
            for protected health information (PHI). If a HIPAA-aware engagement calls
            for it, PHI is handled inside a separate, agreement-covered system, never
            through this website.
          </p>
          <p>
            Like most sites, our host records standard technical data (such as browser
            type and general location) and we use privacy-conscious product analytics
            to understand which pages are useful.
          </p>
        </Section>

        <Section label="How we use it" title="To answer you, and to serve you">
          <p>
            We use your contact details for one purpose: to respond to your request,
            schedule your free Ops Scan, and deliver any work you engage us for. Your
            submission is routed into our internal client-intake records and triggers
            an email notification to our team so nothing slips.
          </p>
          <p>
            We do not sell your information. We do not share it with advertisers or
            data brokers. We do not add you to unrelated marketing lists.
          </p>
        </Section>

        <Section label="Retention" title="Kept as long as it is useful, deleted on request">
          <p>
            We keep your information for as long as we need it to respond to you and,
            if you become a client, to deliver and support your systems. You can ask us
            to delete your information at any time and we will remove it from our
            active records.
          </p>
        </Section>

        <Section label="Third parties" title="The tools that carry your message">
          <p>
            A small number of trusted service providers help us operate this site and
            handle your submission, including our records platform (Airtable), our
            hosting and analytics provider (Vercel), and our email provider. These
            providers process data only to provide their service to us. For engagements
            that involve regulated data, every vendor inside the compliance boundary
            operates under the appropriate agreement.
          </p>
        </Section>

        <Section label="Contact" title="Reach a human">
          <p>
            Questions about your data, or want it deleted? Email{" "}
            <a
              href="mailto:hello@rebelmindsops.com"
              className="text-[#7fd7e2] underline-offset-2 hover:underline"
            >
              hello@rebelmindsops.com
            </a>{" "}
            or call{" "}
            <a href="tel:+19565204123" className="text-[#7fd7e2] underline-offset-2 hover:underline">
              (956) 520-4123
            </a>
            . We will get back to you.
          </p>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
