import { Banknote, Bitcoin, EyeOff, Percent } from "lucide-react";
import { PAYOUT_CRYPTO_OPTIONS } from "./config";

const PAYOUT_OPTIONS = [
  {
    icon: Banknote,
    title: "Bar",
    text: "Auszahlung in bar – direkt an dich, ohne Umweg über Konten oder Gehaltsabrechnung.",
  },
  {
    icon: Bitcoin,
    title: "Krypto",
    text: `${PAYOUT_CRYPTO_OPTIONS}. Du sagst uns einfach, wohin wir auszahlen sollen.`,
  },
  {
    icon: Percent,
    title: "Steuerfrei",
    text: "Deine Vergütung ist steuerfrei – du bekommst den vollen vereinbarten Betrag, ohne Abzug.",
  },
  {
    icon: EyeOff,
    title: "Ohne Post-Abrechnung",
    text: "Nichts davon läuft über deine Gehaltsabrechnung bei der Deutschen Post. Dein dortiges Gehalt bleibt unberührt.",
  },
];

export default function Payout() {
  return (
    <section id="auszahlung" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Auszahlung
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Bar oder Krypto.{" "}
          <span className="text-primary">Steuerfrei.</span>
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Du entscheidest, wie du dein Geld bekommst – nicht wir.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PAYOUT_OPTIONS.map((option) => (
            <div
              key={option.title}
              className="rounded-lg border border-border/70 bg-card p-6 transition-colors hover:border-primary/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/15">
                <option.icon
                  className="h-6 w-6 text-primary"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{option.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{option.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-lg border border-primary/50 bg-primary/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-bold text-foreground">
            Bar, Krypto, steuerfrei – ohne Abrechnung über die Deutsche Post.
          </p>
          <a
            href="#bewerbung"
            className="shrink-0 rounded-md bg-primary px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Jetzt bewerben
          </a>
        </div>
      </div>
    </section>
  );
}
