import heroImage from "@/assets/hero-postbote.jpg";
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

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pt-20 lg:pb-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            Nur für Postboten der Deutschen Post
          </p>

          <h1 className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Du bringst sowieso Briefe raus.{" "}
            <span className="text-primary">Verdien dir jetzt etwas dazu.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Du bist bereits als Postbote/Briefträger bei der Deutschen Post angestellt? Dann
            liefern unsere Briefe einfach mit auf deiner normalen Tour – und du verdienst dir{" "}
            {PAY_PREFIX} {PAY_AMOUNT} {PAY_INTERVAL} extra dazu. Kein Jobwechsel. Keine Pakete. Kein
            zweiter Arbeitgeber im Weg.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {["Steuerfrei", "Bar oder Krypto", "Ohne Post-Abrechnung"].map((item) => (
              <li
                key={item}
                className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
              >
                {item}
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-border/60 pt-8">
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
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Pakete
              </dt>
              <dd className="mt-1 text-xl font-extrabold leading-tight text-foreground">Nie</dd>
            </div>
          </dl>
          <p className="mt-3 max-w-lg text-xs text-muted-foreground">{PAYOUT_NOTE}</p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-3 -rotate-2 rounded-2xl bg-primary/15"
          />
          <img
            src={heroImage}
            alt="Postbote mit gelber Briefträgertasche voller Briefe"
            width={1024}
            height={1280}
            className="relative rotate-1 rounded-2xl border border-border/60 object-cover shadow-2xl shadow-black/50"
          />
        </div>
      </div>

      <div aria-hidden="true" className="dhl-stripes h-2.5 w-full opacity-90" />
    </section>
  );
}
