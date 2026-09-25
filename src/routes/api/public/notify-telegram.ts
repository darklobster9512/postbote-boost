import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const esc = (s: unknown) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const bodySchema = z.union([
  z.object({ test: z.literal(true) }),
  z.object({ id: z.string().uuid() }),
]);

export const Route = createFileRoute("/api/public/notify-telegram")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = process.env["TELEGRAM_BOT_TOKEN"];
        if (!token) return Response.json({ error: "Bot-Token fehlt" }, { status: 500 });
        const parsed = bodySchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "Ungültige Anfrage" }, { status: 400 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const db = supabaseAdmin as any;

        const { data: setting } = await db
          .from("settings").select("value").eq("key", "telegram_chat_id").maybeSingle();
        const chatId = (setting?.value ?? "").trim();
        if (!chatId) return Response.json({ error: "Keine Chat-ID hinterlegt" }, { status: 400 });

        let text: string;
        if ("test" in parsed.data) {
          const jwt = (request.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
          const { data: u } = await supabaseAdmin.auth.getUser(jwt);
          if (!u?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });
          const { data: isAdmin } = await db.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
          if (!isAdmin) return Response.json({ error: "Forbidden" }, { status: 403 });
          text = "✅ Testnachricht: Telegram-Benachrichtigungen sind eingerichtet.";
        } else {
          const id = parsed.data.id;
          // Only notify once per application, and only for rows that really exist.
          const { data: app } = await db
            .from("applications").update({ notified_at: new Date().toISOString() })
            .eq("id", id).is("notified_at", null).select("*").maybeSingle();
          if (!app) return Response.json({ ok: true, skipped: true });
          text =
            `📬 <b>Neue Bewerbung</b>\n\n` +
            `<b>Name:</b> ${esc(app.name)}\n<b>E-Mail:</b> ${esc(app.email)}\n` +
            `<b>Telefon:</b> ${esc(app.phone)}\n<b>Gebiet:</b> ${esc(app.area)}\n` +
            `<b>Auszahlung:</b> ${esc(app.payout)}`;
        }

        const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
        });
        const out = await r.json().catch(() => ({}));
        if (!out.ok) {
          console.error(`Telegram failed [${r.status}]`, out);
          return Response.json({ error: out.description ?? "Telegram-Fehler" }, { status: 502 });
        }
        return Response.json({ ok: true });
      },
    },
  },
});
