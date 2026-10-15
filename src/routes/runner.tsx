import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { TELEGRAM_HANDLE, TELEGRAM_URL } from "@/components/landing/config";
import { getRunnerImageUrl } from "@/lib/runner-image";

const telegramLogo = { url: "/images/telegram.png" };

/**最长 Wartezeit auf das Bild, danach erscheint die Seite trotzdem. */
const IMAGE_TIMEOUT_MS = 6000;

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
  const [ready, setReady] = useState(false);
  const loaderRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      if (!cancelled) setReady(true);
    };

    getRunnerImageUrl()
      .then((r) => {
        if (cancelled) return;
        const url = r?.url ?? null;
        setImageUrl(url);
        if (!url) {
          setReady(true);
          return;
        }
        const img = new Image();
        loaderRef.current = img;
        img.onload = finish;
        img.onerror = finish;
        img.src = url;
        timer = setTimeout(finish, IMAGE_TIMEOUT_MS);
      })
      .catch(() => {
        if (cancelled) return;
        setImageUrl(null);
        setReady(true);
      });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      const img = loaderRef.current;
      if (img) {
        img.onload = null;
        img.onerror = null;
        loaderRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "var(--pure-black)";
    return () => {
      document.body.style.backgroundColor = previous;
    };
  }, []);

  if (!ready) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-pure-black px-4">
        <span
          role="status"
          aria-label="Seite wird geladen"
          className="h-10 w-10 animate-spin rounded-full border-2 border-primary/25 border-t-primary"
        />
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-pure-black px-4 py-10">
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="max-h-[50vh] w-auto max-w-full rounded-xl"
        />
      )}
      <h1 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Kontaktiere uns über Telegram
      </h1>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-4 rounded-xl border border-border/70 bg-card px-8 py-6 transition-colors hover:border-primary/60"
      >
        <img
          src={telegramLogo.url}
          alt=""
          width={480}
          height={480}
          className="h-10 w-10 shrink-0"
        />
        <span className="text-lg font-bold text-foreground">{TELEGRAM_HANDLE}</span>
      </a>
    </main>
  );
}
