# Deutlich sichtbare Einblend-Animationen beim Aufruf der Seite

## Problem
Die bisherige Animation ist kaum zu sehen: Die Seite erscheint erst kurz komplett und wird dann unsichtbar gemacht und wieder eingeblendet. Der Effekt ist dabei nur ganz leicht und betrifft nur ganze Sektionen.

## Neu
- **Beim Aufruf:** Alles, was man sofort sieht, blendet nacheinander ein, ohne vorheriges Aufblitzen. Kopfleiste, Logo, Titelzeile 1, Titelzeile 2, Text, Knöpfe und Kennzahlen kommen jeweils ca. 0,1 s versetzt, mit Weichzeichner-zu-scharf und etwas mehr Weg von unten (ca. 32 px), Dauer ca. 0,9 s.
- **Jede weitere Sektion:** Sobald sie ins Bild kommt, blenden Überschrift, Text und dann die einzelnen Kacheln/Karten nacheinander ein (gestaffelt), statt die ganze Sektion auf einmal.
- Jede Stelle animiert nur einmal. Auf dem Handy wie am Computer gleich.
- „Bewegung reduzieren" im Gerät: alles sofort sichtbar.

## Technische Details
- Kleines Skript im Kopf der Seite (__root) setzt vor dem ersten Anzeigen eine Klasse `js-anim` am html-Element; die versteckten Startzustände gelten nur mit dieser Klasse. So gibt es kein Aufblitzen, und ohne JS bleibt alles sichtbar.
- `Reveal` wird erweitert: Die direkten Inhaltsblöcke jeder Sektion erhalten per CSS (`[data-reveal] > * > *` bzw. markierte Kinder `data-stagger`) gestaffelte `transition-delay` über eine CSS-Variable `--i`; Raster-Kacheln bekommen `data-stagger` im jeweiligen Komponenten-Container.
- Hero: eigene Lade-Animation per CSS-Keyframes (fade + translateY + blur) mit Verzögerungen pro Element; Header ebenfalls per Keyframe.
- Sicherheitsnetz: Falls der Observer nichts meldet, wird nach 3 s alles eingeblendet.
