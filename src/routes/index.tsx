import { createFileRoute } from "@tanstack/react-router";

import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Compensation from "@/components/landing/Compensation";
import Requirements from "@/components/landing/Requirements";
import Faq from "@/components/landing/Faq";
import ApplicationForm from "@/components/landing/ApplicationForm";
import Footer from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Postboten gesucht: Zusatzverdienst mit Briefzustellung – ZusatzKurier",
      },
      {
        name: "description",
        content:
          "Du bist Postbote bei der Deutschen Post? Liefern unsere Briefe einfach auf deiner Tour mit und verdien dir jeden Monat etwas dazu. Kein Jobwechsel, keine Pakete – nur für angestellte Briefträger.",
      },
      {
        property: "og:title",
        content: "Postboten gesucht: Zusatzverdienst mit Briefzustellung – ZusatzKurier",
      },
      {
        property: "og:description",
        content:
          "Angestellte Postboten der Deutschen Post verdienen mit unserer Zusatzzustellung etwas dazu – ohne Jobwechsel, ohne Pakete. Jetzt kurz bewerben.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Compensation />
        <Requirements />
        <Faq />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
}
