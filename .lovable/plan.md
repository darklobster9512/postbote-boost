# Meta Pixel einbauen + Lead-Event beim Bewerbungsformular

## Ziel
Der Meta-Pixel (ID 3066494063553815) lädt auf der Landingpage und löst bei jedem Seitenaufruf „PageView“ aus. Sobald eine Bewerbung erfolgreich abgesendet wurde, feuert zusätzlich das Event „Lead“.

## Änderungen

### 1. Pixel-Code in der Wurzel-Seite (`src/routes/__root.tsx`)
- Das Pixel-Skript wird direkt im `<head>` der RootShell eingebaut (gleiches Muster wie das bestehende Scroll-/Animations-Skript, `dangerouslySetInnerHTML`).
- Inhalt ist exakt der offizielle Meta-Pixel-Code: fbq-Definition, `fbq('init', '3066494063553815')`, `fbq('track', 'PageView')`, Laden von `connect.facebook.net/en_US/fbevents.js`.
- Der `<noscript>`-Fallback (1x1-Bild auf facebook.com/tr) kommt als erster Knoten in den `<body>`.
- Da `/auth` und `/admin` ebenfalls unter diesem Root laufen, feuert der Pixel auch dort – gewollt, da alles dieselbe Domain ist.

### 2. Lead-Event im Formular (`src/components/landing/ApplicationForm.tsx`)
- Kleine Typ-Deklaration für `window.fbq` ergänzen (kein neues Paket nötig).
- Im `onSubmit`: nach erfolgreichem Speichern in Supabase und **vor** dem Umschalten auf die Danke-Ansicht:
  `window.fbq?.('track', 'Lead')` (optional chaining, damit nichts bricht, falls der Pixel blockiert ist, z. B. durch Adblocker).
- Fehlgeschlagene Absenden (Supabase-Fehler) lösen **kein** Lead aus – Lead zählt nur bei echter Bewerbung.

## Verifikation
- Build OK.
- Playwright: Seite laden → prüfen, dass `window.fbq` existiert und ein PageView gesendet wurde (Netzwerk-Anfrage an facebook.com/tr).
- Formular real ausfüllen und absenden → prüfen, dass `Lead`-Event ausgelöst wird (fbq-Aufruf beobachtbar, Danke-Ansicht erscheint).
