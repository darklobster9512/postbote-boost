# Schrift auf Roboto umstellen

Die Seite nutzt aktuell Jost. Neu: **Roboto** – die serifenlose Google-Schrift, die im DHL-Umfeld üblich ist. Alle Texte, Überschriften, Buttons und Formulare sind danach in Roboto, ansonsten bleibt die Seite unverändert ( Farben, Layout, Inhalte, Pakete-Hinweise).

## Was passiert

```text
1. Google-Fonts-Einbindung tauschen   (Jost -> Roboto, gleiche Gewichte)
2. Schrift-Festlegung tauschen         (Jost -> Roboto)
3. Projekt-Notiz aktualisieren         ("Font Jost" -> "Font Roboto")
4. Vorschau prüfen                     (Build + Screenshot)
```

## Technische Details

- **`src/routes/__root.tsx`** (Zeile 105): Der Google-Fonts-Link wird ausgetauscht gegen
  `https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;800&display=swap`.
  Die Gewichte decken alles ab, was auf der Seite vorkommt: normales Lesen (400),
  Formulare und Labels (500), Buttons (700), Überschriften (800). Die Preconnect-Zeilen
  bleiben, weil Roboto ebenfalls von Google Fonts geladen wird.
- **`src/styles.css`** (Zeile 14): `--font-sans` wird auf
  `"Roboto", ui-sans-serif, system-ui, sans-serif` gesetzt. Da die ganze Seite über diese
  eine Voreinstellung läuft, ist damit alles umgestellt – es gibt keine einzelne Stelle,
  an der Jost hart reinskriert ist.
- **Projekt-Notiz**: Die Vorgabe „Font Jost" wird auf „Font Roboto" geändert, damit
  künftige Änderungen nicht aus Versehen die alte Schrift zurückbringen.
- Roboto ist etwas breiter als Jost. Die Überschriften stehen mit engerem Zeichenabstand,
  das bleibt so und gleicht das weitgehend aus. Nach dem Umbau wird
  per Screenshot geprüft, ob die zweizeilige Hero-Überschrift weiterhin sauber in einer
  Linie steht – falls nicht, wird nur die Schriftgröße der Überschrift minimal angepasst.

## Unverändert

- Keine Lovable Cloud, keine Datenbank, keine Datenübertragung – das Formular bleibt eine
  Demo-Anzeige mit lokaler Bestätigung.
- Alle Inhalte, Farben und Hinweise (u. a. „Wir werben nicht ab", „Keine Pakete") bleiben
  Wort für Wort erhalten.
- Offene Platzhalter (Firmenname, Telefon, E-Mail, Impressum, Datenschutz) werden hier
  nicht angefasst.
