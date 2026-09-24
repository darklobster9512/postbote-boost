# Gelb auf exakt #FFCC00 umstellen

## Ziel

Alle gelben Elemente der Seite (Überschrift-Zeile 2, Buttons, Badges, Icons, Rahmen, Streifen-Band) erscheinen in genau dem DHL-Gelb `#FFCC00` – sichtbar gleichmäßig, ohne dass eine Stelle einen anderen Gelbton zeigt.

## Was aktuell falsch läuft

Das Gelb ist nicht als `#FFCC00` hinterlegt, sondern als angenäherter `oklch`-Wert (`oklch(0.865 0.184 94.9)`). Gerechnet ergibt dieser Wert `#F9CF00` – also ein Hautton neben dem gewünschten Gelb, leicht grünlicher und etwas gedeckter. Genau diese Abweichung fällt auf.

Alle Sektionen der Seite beziehen ihr Gelb bereits über dieselbe Token-Variable (`bg-primary`, `text-primary`, `border-primary`, `dhl-stripes`). Es gibt keine einzelnen hart eingebauten Farbwerte in den Bereichen – die Korrektur passiert deshalb an einer einzigen Stelle und wirkt sofort überall.

## Vorgehen

1. In `src/styles.css` alle Gelb-Tokens von `oklch`-Schreibweise auf den echten Wert `#ffcc00` umstellen – im normalen Bereich und im Dark-Bereich (die Seite ist durchgehend dunkel, beide Blöcke müssen denselben Wert bekommen, sonst könnte ein Bereich abweichen):
   - `--primary` (die Hauptfarbe, aus der alle Gelb-Klassen entstehen)
   - `--dhl-yellow`
   - `--ring` (Fokus-Rahmen, z. B. im Bewerbungsformular)
   - `--chart-1`, `--sidebar-primary`, `--sidebar-ring` (der Vollständigkeit halber, damit nirgends ein Rest des alten Tons bleibt)
2. Den Hinweis-Kommentar oben in der Datei anpassen, damit dort nicht mehr ein angenäherter Wert steht.
3. An den Sektionen selbst wird nichts geändert – kein Text, kein Layout, keine Abstände. Die sechs "Keine Pakete"-Klarstellungen bleiben alle unangetastet.

## Ergebnis

Ein Gelb-Wert im Projekt, und der ist nachweislich `#FFCC00`. Buttons, Überschrift-Zeile 2, Badges und das Streifen-Band passen damit zusammen.

## Technische Details

- Datei: `src/styles.css` (einzige Änderung), Zeilen im `:root`- und `.dark`-Block.
- Die `@theme inline`-Zuordnung `--color-primary: var(--primary)` bleibt unverändert; Transparenz-Stufen wie `bg-primary/15` funktionieren mit Hex-Werten einwandfrei.
- Prüfung nach dem Edit: Build-Log frei von Fehlern, und im laufenden Preview per Browser ausgelesen: Hintergrund des Haupt-Buttons und Farbe der zweiten Überschrift-Zeile = `rgb(255, 204, 0)`, Streifen-Band ebenfalls in diesem Ton, keine Konsolen-Fehler, keine abgeschnittenen Texte.

## Hinweis

Der rote Wert ist von derselben Art angenähert und zeigt aktuell `#D11118` statt `#D40511`. Darauf wird nicht automatisch gegriffen – sag kurz Bescheid, wenn der gleiche Tausch auch fürs Rot erfolgen soll.
