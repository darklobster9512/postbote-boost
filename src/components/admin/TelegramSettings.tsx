import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const inputClass =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

export function TelegramSettings() {
  const [chatId, setChatId] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const db = supabase as any;

  useEffect(() => {
    db.from("settings").select("value").eq("key", "telegram_chat_id").maybeSingle()
      .then(({ data }: any) => setChatId(data?.value ?? ""));
  }, []);

  const save = async () => {
    setBusy(true); setStatus(null);
    const v = chatId.trim();
    if (!/^-?\d+$/.test(v) && !/^@\w+$/.test(v)) {
      setStatus({ ok: false, text: "Bitte eine gültige Chat-ID eingeben (z. B. 123456789 oder -100…)." });
      setBusy(false); return;
    }
    const { error } = await db.from("settings")
      .upsert({ key: "telegram_chat_id", value: v, updated_at: new Date().toISOString() });
    setStatus(error ? { ok: false, text: "Speichern fehlgeschlagen." } : { ok: true, text: "Chat-ID gespeichert." });
    setBusy(false);
  };

  const test = async () => {
    setBusy(true); setStatus(null);
    const { data } = await supabase.auth.getSession();
    const r = await fetch("/api/public/notify-telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${data.session?.access_token ?? ""}` },
      body: JSON.stringify({ test: true }),
    });
    const out = await r.json().catch(() => ({}));
    setStatus(r.ok ? { ok: true, text: "Testnachricht gesendet." } : { ok: false, text: `Fehler: ${out.error ?? r.status}` });
    setBusy(false);
  };

  return (
    <div className="mt-6 max-w-xl rounded-lg border border-border/70 bg-card p-6">
      <p className="text-sm text-muted-foreground">
        Bei jeder neuen Bewerbung schickt dein Bot Name, E-Mail, Telefon, Gebiet und Auszahlungsart an diese Chat-ID. Der Bot-Token ist sicher hinterlegt.
      </p>
      <label htmlFor="chat-id" className="mb-1.5 mt-5 block text-sm font-semibold text-foreground">Chat-ID</label>
      <input id="chat-id" value={chatId} onChange={(e) => setChatId(e.target.value)} placeholder="123456789" className={inputClass} />
      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={save} disabled={busy} className="rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">Speichern</button>
        <button onClick={test} disabled={busy} className="rounded-md border border-input px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent disabled:opacity-60">Testnachricht senden</button>
      </div>
      {status && <p className={`mt-4 text-sm font-medium ${status.ok ? "text-primary" : "text-destructive"}`}>{status.text}</p>}
    </div>
  );
}
