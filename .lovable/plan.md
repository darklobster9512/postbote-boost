# Floating Icon-Bubbles in der Hero-Section

## Ziel
Die Hero-Section wirkt lebendiger: Posthorn- und Bitcoin-Icons schweben als runde Bubbles verteilt um den zentrierten Hero-Content herum. Text, Buttons und Kennzahlen bleiben unverändert mittig.

## Umsetzung

### 1. Icons verfügbar machen
- `btc.webp` und `Posthorn-Deutschland.svg` per `lovable-assets` hochladen (aus `/mnt/user-uploads/`), Pointer-Dateien in `src/assets/`.
- Das Posthorn-SVG hat einen gelben Hintergrund (#f0ca00) — in einer runden Bubble mit `rounded-full overflow-hidden` wird daraus ein gelber Kreis mit dunklem Posthorn. Passt exakt zum DHL-Style. Das Bitcoin-Icon ist bereits ein runder oranger Kreis.

### 2. Bubbles in `Hero.tsx`
- Neues deklaratives Array `BUBBLES` mit ca. 12–14 Einträgen: Position (prozentual, absolute im `relative` Container der Section), Größe (3 Varianten: ~44px / ~64px / ~84px), Icon (Posthorn/Bitcoin im Wechsel), Float-Dauer (6–11s) und Delay (zufällig verteilt).
- Render als `aria-hidden`, `pointer-events-none`, `absolute` hinter dem Content (`z-0`; Content-Container bekommt `relative z-10`).
- Stil: runder Kreis mit `rounded-full`, dezenter Ring (`border border-border/40` bzw. bei Posthorn der gelbe Grund), leichter Schatten, Opacity ~0.85–0.95.
- Animation: neue CSS-Keyframes `bubble-float` in `src/styles.css` (sanftes Auf/Ab + minimal Rotation, transform-only), Dauer/Delay/Größe per Inline-Style pro Bubble.

### 3. Verteilung
- Bubbles ringförmig um den Content: linke und rechte Ränder sowie oberer Bereich; die Mitte (max-w-4xl Content-Spalte) bleibt frei, damit kein Text verdeckt wird.
- Responsive: auf kleinen Screens (< 640px) werden die äußeren/kleineren Bubbles per `hidden sm:block` bzw. `hidden lg:block` ausgeblendet — keine Überlappung mit dem umgebrochenen H1, kein horizontales Scrollen (`overflow-hidden` der Section bleibt).

### 4. Nicht angefasst
- H1-Zweizeiler (weiß/gelb), zentriertes Layout, Kennzahlen, Pills, Payout-Note, diagonale Deko-Streifen und dhl-stripes bleiben wie sie sind.
- Keine „Pakete"-Aussagen entfernen; keine Farben/Fonts ändern.

## Verifikation
- Build OK in `/tmp/observability/build-errors.log`.
- Playwright: Hero-Screenshot Desktop (1280px) und Mobile (375px) — Bubbles sichtbar, kein Text verdeckt, kein horizontaler Overflow, Animation läuft (transform ändert sich über Zeit).
