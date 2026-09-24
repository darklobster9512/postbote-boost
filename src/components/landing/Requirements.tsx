import { AlertTriangle, BadgeCheck, Briefcase, HeartHandshake, Route } from "lucide-react";

const REQUIREMENTS = [
  {
    icon: Briefcase,
    title: "Angestellt bei der Deutschen Post",
    text: "Du bist aktuell fest als Postbote/Briefträger (Briefzustellung) bei der Deutschen Post beschäftigt.",
  },
  {
    icon: Route,
    title: "Deine normale Tour",
    text: "Du hast einen festen Zustellbezirk bzw. eine Tour, auf der unsere Briefe einfach mitlaufen.",
  },
  {
    icon: HeartHandshake,
    title: "Zuverlässig & sorgfältig",
    text: "Briefe kommen bei uns genauso an, wie du sie bei der Post behandelst: vollständig und pünktlich.",
  },
];

export default function Requirements() {
  return (
    <section id="voraussetzungen" className="bg-card/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Das musst du mitbringen
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Kurz gesagt: Du machst deinen Job genau wie bisher – unsere Briefe reisen einfach mit.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REQUIREMENTS.map((req) => (
            <div
              key={req.title}
              className="rounded-lg border border-border/70 bg-card p-7 transition-colors hover:border-primary/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/15">
                <req.icon className="h-6 w-6 text-primary" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mt-5 flex items-start gap-2 text-lg font-bold text-foreground">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                {req.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{req.text}</p>
            </div>
          ))}
        </div>

        <div
          role="alert"
          className="mt-10 flex flex-col gap-4 rounded-lg border border-destructive/60 bg-destructive/10 p-6 sm:flex-row sm:items-center"
        >
          <AlertTriangle className="h-8 w-8 shrink-0 text-destructive" aria-hidden="true" />
          <div>
            <p className="text-lg font-bold text-foreground">
              Wichtig: Wir werben nicht ab – und wir suchen nur Briefzusteller.
            </p>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              Kein Wechsel zu uns, keine Kündigung bei der Post nötig. Und ganz klar:{" "}
              <span className="font-semibold text-destructive">
                Keine Paketzusteller, keine externen Kuriere
              </span>{" "}
              – nur angestellte Postboten/Briefträger der Deutschen Post.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
