import { createFileRoute } from "@tanstack/react-router";

import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Compensation from "@/components/landing/Compensation";
import Payout from "@/components/landing/Payout";
import Requirements from "@/components/landing/Requirements";
import Faq from "@/components/landing/Faq";
import ApplicationForm from "@/components/landing/ApplicationForm";
import Footer from "@/components/landing/Footer";
import Reveal from "@/components/landing/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Postboten gesucht: bis zu 10.000 € im Monat – bar oder in Krypto, steuerfrei",
      },
      {
        name: "description",
        content:
          "Du bist Postbote bei der Deutschen Post? Liefere unsere Briefe einfach auf deiner Tour mit und verdien dir bis zu 10.000 € im Monat dazu. Auszahlung bar oder in Krypto, steuerfrei und ohne Abrechnung über die Post. Kein Jobwechsel, keine Pakete.",
      },
      {
        property: "og:title",
        content: "Postboten gesucht: bis zu 10.000 € im Monat – bar oder in Krypto, steuerfrei",
      },
      {
        property: "og:description",
        content:
          "Angestellte Postboten der Deutschen Post verdienen mit unserer Zusatzzustellung bis zu 10.000 € im Monat dazu – Auszahlung bar oder in Krypto, steuerfrei, ohne Jobwechsel und ohne Pakete.",
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
        <Reveal><Hero /></Reveal>
        <Reveal><HowItWorks /></Reveal>
        <Reveal><Compensation /></Reveal>
        <Reveal><Payout /></Reveal>
        <Reveal><Requirements /></Reveal>
      <Reveal><ApplicationForm /></Reveal>
      <Reveal><Faq /></Reveal>
      </main>
      <Reveal><Footer /></Reveal>
    </div>
  );
}
