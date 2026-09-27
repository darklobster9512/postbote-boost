# Status-Spalte für Bewerbungen im Admin

## Was du bekommst
- In der Bewerbungs-Tabelle auf /admin kommt eine neue Spalte **Status** mit einer Auswahl pro Zeile.
- Mögliche Werte: **Neu**, **Mailbox**, **Interessiert**, **Kein Interesse**.
- Alle bisherigen und neuen Bewerbungen starten mit **Neu**.
- Die Änderung wird sofort gespeichert und bleibt beim Neuladen erhalten. Bei einem Fehler erscheint eine kurze Meldung und der alte Wert wird wiederhergestellt.
- Jeder Status bekommt eine eigene Farbe (Neu gelb, Mailbox grau, Interessiert grün, Kein Interesse rot), damit du die Liste schnell überblickst.
- Klick auf die Auswahl klappt die Details der Zeile nicht auf.

## Technische Details
- Migration: Enum `application_status ('neu','mailbox','interessiert','kein_interesse')`, Spalte `applications.status` NOT NULL DEFAULT 'neu' (bestehende Zeilen erhalten automatisch 'neu').
- `GRANT UPDATE (status) ON public.applications TO authenticated;` plus RLS-Policy „Admins update" FOR UPDATE mit `has_role(auth.uid(),'admin')` in USING und WITH CHECK. Öffentliche Einfügungen bleiben unverändert (Status nicht setzbar vom Formular, Default greift).
- admin.tsx: neue Spalte mit `<select>`, Update über Browser-Client `supabase.from('applications').update({status}).eq('id', id)`, optimistisches Update im Query-Cache, `stopPropagation` am Select, colSpan der Detailzeile auf 7.
