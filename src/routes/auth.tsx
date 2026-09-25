import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Anmelden – ZusatzKurier Verwaltung" },
      { name: "description", content: "Anmeldung und Registrierung für den Verwaltungsbereich von ZusatzKurier." },
      { property: "og:title", content: "Anmelden – ZusatzKurier Verwaltung" },
      { property: "og:description", content: "Anmeldung für den Verwaltungsbereich von ZusatzKurier." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

const schema = z.object({
  email: z.string().trim().email("Bitte gib eine gültige E-Mail-Adresse an.").max(255),
  password: z.string().min(8, "Das Passwort braucht mindestens 8 Zeichen.").max(72),
});

const inputClass =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Ungültige Eingabe.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          ...parsed.data,
          options: { emailRedirectTo: `${window.location.origin}/auth` },
        });
        if (error) throw error;
        if (!data.session) {
          setInfo("Fast geschafft: Bitte bestätige deine E-Mail über den Link, den wir dir geschickt haben. Danach kannst du dich hier einloggen.");
          setMode("login");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword(parsed.data);
        if (error) throw error;
      }
      await navigate({ to: "/admin" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (/invalid login/i.test(msg)) setError("E-Mail oder Passwort ist falsch.");
      else if (/not confirmed/i.test(msg)) setError("Bitte bestätige zuerst deine E-Mail-Adresse.");
      else if (/already registered/i.test(msg)) setError("Für diese E-Mail gibt es schon ein Konto. Bitte einloggen.");
      else setError("Das hat nicht geklappt. Bitte versuche es erneut.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md rounded-lg border border-border/70 bg-card p-8">
        <a href="/" className="text-lg font-extrabold tracking-tight text-foreground">
          Zusatz<span className="text-primary">Kurier</span>
        </a>
        <h1 className="mt-6 text-2xl font-extrabold text-foreground">
          {mode === "login" ? "Einloggen" : "Konto erstellen"}
        </h1>
        <div className="mt-6 grid grid-cols-2 gap-1 rounded-md bg-background p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setError(null); }}
              className={`rounded px-3 py-2 text-sm font-bold transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {m === "login" ? "Einloggen" : "Registrieren"}
            </button>
          ))}
        </div>
        <form onSubmit={submit} noValidate className="mt-6 space-y-4">
          <div>
            <label htmlFor="auth-email" className="mb-1.5 block text-sm font-semibold text-foreground">E-Mail</label>
            <input id="auth-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="auth-password" className="mb-1.5 block text-sm font-semibold text-foreground">Passwort</label>
            <input id="auth-password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
          </div>
          {error && <p role="alert" className="text-sm font-medium text-destructive">{error}</p>}
          {info && <p className="text-sm font-medium text-primary">{info}</p>}
          <button type="submit" disabled={busy} className="w-full rounded-md bg-primary px-6 py-3 text-base font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60">
            {busy ? "Bitte warten…" : mode === "login" ? "Einloggen" : "Registrieren"}
          </button>
        </form>
      </div>
    </main>
  );
}
