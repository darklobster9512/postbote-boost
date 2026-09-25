# Plan: Fade-ins außerhalb des Hero entfernen

## Ziel
Die Hero-Animation bleibt so, wie sie aktuell funktioniert. Alle anderen Bereiche der Landingpage bekommen keine Fade-in-/Scroll-Animation mehr und sind sofort normal sichtbar.

## Änderungen
- Die Einblend-Komponente um die Bereiche unter dem Hero entfernen.
- Die Scroll-Reveal-Styles für `data-reveal` entfernen.
- Die Header-Animation entfernen, damit wirklich nur der Hero animiert.
- Das Start-Skript vereinfachen: `data-anim` bleibt nur noch für den Hero zuständig; keine Reveal-Timer oder `__rvReady`-Logik mehr.
- Die Funktion „beim Neuladen wieder ganz oben starten“ bleibt erhalten.

## Prüfung
- Seite neu laden: Start oben beim Hero.
- Hero lädt weiter smooth.
- Ab der zweiten Sektion ist alles ohne Animation sofort sichtbar.
- Beim Scrollen gibt es kein verzögertes Einblenden und kein Hochspringen mehr.
