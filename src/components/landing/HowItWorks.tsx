import { ClipboardCheck, MapPinned, MailPlus } from "lucide-react";
import { COMPANY_NAME } from "./config";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "1. Kurz bewerben",
    text: "Du füllst unten das kurze Formular aus. Wir melden uns innerhalb von zwei Werktagen bei dir – telefonisch oder per Mail.",
  },
  {
    icon: MapPinned,
    title: "2. Briefe für deine Tour",
    text: `${COMPANY_NAME} gibt dir die Briefe für dein Zustellgebiet – abgestimmt auf deine normale Tour bei der Deutschen Post. Kein eigener Bezirk nötig.`,
  },
  {
    icon: MailPlus,
    title: "3. Einfach mit ausliefern",
    text: "Unsere Briefe laufen ganz normal mit in deine bestehende Zustellung. Du bringst sie zusammen mit deinen Post-Briefen raus – mehr Aufwand hat das nicht.",
  },
];

export default function HowItWorks() {
  return (
    <section id="ablauf" className="bg-card/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          So funktioniert's
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Drei Schritte – und dein Postboten-Job bleibt genau, was er ist.
        </p>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.title}
              className="relative rounded-lg border border-border/70 bg-card p-7 transition-colors hover:border-primary/50"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-7 h-1 w-10 -translate-y-1/2 rounded-full bg-primary"
              />
              <step.icon className="h-9 w-9 text-primary" strokeWidth={1.8} aria-hidden="true" />
              <h3 className="mt-5 text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
