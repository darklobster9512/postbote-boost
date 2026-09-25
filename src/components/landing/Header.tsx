import { COMPANY_NAME } from "./config";

const NAV_ITEMS = [
  { href: "#ablauf", label: "So funktioniert's" },
  { href: "#verguetung", label: "Vergütung" },
  { href: "#auszahlung", label: "Auszahlung" },
  { href: "#voraussetzungen", label: "Voraussetzungen" },
  { href: "#faq", label: "FAQ" },
];

export function Logo() {
  return (
    <a href="#top" aria-label={COMPANY_NAME}>
      <span className="text-lg font-bold tracking-[0.18em] text-foreground">
        {COMPANY_NAME.toUpperCase()}
      </span>
    </a>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Hauptnavigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#bewerbung"
          className="rounded-md bg-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Jetzt bewerben
        </a>
      </div>
    </header>
  );
}
