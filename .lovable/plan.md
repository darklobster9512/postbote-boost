# Bewerbungen speichern + Admin-Bereich (externes Supabase)

Genutzt wird ausschließlich dein angebundenes Supabase-Projekt, keine Lovable Cloud.

## Was du bekommst

1. **Bewerbungsformular speichert echt**: Beim Absenden landen Name, E-Mail, Telefon, Zustellgebiet, bevorzugte Auszahlung, Nachricht und die Bestätigung „Ich bin Briefzusteller der Deutschen Post" in der Datenbank. Danach wie bisher „Danke für deine Bewerbung!", bei Fehlern eine verständliche Meldung.
2. **Seite /auth**: Registrieren und Einloggen mit E-Mail + Passwort (umschaltbar), nicht in der Kopfzeile verlinkt, gleiche dunkle Optik.
3. **Seite /admin**: nur für eingeloggte Admins. Tabelle aller Bewerbungen (neueste zuerst) mit allen Feldern und Eingangsdatum, Klick öffnet die Details, Abmelden-Knopf.

## Wer wird Admin? (Sicherheit)

Würde jede Registrierung automatisch Admin, könnte jeder Fremde die Bewerbungen lesen. Deshalb:
- **Das erste registrierte Konto wird automatisch Admin.**
- Alle späteren Registrierungen haben keinen Zugriff und sehen auf /admin „Kein Zugriff". Weitere Admins schaltest du bei Bedarf in Supabase frei (ich zeige dir wie).

Hinweis: Supabase verlangt standardmäßig eine Bestätigung per E-Mail-Link nach der Registrierung. Die /auth-Seite zeigt dann „Bitte bestätige deine E-Mail". Das kannst du in Supabase unter Authentication abschalten.

## Technische Details

- Migration (über das Migrations-Tool):
  - Enum `app_role ('admin')`, Tabelle `user_roles (user_id, role)` + `has_role()` Security-Definer-Funktion.
  - Tabelle `applications` (name, email, phone, area, payout, message, is_postbote, created_at) mit GRANTs: `INSERT` für anon + authenticated, `SELECT/DELETE` für authenticated, ALL für service_role.
  - RLS: jeder darf einfügen (mit Längenprüfungen), nur `has_role(auth.uid(),'admin')` darf lesen/löschen.
  - Trigger auf `auth.users`-Insert nicht verwenden (reserviertes Schema) — stattdessen Security-Definer-Funktion `claim_first_admin()`, die nach dem Login aufgerufen wird und nur dann eine Admin-Rolle vergibt, wenn noch kein Admin existiert.
- Formular: Insert über Browser-Supabase-Client (`@/integrations/supabase/client`), zod-Validierung bleibt.
- Routen: `src/routes/auth.tsx` (öffentlich, eigenes head()), `src/routes/_authenticated/route.tsx` (Gate, ssr:false, Redirect nach /auth) + `src/routes/_authenticated/admin.tsx` (liest via Client mit RLS, prüft Rolle über `has_role`, noindex).
- `onAuthStateChange` einmal in `__root.tsx`; Sonner-Toaster für Meldungen.
- Projekt-Memory aktualisieren: „keine Datenbank" ersetzen durch „externes Supabase, niemals Lovable Cloud".
- Test mit Playwright: Bewerbung absenden → Registrieren/Login → Bewerbung erscheint in /admin.
