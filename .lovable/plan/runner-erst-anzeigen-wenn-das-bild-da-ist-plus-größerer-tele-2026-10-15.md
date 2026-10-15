# /runner: erst anzeigen, wenn das Bild da ist – plus größerer Telegram-Knopf

## Was du bekommst

- Beim Öffnen von /runner siehst du zuerst eine komplett schwarze Seite mit einem gelben Ladekreis in der Mitte.
- Erst wenn das Bild wirklich geladen ist, erscheint der Inhalt: Bild, „Kontaktiere uns über Telegram" und der Telegram-Knopf – zusammen, in einem Moment.
- Der Telegram-Knopf wird deutlich größer: mehr Innenabstand, größeres Telegram-Icon, größere Schrift.

## Verhalten in Sonderfällen

- Ist gar kein Bild hinterlegt: Inhalt erscheint sofort, kein Dauer-Ladekreis.
- Ist ein Bild hinterlegt, lädt aber nicht (z. B. Netzwerkfehler): Inhalt erscheint nach spätestens 6 Sekunden trotzdem – die Seite bleibt also nie blockiert.
- Lädt das Bild normal: Inhalt erscheint direkt nach dem Laden.

## Technisches

- `src/routes/runner.tsx`:
  - Neues Zustandsfeld `ready`. Startzustand: `false` wenn ein Bild hinterlegt ist, `true` wenn keines hinterlegt ist.
  - Sobald die Bild-Adresse aus der Datenbank feststeht, wird das Bild im Voraus geladen (`new Image()`), mit `onload` und `onerror` als Abbruch. Ein 6-Sekunden-Zeitgeber setzt `ready` notfalls auf `true`.
  - Solange `ready` false ist, rendert die Seite nur den mittig sitzenden Ladekreis auf schwarzem Grund (Hintergrund bleibt wie bisher über `--pure-black`, auch per Körper-Farbe gesetzt).
  - Wenn `ready` true ist, rendert die Seite Bild, Überschrift und Knopf wie bisher.
- Ladekreis: ein Kreis aus `border` mit `animate-spin`, Farbwerte über `border-primary` / `border-primary/25` – kein hartcodierter Farbwert, passt sich dem Gelb-Ton an. Kein zusätzliches CSS nötig (`animate-spin` ist in Tailwind v4 enthalten).
- Knopf-Größe in `src/routes/runner.tsx`: Innenabstand von `px-5 py-4` auf `px-8 py-6`, Icon von `h-7 w-7` auf `h-10 w-10`, Schrift von `text-sm` auf `text-lg`, Abstand zwischen Icon und Text von `gap-3` auf `gap-4`, Ecken `rounded-xl`. Farben, Rand, Hover-Verhalten, Link-Ziel und „im neuen Tab öffnen" bleiben unverändert.
- Keine Änderungen an Datenbank, Einstellungen-Bereich, /admin, Header oder anderen Seiten. Kopfdaten (Titel, Beschreibung) bleiben unverändert.

## Prüfung

- Build läuft fehlerfrei (`build-errors.log`).
- Playwright bei 1280 px und 393 px: ohne Bild erscheint der Inhalt sofort; mit hinterlegtem Bild erscheint zuerst der gelbe Ladekreis und danach der Inhalt; der Knopf ist messbar größer; genau ein Telegram-Link auf `https://t.me/call_agency`.
- Kein Bild, kaputtes Bild und normales Bild werden jeweils durchgetestet; der 6-Sekunden-Ausweg greift nur bei kaputtem Bild.
