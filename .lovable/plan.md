# Alle Bilder in den public-Ordner

Aktuell liegen zwei Bilder woanders: das Deutsche-Post-Logo (Hero) und das Telegram-Logo (Kontakt unten). Das Favicon liegt schon in public.

## Änderungen
- `src/assets/deutsche-post-logo.svg` nach `public/images/deutsche-post-logo.svg` verschieben; Hero nutzt dann `/images/deutsche-post-logo.svg`.
- Telegram-Logo: liegt derzeit nur als Verweis auf einen externen Speicher. Die Originaldatei wird heruntergeladen und als `public/images/telegram.png` abgelegt; Footer nutzt dann `/images/telegram.png`. Der Verweis `src/assets/telegram.png.asset.json` wird gelöscht.
- Danach ist `src/assets` leer und wird entfernt.

Aussehen der Seite bleibt gleich; geprüft wird, dass beide Bilder weiterhin laden.
