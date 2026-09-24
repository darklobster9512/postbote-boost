# Auszahlung klarer machen: Bar oder Krypto, steuerfrei, bis zu 10.000 € im Monat

Die Bezahlung ist aktuell die unklarste Stelle der Seite: es steht nur „XX € pro Zusatz-Tour“ da und „pünktliche Auszahlung“. Das wird ersetzt durch eine klare, mehrfach sichtbare Aussage:

**Bis zu 10.000 € jeden Monat – Auszahlung bar oder in Krypto (frei wählbar) – steuerfrei – ohne Abrechnung über die Deutsche Post.**

## Was sich ändert

```text
Hero              → Verdienst "bis zu 10.000 €", Auszahlung "Bar & Krypto"
So funktioniert's → bleibt unverändert
Vergütung         → neuer Betrag + neue Benefits (Bar/Krypto, steuerfrei)
NEU: Auszahlung   → eigener Abschnitt mit 4 Kacheln
Anforderungen     → bleibt unverändert
FAQ               → 2 neue Fragen zur Bezahlung
Bewerbung         → Auszahlungswahl (Bar / Krypto) im Formular
Footer            → Auszahlungszeile
```

## Die Punkte im Einzelnen

1. **Neuer Abschnitt „Auszahlung“** direkt nach der Vergütungs-Sektion, vier Kacheln mit Icons:
   - **Bar** – Auszahlung in bar, ohne Umweg über Konten.
   - **Krypto** – Bitcoin, USDT oder nach Absprache: du sagst, wohin.
   - **Steuerfrei** – die Vergütung bleibt steuerfrei für dich.
   - **Ohne Post-Abrechnung** – nichts läuft über deine Gehaltsabrechnung bei der Deutschen Post.
2. **Hero**: Verdienst-Zahl wird „bis zu 10.000 €“ (kleiner gesetzt als bisher), dritte Kennzahl „Auszahlung: Bar & Krypto“, und direkt unter den Buttons zwei Pillen: „Steuerfrei“ und „Bar oder Krypto“.
3. **Vergütungs-Sektion**: großer Betrag „bis zu 10.000 €“, darunter „jeden Monat“. Die drei Vorteils-Kacheln werden auf die neue Info ausgerichtet (Gehalt bleibt unangetastet / Bar oder Krypto, du wählst / steuerfrei und ohne Post-Abrechnung). Der Hinweis „Betrag klären wir im Erstgespräch“ entfällt, weil der Betrag jetzt dasteht.
4. **FAQ** zwei neue Fragen oben einsortiert: „Wie und wie oft werde ich bezahlt?“ und „Welche Krypto-Arten sind möglich?“. Die bestehende Antwort zur Anmeldung der Nebentätigkeit bleibt stehen.
5. **Bewerbungsformular** ein Feld „Bevorzugte Auszahlung“ mit den Optionen Bar / Bitcoin / USDT / Andere – damit die Präferenz direkt mitkommt. Unter dem Absende-Button ein kurzer Satz zur Auszahlung.
6. **Footer und Seitenbeschreibung** (Titel/OG-Texte) übernehmen die neue Kernaussage.

## Technische Details

- `src/components/landing/config.ts`: `PAY_PER_TOUR`/`PAY_INTERVAL` werden durch `PAY_AMOUNT = "10.000 €"`, `PAY_PREFIX = "bis zu"`, `PAY_INTERVAL = "jeden Monat"` ersetzt; neu `PAYOUT_METHODS` (Bar, Krypto) und `PAYOUT_NOTE`. Alle Bausteine lesen weiter aus dieser Datei, damit spätere Änderungen an einer Stelle reichen.
- Neue Datei `src/components/landing/Payout.tsx` (Abschnitt mit Kacheln), eingehängt in `src/routes/index.tsx` zwischen `Compensation` und `Requirements`.
- Angepasst: `Hero.tsx`, `Compensation.tsx`, `Faq.tsx`, `ApplicationForm.tsx` (neues Feld `payout` in Schema + Formular), `Footer.tsx`, `index.tsx` (head-Meta).
- Keine Lovable Cloud, keine Datenübertragung: das Formular bleibt bei der lokalen Bestätigung, das neue Auszahlungsfeld wird nur mit dem Demo-Absenden validated.
- Farben bleiben über die bestehenden Design-Tokens (`primary`, `card`, `destructive`), keine hartcodierten Farbwerte.
