# Meta-Pixel 1559541389311751 auf /runner + Lead beim Telegram-Knopf

## Was passiert
- Auf /runner läuft ausschließlich der neue Pixel **1559541389311751** (PageView beim Aufruf).
- Der bisherige Pixel 1087662750544139 bleibt auf allen anderen Seiten unverändert, wird aber auf /runner nicht mehr geladen – so landen die /runner-Besuche und -Leads nicht im Pixel der Landingpage.
- Klick auf den Telegram-Knopf löst `Lead` beim neuen Pixel aus; Telegram öffnet sich weiterhin im neuen Tab.

## Technische Details
- `__root.tsx`: Pixel-Skript wählt die ID nach `location.pathname` (`/runner` → 1559541389311751, sonst 1087662750544139); noscript-Bild ebenso nach Route.
- `runner.tsx`: `onClick` am Telegram-Link → `window.fbq?.("trackSingle", "1559541389311751", "Lead")`.
- Bei Wechsel von / nach /runner innerhalb der Seite (ohne Neuladen) wird der neue Pixel per `fbq('init')` + `trackSingle PageView` nachgeladen.
- Prüfung per Playwright: Pixel-ID auf /runner, Lead-Aufruf beim Klick.
