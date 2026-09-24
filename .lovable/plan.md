# Landingpage „Postboten werben" – DHL-Style, Dark Theme (Onepager)

## Ziel
Eine deutsche Ein-Seiten-Landingpage zur Gewinnung von **aktiven Postboten/Briefträgern der Deutschen Post**, die sich bei der Post etwas dazuverdienen, indem sie zusätzlich „unsere" Briefe mit ausliefern. Kein Jobwechsel, keine Paketzusteller. **Keine Lovable-Cloud-Anbindung** – das Formular ist rein clientseitig und zeigt nach dem Absenden nur eine Bestätigung.

## Designrichtung
- DHL-Style, aber **Dark Theme**: sehr dunkler Hintergrund (fast schwarz, leicht warm), DHL-Gelb (#FFCC00) als dominante Akzentfarbe, DHL-Rot (#D40511) sparsam als zweite Akzentfarbe (z.B. für „Nur für Postboten"-Badge und Warnhinweis „Keine Paketzusteller").
- Typografie: geometrische Sans (Futura-ähnlich, z.B. „Jost" über Google Fonts per `<link>` im Root-Head) – passt zur DHL-Corporate-Anmutung.
- Visuelle Elemente: schräge Gelb-Streifen/keilförmige Balken (Anmutung DHL-Logo-Streifen), klare Blöcke, große Headlines, Buttons in Gelb mit dunklem Text.
- Design-Tokens komplett in `src/styles.css` (oklch + `@theme inline`), keine harten Farbwerte in Komponenten. Font-Loading via `<link>` in `src/routes/__root.tsx`.

## Seitenstruktur (eine Route `/`, Anker-Navigation, da ausdrücklich Onepager gewünscht)
`src/routes/index.tsx` ersetzt den Platzhalter. Sektionen:

1. **Sticky Header** – Platzhalter-Logo (Firmenname noch unklar → neutraler Platzhalter), Anker-Nav, Gelber CTA-Button „Jetzt bewerben".
2. **Hero** – Headline wie „Du trägst schon Briefe aus. Verdien dir jetzt was dazu." Subline: nur für angestellte Postboten der Deutschen Post; zwei CTAs (Bewerben / So funktioniert's). Dunkler Hintergrund mit gelbem Schrägstreifen.
3. **So funktioniert's** – 3 Schritte: Bewerben → Wir geben dir unsere Briefe für deinen Bezirk → Du lieferst sie einfach zusammen mit deiner normalen Tour aus.
4. **Vergütung** – konkreter Betrag als **Platzhalter** (z.B. „X € pro Zusatz-Tour"), da noch keine Zahl genannt wurde; klar erkennbar als zu ändernder Wert im Code markiert.
5. **Wer du sein musst (Anforderungen)** – explizit: angestellt bei der Deutschen Post als Postbote/Briefträger; **rot hervorgehobener Hinweis: Keine Paketzusteller, keine Externe**.
6. **FAQ** – u.a.: Bleibe ich bei der Deutschen Post angestellt? (Ja), Brauche ich einen eigenen Bezirk? (Nein, deine normale Tour reicht), Ist das ein Jobwechsel? (Nein, reiner Zusatzverdienst).
7. **Bewerbungsformular** – Felder: Name, E-Mail, Telefon, PLZ/Bezirk, Nachricht. Clientseitige Validierung (Zod) + Längenlimits; **kein Backend**: Absenden zeigt nur eine Bestätigungsmeldung (Hinweistext, dass aktuell Demo).
8. **Footer** – Platzhalter-Kontaktdaten, sowie deutlicher Disclaimer: keine offizielle Seite der Deutschen Post/DHL, nur Stil-Anlehnung.

## Technische Details
- Framework bleibt TanStack Start; eine Route (`src/routes/index.tsx`), Sektionen als Komponenten unter `src/components/landing/`.
- Head-Metadaten auf der Route: deutscher Titel, Beschreibung, og:title/og:description/og:type, twitter:card (kein og:image, da keine absolute URL).
- Root-Head (`__root.tsx`): Google-Fonts-`<link>` (Jost), Titel/Description gegen „Lovable App" austauschen.
- Kein Lovable Cloud, keine Datenbank, keine Server-Functions für das Formular.
- Anker-Links (`#bewerbung` etc.) innerhalb der Seite sind hier ok, da explizit ein Onepager gewünscht ist.

## Offene Punkte (Platzhalter, die du später liefern musst)
- Firmenname (aktuell neutraler Platzhalter im Header/Footer)
- Konkreter Vergütungsbetrag (aktuell „X €")
- Telefon/E-Mail-Kontakt (aktuell Beispieldaten)
- Formular-Ziel (aktuell nur Bestätigungsanzeige)
