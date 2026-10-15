# Bild für /runner im Admin hochladen

## Was du bekommst
- Im Reiter **Einstellungen** auf /admin kommt ein neuer Bereich **Bild für /runner**: aktuelle Vorschau, Knopf „Bild hochladen" (JPG, PNG, WEBP, max. 5 MB) und Knopf „Bild entfernen".
- Nach dem Hochladen erscheint das Bild auf /runner mittig über „Kontaktiere uns über Telegram" (abgerundete Ecken, passt sich der Bildschirmbreite an).
- Ohne hochgeladenes Bild sieht /runner aus wie jetzt.
- Ein neues Bild ersetzt das alte.

## Technische Details
- Storage-Bucket `runner` (öffentlich lesbar, 5 MB Limit) über das Bucket-Tool im externen Supabase.
- Migration: Policies auf `storage.objects` für Bucket `runner` — INSERT/UPDATE/DELETE nur `has_role(auth.uid(),'admin')`; Lesen öffentlich. Zusätzlich Policy auf `settings`: anon/authenticated dürfen nur die Zeile `key = 'runner_image_url'` lesen (GRANT SELECT an anon).
- Upload in `AccountSettings`-Bereich (neue Komponente `src/components/admin/RunnerImageSettings.tsx`): Datei mit eindeutigem Namen hochladen, öffentliche URL in `settings` (`runner_image_url`) per upsert speichern, altes Bild löschen.
- `src/routes/runner.tsx`: liest `runner_image_url` über den Browser-Client und zeigt das Bild über der Überschrift.
