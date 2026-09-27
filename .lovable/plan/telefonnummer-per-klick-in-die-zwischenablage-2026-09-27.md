# Telefonnummer per Klick in die Zwischenablage

In der Bewerbungs-Liste auf `/admin` soll ein Klick auf eine Telefonnummer in der Spalte **Telefon** die Nummer automatisch in die Zwischenablage kopieren.

## Verhalten

- Die Nummer in der Spalte Telefon wird zu einem echten Knopf: Klick kopiert den Text genau so, wie er eingetragen ist (inklusive Leerzeichen).
- Der Rest der Zeile verhält sich wie bisher: Klick auf Name, E-Mail, Gebiet oder Status öffnet bzw. schließt die Detail-Ansicht. Beim Klick auf die Telefonnummer passiert das **nicht** – es wird nur kopiert.
- Kurze Bestätigung im Bild: unten erscheint kurz „Telefonnummer kopiert". Ist Kopieren nicht möglich, erscheint stattdessen eine Fehlermeldung.
- Die Nummer bleibt im Klartext lesbar, es ändert sich nichts an der Darstellung der Liste.

## Umsetzung

Nur `src/routes/_authenticated/admin.tsx` wird angefasst.

1. Hilfsfunktion `copyPhone(phone)` im `AdminPage`-Baustein:
   - `await navigator.clipboard.writeText(phone)` im `try`.
   - `catch`: Rückfall über ein unsichtbares Textfeld und `document.execCommand("copy")` – nötig, falls der Browser die moderne Clipboard-Schnittstelle nicht freigibt (z. B. beim Aufruf über eine Domain ohne HTTPS).
   - Danach `toast.success("Telefonnummer kopiert")`, im Fehlerfall `toast.error("Kopieren hat nicht funktioniert.")`.
   - `sonner` und `<Toaster />` sind auf der Seite bereits eingebunden, es kommt nichts Neues dazu.
2. Die Telefonzelle (Zeile 161) bekommt statt des reinen Textes einen `<button type="button">` mit dem bisherigen Aussehen der Zelle (`whitespace-nowrap px-4 py-3`), zusätzlich `title="Nummer kopieren"` und beim Überfahren gelb + unterstrichen. Der Klick-Handler ruft `e.stopPropagation()` und dann `copyPhone(a.phone)` auf.
3. An der Detail-Zeile, am Status-Auswahlmenü und an allen anderen Spalten wird nichts geändert.

## Prüfen

- Build läuft fehlerfrei.
- Im Browser (Playwright, 1280 px) eine Bewerbung anklicken: die Nummer wandert in die Zwischenablage, die Meldung erscheint, die Detail-Ansicht bleibt geschlossen. Klick auf dieselbe Zeile neben der Nummer öffnet weiterhin die Details.
