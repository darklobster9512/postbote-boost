# Ruhige Fade-ins ohne Scroll-Sprung

## Änderung
- Die bereits funktionierende Animation von Kopfbereich und Hero bleibt unverändert.
- Alle folgenden Bereiche reagieren sofort beim Erreichen des sichtbaren Bereichs, statt auf das vollständige Laden der Seite zu warten.
- Für diese Bereiche wird die Aufwärtsbewegung entfernt: Sie blenden nur über die Deckkraft weich ein und verändern dabei weder Position noch Seitenhöhe.
- Die Verzögerung zwischen Elementen wird deutlich verkürzt, damit Inhalte beim Scrollen direkt verfügbar wirken.
- Bereits sichtbare Bereiche werden beim ersten Laden sofort angestoßen.
- Die Einstellung für reduzierte Bewegung bleibt erhalten.

## Technische Details
- `Reveal.tsx`: Beobachtung direkt nach dem Einhängen starten; kein Warten auf das `load`-Ereignis.
- `styles.css`: separate, reine Fade-Animation für normale Bereiche; bestehende Hero-Animation nicht verändern.
- Danach die Startseite am Desktop und auf dem Handy neu laden und durchscrollen; dabei prüfen, dass kein Bereich verzögert nach oben rutscht und keine Fehler auftreten.
