# Nur Login + Telegram-Benachrichtigung bei neuen Bewerbungen

## 1. /auth: nur noch Einloggen
- Umschalter „Registrieren" und die Registrier-Logik entfernen; nur E-Mail + Passwort + „Einloggen".
- Beschreibungstext der Seite auf „Anmeldung" kürzen.
- Hinweis: Neue Admin-Konten legst du dann nur noch direkt in Supabase (Authentication > Users) an. Existiert noch kein Konto, bitte vor der Umsetzung eines registrieren.

## 2. /admin: Reiter „Bewerbungen" und „Telegram"
- Oben zwei Reiter. „Bewerbungen" = heutige Liste.
- „Telegram": Feld „Chat-ID", Knopf „Speichern", Knopf „Testnachricht senden", Anzeige ob der Bot-Token hinterlegt ist.

## 3. Bot-Token
- Ich frage dich über ein sicheres Eingabefeld nach dem Bot-Token (von @BotFather) und speichere ihn als geheimen Wert in deinem Supabase-Projekt (`TELEGRAM_BOT_TOKEN`). Er landet nicht in der Datenbank und nicht im Browser.

## 4. Supabase Edge Function `notify-telegram`
- Wird bei jeder neuen Bewerbung automatisch ausgelöst und schickt an die hinterlegte Chat-ID:
  Neue Bewerbung – Name, E-Mail, Telefon, Gebiet, Auszahlungsart.
- Scheitert Telegram, wird die Bewerbung trotzdem gespeichert.

## Technische Details
- Migration: Tabelle `public.settings` (key text PK, value text, updated_at) mit GRANTs, RLS: nur `has_role(auth.uid(),'admin')` darf lesen/schreiben; Eintrag `telegram_chat_id`.
- Auslöser: Datenbank-Trigger `AFTER INSERT ON applications` ruft per `pg_net` (`net.http_post`) die Edge Function auf, mit einem geteilten Geheimwert im Header (`NOTIFY_SECRET`, generiert, zusätzlich in einer privaten Tabelle/Vault für den Trigger hinterlegt). Die Function prüft den Header, liest die Chat-ID mit Service-Role und sendet `sendMessage` an `api.telegram.org` (HTML-escaped).
- Testnachricht aus dem Admin: `supabase.functions.invoke('notify-telegram', { body: { test: true } })` mit Nutzer-JWT; Function prüft Admin-Rolle.
- Edge Function wird deployt; `verify_jwt = false` in config.toml (eigene Prüfung).
- Explizit Supabase Edge Function statt Server-Funktion, weil du es so wünschst.
