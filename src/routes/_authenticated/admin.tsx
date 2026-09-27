import { Fragment, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TelegramSettings } from "@/components/admin/TelegramSettings";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Bewerbungen – ZusatzKurier Verwaltung" },
      { name: "description", content: "Übersicht aller eingegangenen Bewerbungen." },
      { property: "og:title", content: "Bewerbungen – ZusatzKurier Verwaltung" },
      { property: "og:description", content: "Übersicht aller eingegangenen Bewerbungen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  payout: string;
  message: string | null;
  is_postbote: boolean;
  created_at: string;
  status: Status;
};

type Status = "neu" | "mailbox" | "interessiert" | "kein_interesse";
const STATUSES: { v: Status; l: string; c: string }[] = [
  { v: "neu", l: "Neu", c: "border-primary text-primary" },
  { v: "mailbox", l: "Mailbox", c: "border-muted-foreground text-muted-foreground" },
  { v: "interessiert", l: "Interessiert", c: "border-emerald-500 text-emerald-400" },
  { v: "kein_interesse", l: "Kein Interesse", c: "border-destructive text-destructive" },
];

const fmt = (d: string) =>
  new Date(d).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" });

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openId, setOpenId] = useState<string | null>(null);
  const [tab, setTab] = useState<"apps" | "telegram">("apps");

  const adminQuery = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("claim_first_admin");
      if (error) throw error;
      return Boolean(data);
    },
  });

  const appsQuery = useQuery({
    queryKey: ["applications"],
    enabled: adminQuery.data === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Application[];
    },
  });

  const setStatus = async (id: string, status: Status) => {
    const prev = queryClient.getQueryData<Application[]>(["applications"]);
    queryClient.setQueryData<Application[]>(["applications"], (old) =>
      old?.map((a) => (a.id === id ? { ...a, status } : a)),
    );
    const { error } = await supabase.from("applications").update({ status }).eq("id", id);
    if (error) {
      queryClient.setQueryData(["applications"], prev);
      toast.error("Status konnte nicht gespeichert werden.");
    }
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            Zusatz<span className="text-primary">Kurier</span>{" "}
            <span className="font-medium text-muted-foreground">Verwaltung</span>
          </span>
          <button onClick={signOut} className="rounded-md border border-input px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent">
            Abmelden
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {adminQuery.isLoading && <p className="text-muted-foreground">Lade…</p>}
        {adminQuery.isError && <p className="text-destructive">Zugriff konnte nicht geprüft werden.</p>}
        {adminQuery.data === false && (
          <div className="rounded-lg border border-border/70 bg-card p-8">
            <h1 className="text-2xl font-extrabold text-foreground">Kein Zugriff</h1>
            <p className="mt-2 text-muted-foreground">Dein Konto hat keine Admin-Berechtigung.</p>
          </div>
        )}
        {adminQuery.data === true && (
          <>
            <div className="mb-8 flex gap-1 rounded-md bg-card p-1 w-fit">
              {([["apps", "Bewerbungen"], ["telegram", "Telegram"]] as const).map(([k, l]) => (
                <button key={k} onClick={() => setTab(k)} className={`rounded px-4 py-2 text-sm font-bold ${tab === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{l}</button>
              ))}
            </div>
            {tab === "telegram" && (<><h1 className="text-3xl font-extrabold tracking-tight text-foreground">Telegram</h1><TelegramSettings /></>)}
            {tab === "apps" && (<>
            <div className="flex items-end justify-between gap-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Bewerbungen</h1>
              <span className="text-sm text-muted-foreground">{appsQuery.data?.length ?? 0} insgesamt</span>
            </div>
            {appsQuery.isLoading && <p className="mt-6 text-muted-foreground">Lade Bewerbungen…</p>}
            {appsQuery.isError && <p className="mt-6 text-destructive">Bewerbungen konnten nicht geladen werden.</p>}
            {appsQuery.data && appsQuery.data.length === 0 && (
              <p className="mt-6 text-muted-foreground">Noch keine Bewerbungen eingegangen.</p>
            )}
            {appsQuery.data && appsQuery.data.length > 0 && (
              <div className="mt-6 overflow-x-auto rounded-lg border border-border/70 bg-card">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border/70 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">Eingang</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">E-Mail</th>
                      <th className="px-4 py-3">Telefon</th>
                      <th className="px-4 py-3">Gebiet</th>
                      <th className="px-4 py-3">Auszahlung</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appsQuery.data.map((a) => (
                      <Fragment key={a.id}>
                        <tr onClick={() => setOpenId(openId === a.id ? null : a.id)} className="cursor-pointer border-b border-border/40 text-foreground hover:bg-accent/40">
                          <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{fmt(a.created_at)}</td>
                          <td className="px-4 py-3 font-semibold">{a.name}</td>
                          <td className="px-4 py-3"><a href={`mailto:${a.email}`} onClick={(e) => e.stopPropagation()} className="text-primary hover:underline">{a.email}</a></td>
                          <td className="whitespace-nowrap px-4 py-3">{a.phone}</td>
                          <td className="px-4 py-3">{a.area}</td>
                          <td className="px-4 py-3">{a.payout}</td>
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <select
                              aria-label="Status"
                              value={a.status ?? "neu"}
                              onChange={(e) => setStatus(a.id, e.target.value as Status)}
                              className={`rounded-md border bg-background px-2 py-1 text-sm font-semibold ${STATUSES.find((s) => s.v === (a.status ?? "neu"))?.c}`}
                            >
                              {STATUSES.map((s) => (
                                <option key={s.v} value={s.v} className="text-foreground">{s.l}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        {openId === a.id && (
                          <tr className="border-b border-border/40 bg-background/60">
                            <td colSpan={7} className="px-4 py-4 text-foreground">
                              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Nachricht</p>
                              <p className="mt-1 whitespace-pre-wrap">{a.message || "–"}</p>
                              <p className="mt-3 text-xs text-muted-foreground">
                                Bestätigt als Briefzusteller der Deutschen Post: {a.is_postbote ? "Ja" : "Nein"}
                              </p>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            </>)}
          </>
        )}
      </div>
    </main>
  );
}
