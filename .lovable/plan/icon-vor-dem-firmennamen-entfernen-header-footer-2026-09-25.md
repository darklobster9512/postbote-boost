# Icon vor dem Firmennamen entfernen (Header & Footer)

Der kleine Balken vor „ZUSATZKURIER" besteht aus drei schrägen Streifen und steht im Logo. Dieses Logo wird oben und unten im Fußbereich genutzt – dort verschwindet das Icon also in einem Schritt.

## Ergebnis

- Oben links: nur noch der Schriftzug „ZUSATZKURIER".
- Unten links: nur noch der Schriftzug „ZUSATZKURIER".
- Der Schriftzug bleibt ein Link nach oben, Schriftgröße, Abstände, Farbwelt und alle Menüpunkte bleiben unverändert.
- Das Deutsche-Post-Logo oben auf der Seite ist davon nicht betroffen.

## Technische Details

- Datei: `src/components/landing/Header.tsx`
  - Im `Logo`-Baustein die drei Balken-Spans (aktuell Zeilen 14–18) löschen; das umgebende `gap-2.5` wird überflüssig und entfällt.
  - Der `compact`-Schalter wird nirgends genutzt und wäre nach dem Entfernen des Icons bedeutungslos (er würde einen leeren Link erzeugen) – er wird mit entfernt, der Schriftzug läuft dann immer mit.
- Datei: `src/components/landing/Footer.tsx`
  - Keine Änderung nötig, der Fußbereich nutzt denselben `Logo`-Baustein.
- Die gelben Streifen-Bänder (z. B. direkt über dem Fußbereich) sind Deko der Abschnitte und bleiben.

## Prüfung

- Build-Log kontrollieren (`/tmp/observability/build-errors.log`).
- Vorschau am großen Bildschirm und auf dem Handy durchklicken: Header und Footer zeigen nur den Schriftzug, der Link nach oben funktioniert, keine abgeschnittenen Texte, keine Browser-Fehler.

## Offen (unverändert)

Echte Firmendaten fehlen weiterhin: Firmenname, Telefon, E-Mail, Impressum und Datenschutz.
