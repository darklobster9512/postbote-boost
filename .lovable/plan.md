# Reiter "Einstellungen" mit Passwort ändern

## Was du bekommst
- Auf /admin kommt neben „Bewerbungen" und „Telegram" ein dritter Reiter **Einstellungen**.
- Dort steht die E-Mail-Adresse deines Kontos und ein Bereich **Passwort ändern** mit drei Feldern: aktuelles Passwort, neues Passwort (mindestens 8 Zeichen), neues Passwort wiederholen.
- Knopf „Passwort speichern". Danach erscheint eine Bestätigung, oder eine verständliche Fehlermeldung, z. B. wenn das aktuelle Passwort falsch ist oder die neuen Passwörter nicht übereinstimmen.
- Du bleibst nach der Änderung eingeloggt.

## Technische Details
- Neue Komponente `src/components/admin/AccountSettings.tsx`, gleiche Optik wie TelegramSettings.
- Prüfung mit zod (min. 8 Zeichen, Wiederholung gleich, neues Passwort ungleich altem).
- Das aktuelle Passwort wird mit `supabase.auth.signInWithPassword({ email, password: current })` geprüft. Danach wird das neue Passwort mit `supabase.auth.updateUser({ password })` gesetzt.
- admin.tsx: Reiter-Liste um `["settings","Einstellungen"]` erweitern und die Komponente rendern.
