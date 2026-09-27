import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const inputClass =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

const schema = z
  .object({
    current: z.string().min(1, "Bitte aktuelles Passwort eingeben."),
    next: z.string().min(8, "Das neue Passwort muss mindestens 8 Zeichen haben.").max(72, "Das neue Passwort ist zu lang."),
    repeat: z.string(),
  })
  .refine((d) => d.next === d.repeat, { message: "Die neuen Passwörter stimmen nicht überein." })
  .refine((d) => d.next !== d.current, { message: "Das neue Passwort muss sich vom aktuellen unterscheiden." });

export function AccountSettings() {
  const [email, setEmail] = useState("");
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [repeat, setRepeat] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const parsed = schema.safeParse({ current, next, repeat });
    if (!parsed.success) {
      setStatus({ ok: false, text: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." });
      return;
    }
    setBusy(true);
    const { error: authErr } = await supabase.auth.signInWithPassword({ email, password: current });
    if (authErr) {
      setStatus({ ok: false, text: "Das aktuelle Passwort ist falsch." });
      setBusy(false);
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: next });
    if (error) {
      setStatus({ ok: false, text: "Passwort konnte nicht geändert werden. Bitte versuche es erneut." });
    } else {
      setStatus({ ok: true, text: "Passwort wurde geändert." });
      setCurrent(""); setNext(""); setRepeat("");
    }
    setBusy(false);
  };

  return (
    <div className="mt-6 max-w-xl rounded-lg border border-border/70 bg-card p-6">
      <p className="text-sm text-muted-foreground">Angemeldet als</p>
      <p className="font-semibold text-foreground">{email || "–"}</p>
      <h2 className="mt-6 text-lg font-extrabold text-foreground">Passwort ändern</h2>
      <form onSubmit={save} className="mt-4 space-y-4">
        <div>
          <label htmlFor="pw-current" className="mb-1.5 block text-sm font-semibold text-foreground">Aktuelles Passwort</label>
          <input id="pw-current" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="pw-next" className="mb-1.5 block text-sm font-semibold text-foreground">Neues Passwort</label>
          <input id="pw-next" type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="pw-repeat" className="mb-1.5 block text-sm font-semibold text-foreground">Neues Passwort wiederholen</label>
          <input id="pw-repeat" type="password" autoComplete="new-password" value={repeat} onChange={(e) => setRepeat(e.target.value)} className={inputClass} />
        </div>
        <button type="submit" disabled={busy} className="rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
          {busy ? "Speichere…" : "Passwort speichern"}
        </button>
      </form>
      {status && <p className={`mt-4 text-sm font-medium ${status.ok ? "text-primary" : "text-destructive"}`}>{status.text}</p>}
    </div>
  );
}
