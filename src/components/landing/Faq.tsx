import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PAYOUT_CRYPTO_OPTIONS } from "./config";

const FAQ_ITEMS = [
  {
    question: "Wie werde ich bezahlt?",
    answer:
      "Bar oder in Krypto – ganz wie du möchtest. Die Auszahlung ist steuerfrei und läuft komplett ohne Abrechnung über die Deutsche Post: deine Gehaltsabrechnung dort bleibt völlig unberührt.",
  },
  {
    question: "Welche Krypto-Arten sind möglich?",
    answer: `${PAYOUT_CRYPTO_OPTIONS}. Du sagst uns einfach deine Wallet-Adresse – wir zahlen dorthin aus.`,
  },
  {
    question: "Muss ich bei der Deutschen Post kündigen?",
    answer:
      "Nein. Du bleibst komplett angestellt bei der Deutschen Post – gleicher Job, gleiches Gehalt, gleiche Tour. Unsere Zusatzzustellung ist rein vertraglich ein Zusatzverdienst.",
  },
  {
    question: "Ist das ein Jobwechsel oder eine Nebenbeschäftigung?",
    answer:
      "Es ist reiner Zusatzverdienst neben deinem bestehenden Postboten-Job. Deine Nebentätigkeit meldest du wie üblich bei der Deutschen Post an – unsere Vergütung läuft getrennt davon, bar oder in Krypto.",
  },
  {
    question: "Brauche ich einen eigenen Zustellbezirk?",
    answer:
      "Nein. Wir richten unsere Briefe nach deiner bestehenden Tour bei der Deutschen Post aus. Du lieferst sie einfach zusammen mit deinen gewohnten Briefen aus.",
  },
  {
    question: "Muss ich Pakete mit ausliefern?",
    answer:
      "Nein, nie. Es geht ausschließlich um Briefe. Wir suchen bewusst keine Paketzusteller und bieten auch keine Paketzustellung an.",
  },
  {
    question: "Was passiert, wenn ich mal Urlaub habe oder krank bin?",
    answer:
      "Überhaupt kein Problem. Du sagst uns einfach vorher Bescheid – dann lassen wir die Briefe für diese Zeit anderweitig zustellen. Es gibt keine Mindestpflicht.",
  },
  {
    question: "Ist das eine offizielle Seite der Deutschen Post oder DHL?",
    answer:
      "Nein. Wir sind ein unabhängiges Zustellunternehmen und stehen in keiner Verbindung zur Deutschen Post AG oder DHL. Der Stil dieser Seite ist eine reine gestalterische Anlehnung.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-${question.length}-${question.slice(0, 8).replace(/\W/g, "")}`;

  return (
    <div className="rounded-lg border border-border/70 bg-card">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span className="text-lg font-semibold text-foreground">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div id={panelId} hidden={!open} className="px-6 pb-6">
        <p className="leading-relaxed text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Häufige Fragen
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Die wichtigsten Antworten auf einen Blick.
        </p>
        <div className="mt-10 space-y-4">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
