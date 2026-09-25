import telegramLogo from "@/assets/telegram.png.asset.json";
import { PAYOUT_NOTE, TELEGRAM_HANDLE, TELEGRAM_URL } from "./config";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div aria-hidden="true" className="dhl-stripes h-2 w-full opacity-60" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Zusatzverdienst für Postboten und Briefträger der Deutschen Post – unsere Briefe
              laufen einfach mit auf deiner Tour.
            </p>
            <p className="mt-3 max-w-xs text-sm font-semibold text-primary">{PAYOUT_NOTE}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-foreground">
              Kontakt
            </h3>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 rounded-lg border border-border/70 bg-card px-4 py-3 transition-colors hover:border-primary/60"
            >
              <img
                src={telegramLogo.url}
                alt=""
                width={480}
                height={480}
                className="h-7 w-7 shrink-0"
              />
              <span className="text-sm font-bold text-foreground">{TELEGRAM_HANDLE}</span>
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ZusatzKurier. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
