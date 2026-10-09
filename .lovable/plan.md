# Neue Seite /runner: schwarz, nur Telegram-Kontakt

Eine eigene Seite unter `/runner`. Sie ist komplett schwarz und zeigt nur zwei Dinge: die Zeile **„Kontaktiere uns über Telegram“** und darunter den Telegram-Knopf, genau so wie er unten im Fußbereich steht (Telegram-Icon + **@call_agency**, Weiterleitung nach https://t.me/call_agency in einem neuen Tab).

Kopfleiste, Menü, Fußbereich, Bewerbungsformular und alle其它 Inhalte der Startseite erscheinen dort nicht.

## Ergebnis

- `/runner` ist über die Adresse direkt erreichbar.
- Hintergrund: reines Schwarz, die ganze Seite, auch unterhalb des Inhalts.
- Mittig steht die Überschrift **„Kontaktiere uns über Telegram“**.
- Darunter der Knopf: Telegram-Icon links, Schriftzug **@call_agency** rechts, klickbar, öffnet https://t.me/call_agency in einem neuen Tab.
- Der Knopf sieht exakt so aus wie im Fußbereich der Startseite (gleiche Größe, gleicher Rahmen, gleiche Reaktion beim Drüberfahren).
- Auf dem Handy同样 mittig und vollständig sichtbar, nichts abgeschnitten.

## Technische Details

- Neue Datei `src/routes/runner.tsx` mit `createFileRoute("/runner")`. Der Router legt die Adresse aus dem Dateinamen an; `src/routeTree.gen.ts` wird automatisch neu geschrieben, daran wird nichts von Hand geändert.
- Reines Schwarz: In `src/styles.css` kommt in `:root` und `.dark` die Variable `--void: #000000;` und im `@theme inline`-Block die Zuordnung `--color-void: var(--void);`. Die neue Seite nutzt dann `bg-void`. So bleibt die Farbe ein Design-Merkmal und wird nicht als roher Hexwert ins Bauteil geschrieben.
- Inhalt: ein Vollbild-Bereich, alles mittig, Überschrift in normaler Vordergründfarbe, danach der Knopf.
- Der Knopf wird in der neuen Seite im gleichen Markup nachgebaut wie im Fußbereich: `<a>` mit `href` aus `TELEGRAM_URL`, `target="_blank"`, `rel="noopener noreferrer"`, Telegram-Bild aus `public/images/telegram.png` und Schriftzug aus `TELEGRAM_HANDLE`. Beide Werte kommen weiterhin aus `src/components/landing/config.ts`, damit Name und Link nur einmal gepflegt werden.
- Der Fußbereich selbst wird nicht angefasst; die Startseite bleibt völlig unverändert.
- `head()` für die neue Seite: eigener Titel („Kontakt über Telegram – ZusatzKurier“), eigene Beschreibung, eigene og-Felder, `og:type` website, `twitter:card` summary, dazu `robots: noindex` – die Seite ist für direkte Besuche gedacht und soll nicht in der Suche auftauchen. (Lass es mich wissen, wenn sie suchbar bleiben soll.)
- Das Meta-Pixel läuft über die gemeinsame Grundseite mit, auf `/runner` zählt also ein Seitenaufruf mit. Ein zusätzliches Ereignis beim Klick auf den Telegram-Knopf ist nicht enthalten.

## Prüfung

- Build-Log kontrollieren (`/tmp/observability/build-errors.log`).
- Laufende Vorschau bei 1280 px und 393 px: Hintergrund gemessen wirklich schwarz, Überschrift und Knopf mittig, Knopf-Link zeigt exakt auf `https://t.me/call_agency` und öffnet neuen Tab, Icon geladen, keine Kopf-/Fußbereiche zu sehen, keine Browser-Fehler.
- Startseiten-Adressen `/`, `/auth`, `/admin` weiterhin erreichbar.

## Offen (unverändert)

Echte Firmendaten fehlen weiterhin: Firmenname, Telefon, E-Mail, Impressum und Datenschutz.
