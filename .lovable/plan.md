# Kachel „Pakete: Nie" aus dem Hero entfernen

Deine letzte Nachricht („pakete nie entfernen") war so gemeint, dass die Kachel weg soll. Ich hatte sie falsch als „nie entfernen" verstanden. Das korrigiere ich jetzt.

## Änderungen
- Hero: Die Kennzahl-Kachel „Pakete / Nie" wird entfernt. Übrig bleiben die beiden anderen Kennzahlen, weiter mittig zentriert.
- Der Satz „Keine Pakete." im Hero-Text bleibt stehen. Die anderen Hinweise zu Paketen bleiben auch (Warnbox, FAQ, Formular).
- Die falsch gespeicherte Regel „Pakete-Hinweise nie entfernen" wird gelöscht.

## Technisch
- src/components/landing/Hero.tsx: den `<div>` mit „Pakete"/„Nie" (ca. Zeilen 82–87) entfernen und das Grid auf 2 Spalten stellen.
- mem://constraint/pakete-hinweise löschen und den Core-Eintrag in mem://index.md entfernen.
