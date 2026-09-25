import { Fragment, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
};

const fmt = (d: string) =>
  new Date(d).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" });

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openId, setOpenId] = useState<string | null>(null);

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
                        </tr>
                        {openId === a.id && (
                          <tr className="border-b border-border/40 bg-background/60">
                            <td colSpan={6} className="px-4 py-4 text-foreground">
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
          </>
        )}
      </div>
    </main>
  );
}
