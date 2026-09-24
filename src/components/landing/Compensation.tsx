import { CalendarCheck, HandCoins, PiggyBank } from "lucide-react";
import { PAY_INTERVAL, PAY_PER_TOUR } from "./config";

const BENEFITS = [
  {
    icon: PiggyBank,
    title: "Dein Gehalt bleibt unangetastet",
    text: "Du bleibst vollständig bei der Deutschen Post angestellt. Unser Verdienst kommt einfach oben drauf.",
  },
  {
    icon: CalendarCheck,
    title: "So oft du willst",
    text: "Du entscheidest, wie oft du unsere Briefe mitnimmst – jeden Zustelltag, nur an bestimmten Tagen oder gar nicht in stressigen Wochen.",
  },
  {
    icon: HandCoins,
    title: "Faire, transparente Abrechnung",
    text: "Klar vereinbarter Satz, pünktliche Auszahlung. Keine versteckten Kosten, keine Gebühren für dich.",
  },
];

export default function Compensation() {
  return (
    <section id="verguetung" className="relative overflow-hidden py-20">
      <div
        aria-hidden="true"
        className="dhl-stripes pointer-events-none absolute inset-y-0 right-0 hidden w-24 opacity-25 lg:block"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Deine Vergütung
            </p>
            {/* TODO: Konkreten Betrag in src/components/landing/config.ts eintragen */}
            <p className="mt-4 text-7xl font-extrabold tracking-tight text-primary sm:text-8xl">
              {PAY_PER_TOUR}
            </p>
            <p className="mt-2 text-xl font-semibold text-foreground">{PAY_INTERVAL}</p>
            <p className="mx-auto mt-4 max-w-sm text-sm text-muted-foreground lg:mx-0">
              Genauer Betrag &amp; Abrechnung klären wir persönlich im Erstgespräch – abhängig
              von deinem Bezirk und der Menge.
            </p>
          </div>

          <ul className="space-y-5">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit.title}
                className="flex gap-5 rounded-lg border border-border/70 bg-card p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/15">
                  <benefit.icon className="h-6 w-6 text-primary" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{benefit.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">{benefit.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
