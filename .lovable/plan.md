# Sanfte Einblend-Animationen für jede Sektion

## Verhalten
- Jede Sektion der Startseite (Hero, So funktioniert's, Vergütung, Auszahlung, Voraussetzungen, Bewerbung, FAQ, Fußbereich) blendet beim Hineinscrollen sanft ein: von leicht transparent und etwas tiefer (ca. 24 px) zu voll sichtbar, ca. 0,7 s, weiche Kurve.
- Der Hero blendet direkt beim Laden ein.
- Jede Sektion animiert nur einmal, nicht bei jedem Hoch- und Runterscrollen.
- Kopfleiste bleibt ohne Animation.
- Wer in seinem Gerät „Bewegung reduzieren" eingestellt hat, sieht alles sofort ohne Animation.
- Ohne JavaScript bzw. vor dem Laden bleibt nichts unsichtbar hängen.

## Technische Details
- Neue Komponente `Reveal` (IntersectionObserver, threshold ~0.12, rootMargin unten -10 %), setzt nach Sichtbarkeit eine Klasse; CSS-Übergang auf opacity/transform in styles.css, `prefers-reduced-motion` schaltet ihn ab.
- Versteckter Startzustand nur, wenn JS aktiv ist (Klasse am html-Element), damit SSR-Inhalt sichtbar bleibt.
- In src/routes/index.tsx jede Sektion (außer Header) in `Reveal` einwickeln; Anker (#bewerbung, #faq) bleiben unverändert.
