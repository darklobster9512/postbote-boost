import dpLogo from "@/assets/deutsche-post-logo.svg";
import { PAY_AMOUNT, PAY_INTERVAL, PAY_PREFIX, PAYOUT_NOTE } from "./config";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Diagonale Deko-Streifen im Hintergrund */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[520px] w-[160px] rotate-[24deg] rounded-full bg-primary/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-40 h-[420px] w-[110px] rotate-[24deg] rounded-full bg-destructive/15"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 lg:pt-28 lg:pb-24">
        <img
          src={dpLogo}
          alt="Deutsche Post"
          className="w-[200px] max-w-full rounded-xl sm:w-[260px]"
          width={984}
          height={218}
        />

        <h1 className="mt-8 w-full max-w-5xl text-balance text-4xl leading-[1.12] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
          <span className="block lg:whitespace-nowrap">Es ändert sich nichts.</span>
          <span className="block text-primary lg:whitespace-nowrap">
            Nur dein Einkommen wächst.
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
