import { CONTACT_EMAIL, CONTACT_PHONE, PAYOUT_NOTE } from "./config";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div aria-hidden="true" className="dhl-stripes h-2 w-full opacity-60" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
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
            {/* TODO: Echte Kontaktdaten in src/components/landing/config.ts eintragen */}
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                Telefon:{" "}
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="hover:text-primary">
                  {CONTACT_PHONE}
                </a>
              </li>
              <li>
                E-Mail:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-foreground">
              Rechtliches
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Impressum
                </a>{" "}
                <span className="text-xs">(Platzhalter)</span>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Datenschutzerklärung
                </a>{" "}
                <span className="text-xs">(Platzhalter)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Hinweis: Dies ist ein unabhängiges, eigenständiges Angebot und steht in keiner
            Verbindung zur Deutschen Post AG oder DHL. Die Gestaltung dieser Seite ist eine reine
            stilistische Anlehnung. Alle Angaben ohne Gewähr.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            © {new Date().getFullYear()} ZusatzKurier. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
