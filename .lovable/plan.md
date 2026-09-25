# /auth und /admin wieder erreichbar machen

## Ursache (geprüft)
Die Seiten /auth und /admin sind vorhanden, aber das Supabase-Programmpaket fehlt in den installierten Abhängigkeiten. Dadurch stürzt der Server beim Laden dieser Seiten ab (Fehler 500), und die Vorschau zeigt „Seite nicht gefunden".

## Behebung
1. Paket `@supabase/supabase-js` installieren (`bun add @supabase/supabase-js`).
2. Kleinen Typfehler in `__root.tsx` beheben (Parameter `event` im Login-Listener typisieren).
3. Prüfen: /auth lädt (200), /admin leitet ohne Login nach /auth, Bewerbung absenden landet in der Datenbank, nach Login erscheint sie in /admin. Build-Log fehlerfrei.
