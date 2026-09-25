# Logo im Hero mit abgerundeten Ecken

## Ziel

Das Deutsche-Post-Logo oben im Hero soll abgerundete Ecken bekommen, statt wie jetzt als
rechteckiger gelber Block zu enden.

## Vorgehen

1. `src/components/landing/Hero.tsx`: am `img`-Element des Logos die Klasse
   `rounded-xl` ergänzen (12 px Eckenradius). Die vorhandenen Breiten-Klassen
   (`w-[200px] max-w-full sm:w-[260px]`) bleiben unverändert.
2. Sichtbarkeit prüfen: Der gelbe Hintergrund im Logo füllt die komplette Bildfläche,
   deshalb wird er durch den Eckenradius automatisch mit beschnitten — es entsteht ein
   abgerundetes Gelb-Rechteck, kein weißer Rand.
3. Im laufenden Preview am großen Bildschirm und auf dem Handy kontrollieren: Ecken
   rund, Logo mittig, nichts abgeschnitten, keine Browser-Fehlermeldung.

## Technische Details

- Datei: `src/components/landing/Hero.tsx` (Zeile 18–24, das `img`-Element).
- Änderung: `className="w-[200px] max-w-full sm:w-[260px]"` →
  `className="w-[200px] max-w-full sm:w-[260px] rounded-xl"`.
- Kein Eingriff in die Logo-Datei selbst (`src/assets/deutsche-post-logo.svg`), keine
  neuen Dateien, keine Abhängigkeiten.
- Der Eckenradius ist eine einzelne Klasse und damit jederzeit in einer Sekunde
  kleiner (`rounded-lg` = 8 px) oder größer (`rounded-2xl` = 16 px) stellbar.

## Hinweis

Das Gelb im Logo ist `#FCC310` (etwas wärmer als das Seiten-Gelb `#FFCC00`). Das bleibt
erst mal so, weil eine Änderung am Logo auch das Aussehen der Wortmarke berührt — sag
Bescheid, wenn es angepasst werden soll.
