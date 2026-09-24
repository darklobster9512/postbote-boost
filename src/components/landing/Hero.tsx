import posthornAsset from "@/assets/posthorn.svg.asset.json";
import bitcoinAsset from "@/assets/bitcoin.webp.asset.json";
import { PAY_AMOUNT, PAY_INTERVAL, PAY_PREFIX, PAYOUT_NOTE } from "./config";

const POSTHORN_URL = posthornAsset.url;
const BITCOIN_URL = bitcoinAsset.url;

type BubbleIcon = "posthorn" | "bitcoin";

interface Bubble {
  icon: BubbleIcon;
  /** Prozentuale Position innerhalb der Hero-Section */
  top: string;
  /** Auf welcher Seite der Blase relativ zum Content */
  side: "left" | "right";
  /** Abstand der Blasenaußenseite von der Bildschirmmitte in px */
  offset: number;
  /** Größe in px */
  size: number;
  /** Animationsdauer in s */
  duration: number;
  /** Animations-Verzögerung in s */
  delay: number;
  /** Sichtbarkeit: ab welcher Tailwind-Breakpoint-Stufe die Bubble erscheint */
  minScreen: "lg" | "xl";
  /** Transparenz für Tiefenwirkung */
  opacity: number;
}

// Nah am zentrierten Content verankert; die Mitte bleibt frei.
const BUBBLES: Bubble[] = [
  // Linke Seite
  { icon: "posthorn", top: "14%", side: "left", offset: 396, size: 84, duration: 8, delay: 0, minScreen: "lg", opacity: 0.9 },
  { icon: "bitcoin", top: "36%", side: "left", offset: 428, size: 56, duration: 9.5, delay: 1.2, minScreen: "lg", opacity: 0.6 },
  { icon: "posthorn", top: "58%", side: "left", offset: 400, size: 64, duration: 7, delay: 0.6, minScreen: "lg", opacity: 0.8 },
  { icon: "bitcoin", top: "80%", side: "left", offset: 452, size: 48, duration: 10, delay: 2.1, minScreen: "lg", opacity: 0.55 },
  // Rechte Seite
  { icon: "bitcoin", top: "12%", side: "right", offset: 408, size: 64, duration: 8.5, delay: 0.3, minScreen: "lg", opacity: 0.85 },
  { icon: "posthorn", top: "33%", side: "right", offset: 396, size: 84, duration: 7.5, delay: 1.7, minScreen: "lg", opacity: 0.65 },
  { icon: "bitcoin", top: "55%", side: "right", offset: 424, size: 56, duration: 9, delay: 0.9, minScreen: "lg", opacity: 0.95 },
  { icon: "posthorn", top: "78%", side: "right", offset: 450, size: 48, duration: 6.5, delay: 2.6, minScreen: "lg", opacity: 0.5 },
  // Oberer Bereich
  { icon: "posthorn", top: "4%", side: "left", offset: 445, size: 44, duration: 9.5, delay: 0.4, minScreen: "xl", opacity: 0.6 },
  { icon: "bitcoin", top: "2%", side: "right", offset: 470, size: 56, duration: 7.2, delay: 1.4, minScreen: "xl", opacity: 0.8 },
  { icon: "posthorn", top: "9%", side: "right", offset: 505, size: 40, duration: 10.5, delay: 2.9, minScreen: "xl", opacity: 0.45 },
  // Unterer Bereich
  { icon: "bitcoin", top: "86%", side: "left", offset: 470, size: 44, duration: 8.8, delay: 0.8, minScreen: "xl", opacity: 0.7 },
  { icon: "posthorn", top: "88%", side: "right", offset: 505, size: 56, duration: 9.8, delay: 1.9, minScreen: "xl", opacity: 0.55 },
];

const ICON_URLS: Record<BubbleIcon, string> = {
  posthorn: POSTHORN_URL,
  bitcoin: BITCOIN_URL,
};

const MIN_SCREEN_CLASSES: Record<Bubble["minScreen"], string> = {
  lg: "hidden lg:block",
  xl: "hidden xl:block",
};

function BubbleItem({ bubble }: { bubble: Bubble }) {
  const anchor =
    bubble.side === "left"
      ? { right: `calc(50% + ${bubble.offset}px)` }
      : { left: `calc(50% + ${bubble.offset}px)` };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${MIN_SCREEN_CLASSES[bubble.minScreen]}`}
      style={{ top: bubble.top, ...anchor, opacity: bubble.opacity }}
    >
      <div
        className="overflow-hidden rounded-full border border-border/40 shadow-lg shadow-black/40"
        style={{
          width: bubble.size,
          height: bubble.size,
          animation: `bubble-float ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
        }}
      >
        <img
          src={ICON_URLS[bubble.icon]}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Floating Icon-Bubbles um den Content */}
      {BUBBLES.map((bubble, i) => (
        <BubbleItem key={i} bubble={bubble} />
      ))}

      {/* Diagonale Deko-Streifen im Hintergrund */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[520px] w-[160px] rotate-[24deg] rounded-full bg-primary/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-40 h-[420px] w-[110px] rotate-[24deg] rounded-full bg-destructive/15"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 lg:pt-28 lg:pb-24">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          Nur für Postboten der Deutschen Post
        </p>

        <h1 className="mt-6 w-full max-w-5xl text-4xl leading-[1.12] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
          <span className="block lg:whitespace-nowrap">Du bringst sowieso Briefe raus.</span>
          <span className="block text-primary lg:whitespace-nowrap">
            Verdien dir jetzt etwas dazu.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Du bist bereits als Postbote/Briefträger bei der Deutschen Post angestellt? Dann
          liefern unsere Briefe einfach mit auf deiner normalen Tour – und du verdienst dir{" "}
          {PAY_PREFIX} {PAY_AMOUNT} {PAY_INTERVAL} extra dazu. Kein Jobwechsel. Keine Pakete. Kein
          zweiter Arbeitgeber im Weg.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#bewerbung"
            className="rounded-md bg-primary px-7 py-3.5 text-base font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Jetzt bewerben
          </a>
          <a
            href="#ablauf"
            className="rounded-md border border-border px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            So funktioniert's
          </a>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
          {["Steuerfrei", "Bar oder Krypto", "Ohne Post-Abrechnung"].map((item) => (
            <li
              key={item}
              className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
            >
              {item}
            </li>
          ))}
        </ul>

        <dl className="mt-10 grid w-full max-w-md grid-cols-2 gap-6 border-t border-border/60 pt-8">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Verdienst
            </dt>
            <dd className="mt-1 text-xl font-extrabold leading-tight text-primary">
              <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {PAY_PREFIX}
              </span>
              {PAY_AMOUNT}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Auszahlung
            </dt>
            <dd className="mt-1 text-xl font-extrabold leading-tight text-foreground">
              Bar &amp; Krypto
            </dd>
          </div>
        </dl>
        <p className="mt-3 max-w-lg text-xs text-muted-foreground">{PAYOUT_NOTE}</p>
      </div>

      <div aria-hidden="true" className="dhl-stripes h-2.5 w-full opacity-90" />
    </section>
  );
}
