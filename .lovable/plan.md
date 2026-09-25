# Verspätetes Hochscrollen entfernen

## Ziel
- Die Seite darf nach einigen Sekunden nicht mehr selbstständig nach oben springen.
- Beim normalen Scrollen bleibt die aktuelle Position unverändert.
- Bei einem echten Neuladen startet die Seite weiterhin direkt oben, ohne sichtbare Bewegung.
- Die Hero-Animation bleibt unverändert.

## Umsetzung
- Den verzögerten `load`-Listener und den zusätzlichen späteren Scroll-Aufruf auf der Startseite entfernen. Diese Aufrufe können nach bereits begonnener Nutzung noch `scrollTo(0, 0)` auslösen.
- Das frühe Skript im Seitenkopf vereinfachen: Scroll-Wiederherstellung deaktivieren und die Ausgangsposition nur sofort beim initialen Laden setzen, nicht erneut über spätere Ladeereignisse.
- Keine Änderungen an Inhalt, Gestaltung, Hero-Animation oder den übrigen Bereichen.

## Prüfung
- Seite laden, sofort nach unten scrollen und mehrere Sekunden warten: kein selbstständiges Hochspringen.
- Weiter unten neu laden: Seite beginnt direkt oben, ohne nachträgliche Bewegung.
- Hero-Animation und Sprungknöpfe weiterhin prüfen.
