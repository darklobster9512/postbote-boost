import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TELEGRAM_HANDLE, TELEGRAM_URL } from "@/components/landing/config";

export const Route = createFileRoute("/runner")({
  head: () => ({
    meta: [
      { title: "Kontakt über Telegram – ZusatzKurier" },
      {
        name: "description",
        content: "Kontaktiere ZusatzKurier über Telegram: @call_agency.",
      },
      { property: "og:title", content: "Kontakt über Telegram – ZusatzKurier" },
      {
        property: "og:description",
        content: "Kontaktiere ZusatzKurier über Telegram: @call_agency.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RunnerPage,
});

function RunnerPage() {
  useEffect(() => {
    document.body.classList.add("bg-void");
    return () => document.body.classList.remove("bg-void");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-void px-4 py-10 text-center">
      <img
        src="/images/runner-hero.png"
        alt=""
        width={1600}
        height={900}
        className="w-full max-w-[640px] rounded-xl"
      />
      <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
        Kontaktiere uns über Telegram
      </h1>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-lg border border-border/70 bg-card px-4 py-3 transition-colors hover:border-primary/60"
      >
        <img
          src="/images/telegram.png"
          alt=""
          width={480}
          height={480}
          className="h-7 w-7 shrink-0"
        />
        <span className="text-sm font-bold text-foreground">{TELEGRAM_HANDLE}</span>
      </a>
    </main>
  );
}
