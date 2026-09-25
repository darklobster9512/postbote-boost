# Fade-ins nach dem Hero sauber neu aufsetzen

## Ziel
- Kopfbereich und Hero bleiben exakt unverändert.
- Jeder folgende Seitenbereich blendet genau einmal ein, sobald man ihn beim Herunterscrollen erreicht.
- Ein Bereich blendet als Ganzes ein; keine zeitversetzten Karten, Texte oder Knöpfe innerhalb des Bereichs.
- Keine Aufwärtsbewegung, kein Nachladen, kein Scroll-Sprung und kein vorzeitiges Einblenden unterhalb des sichtbaren Bereichs.

## Umsetzung
- Die bisherige komplexe Erkennung einzelner Inhalte in `Reveal.tsx` entfernen.
- Jeden umschlossenen Bereich nur selbst beobachten und beim Eintritt in den sichtbaren Bereich dauerhaft sichtbar schalten.
- Den Beobachtungspunkt so setzen, dass die Animation erst nahe der unteren Bildschirmkante startet.
- In `styles.css` für diese Bereiche nur einen kurzen, ruhigen Übergang der Deckkraft verwenden.
- Alte Regeln für gestaffelte Unterelemente vollständig entfernen; die Hero-Regeln bleiben unangetastet.
- Bei ausgeschalteten Animationen bleibt alles sofort sichtbar.

## Prüfung
- Desktop und Handy jeweils neu laden: Hero-Ablauf prüfen.
- Langsam durch alle Bereiche bis zum Fußbereich scrollen und kontrollieren, dass jeder Bereich erst beim Erreichen einmal einblendet.
- Positionen vor, während und nach dem Einblenden vergleichen, damit kein Bereich die Seite verschiebt.
- Fehleranzeige prüfen.
