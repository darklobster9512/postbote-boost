# Domain zusatzkurier.de für den Vorschau-Server freigeben

## Problem

Beim Aufruf über `zusatzkurier.de` blockt der Vite-Dev-Server die Anfrage:

> Blocked request. This host ("zusatzkurier.de") is not allowed.

Vite prüft den Host-Header jeder Anfrage gegen eine erlaubte Liste. Derzeit ist nur die Sandbox-Adresse erlaubt, daher kommt die eigene Domain nicht durch.

## Fix

In `vite.config.ts` die Domain (mit und ohne `www`) über den `vite`-Block der bestehenden `defineConfig` freigeben:

```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    server: {
      allowedHosts: ["zusatzkurier.de", "www.zusatzkurier.de"],
    },
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
```

Keine anderen Einstellungen werden verändert — Plugins, TanStack-Start-Konfiguration und der SSR-Eintrag bleiben exakt so.

## Verifikation

1. Dev-Server neu starten (Kill + automatischer Neustart durch den Daemon).
2. Anfrage mit Host-Header `zusatzkurier.de` gegen `localhost:8080` prüfen (curl) — die Seite muss mit HTTP 200 antworten statt „Blocked request".
3. Build-Log (`/tmp/observability/build-errors.log`) auf Fehler prüfen.

## Hinweis

Diese Freigabe betrifft den Entwicklungs-/Vorschau-Server. Die veröffentlichte Seite (nach „Veröffentlichen") läuft darüber hinaus und braucht diese Einstellung nicht.
