import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TELEGRAM_HANDLE, TELEGRAM_URL } from "@/components/landing/config";
import { getRunnerImageUrl } from "@/lib/runner-image";

const telegramLogo = { url: "/images/telegram.png" };

export const Route = createFileRoute("/runner")({
  head: () => ({
    meta: [
      { title: "Kontakt über Telegram – ZusatzKurier" },
      {
        name: "description",
        content: "Kontaktiere uns über Telegram: @call_agency.",
      },
      { property: "og:title", content: "Kontakt über Telegram – ZusatzKurier" },
      {
        property: "og:description",
        content: "Kontaktiere uns über Telegram: @call_agency.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RunnerPage,
});

function RunnerPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    getRunnerImageUrl()
      .then((r) => setImageUrl(r?.url ?? null))
      .catch(() => setImageUrl(null));
  }, []);

  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "var(--pure-black)";
    return () => {
      document.body.style.backgroundColor = previous;
    };
  }, []);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-pure-black px-4 py-10">
      {imageUrl && (
        <img src={imageUrl} alt="" className="max-h-[50vh] w-auto max-w-full rounded-xl" />
      )}
      <h1 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Kontaktiere uns über Telegram
      </h1>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-lg border border-border/70 bg-card px-5 py-4 transition-colors hover:border-primary/60"
      >
        <img
          src={telegramLogo.url}
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
