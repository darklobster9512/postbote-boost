import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getRunnerImageUrl, RUNNER_BUCKET, RUNNER_SETTING_KEY } from "@/lib/runner-image";

const TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX = 5 * 1024 * 1024;

export function RunnerImageSettings() {
  const [current, setCurrent] = useState<{ path: string; url: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = () => getRunnerImageUrl().then(setCurrent);
  useEffect(() => {
    void load();
  }, []);

  const upload = async (file: File) => {
    setStatus(null);
    if (!TYPES.includes(file.type)) return setStatus({ ok: false, text: "Bitte JPG, PNG oder WEBP wählen." });
    if (file.size > MAX) return setStatus({ ok: false, text: "Das Bild ist größer als 5 MB." });
    setBusy(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `runner-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from(RUNNER_BUCKET).upload(path, file, { contentType: file.type });
    if (upErr) {
      setBusy(false);
      return setStatus({ ok: false, text: "Hochladen hat nicht geklappt." });
    }
    const { error } = await supabase
      .from("settings")
      .upsert({ key: RUNNER_SETTING_KEY, value: path, updated_at: new Date().toISOString() });
    if (error) {
      await supabase.storage.from(RUNNER_BUCKET).remove([path]);
      setBusy(false);
      return setStatus({ ok: false, text: "Bild konnte nicht gespeichert werden." });
    }
    if (current?.path) await supabase.storage.from(RUNNER_BUCKET).remove([current.path]);
    await load();
    setBusy(false);
    setStatus({ ok: true, text: "Bild gespeichert – es erscheint jetzt auf /runner." });
  };

  const removeImage = async () => {
    if (!current) return;
    setBusy(true);
    await supabase.from("settings").delete().eq("key", RUNNER_SETTING_KEY);
    await supabase.storage.from(RUNNER_BUCKET).remove([current.path]);
    setCurrent(null);
    setBusy(false);
    setStatus({ ok: true, text: "Bild entfernt." });
  };

  return (
    <div className="mt-6 max-w-xl rounded-lg border border-border/70 bg-card p-6">
      <h2 className="text-lg font-extrabold text-foreground">Bild für /runner</h2>
      <p className="mt-1 text-sm text-muted-foreground">Wird über „Kontaktiere uns über Telegram" angezeigt. JPG, PNG oder WEBP, max. 5 MB.</p>
      {current ? (
        <img src={current.url} alt="Aktuelles Bild für /runner" className="mt-4 max-h-64 rounded-lg border border-border/70" />
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">Noch kein Bild hochgeladen.</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={TYPES.join(",")}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (f) void upload(f);
        }}
      />
      <div className="mt-4 flex gap-3">
        <button type="button" disabled={busy} onClick={() => inputRef.current?.click()} className="rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
          {busy ? "Bitte warten…" : "Bild hochladen"}
        </button>
        {current && (
          <button type="button" disabled={busy} onClick={removeImage} className="rounded-md border border-input px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent disabled:opacity-60">
            Bild entfernen
          </button>
        )}
      </div>
      {status && <p className={`mt-4 text-sm font-medium ${status.ok ? "text-primary" : "text-destructive"}`}>{status.text}</p>}
    </div>
  );
}
