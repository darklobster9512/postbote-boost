import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import { PAYOUT_METHODS, PAYOUT_NOTE } from "./config";
import { supabase } from "@/integrations/supabase/client";

const applicationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Bitte gib deinen Namen an.")
    .max(100, "Name ist zu lang (max. 100 Zeichen)."),
  email: z
    .string()
    .trim()
    .email("Bitte gib eine gültige E-Mail-Adresse an.")
    .max(255, "E-Mail-Adresse ist zu lang."),
  phone: z
    .string()
    .trim()
    .min(6, "Bitte gib eine gültige Telefonnummer an.")
    .max(30, "Telefonnummer ist zu lang."),
  area: z
    .string()
    .trim()
    .min(3, "Bitte gib PLZ oder Bezirk deiner Tour an.")
    .max(120, "Angabe ist zu lang (max. 120 Zeichen)."),
  payout: z.enum(PAYOUT_METHODS, {
    errorMap: () => ({ message: "Bitte wähle deine bevorzugte Auszahlung." }),
  }),
  message: z.string().trim().max(1000, "Nachricht ist zu lang (max. 1000 Zeichen).").optional(),
  isPostbote: z.literal(true, {
    errorMap: () => ({
      message:
        "Bitte bestätige, dass du als Postbote/Briefträger bei der Deutschen Post angestellt bist.",
    }),
  }),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}




const inputClass =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm font-medium text-destructive">{message}</p>;
}

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      area: "",
      payout: "Bar",
      message: "",
    },
  });

  const onSubmit = async (values: ApplicationValues) => {
    setSubmitError(null);
    const { error } = await supabase.from("applications").insert({
      name: values.name,
      email: values.email,
      phone: values.phone,
      area: values.area,
      payout: values.payout,
      message: values.message ? values.message : null,
      is_postbote: values.isPostbote,
    });
    if (error) {
      console.error(error);
      setSubmitError("Deine Bewerbung konnte nicht gesendet werden. Bitte versuche es gleich noch einmal.");
      return;
    }
    window.fbq?.("track", "Lead");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="bewerbung" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-lg border border-primary/50 bg-card p-10 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-primary" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-extrabold text-foreground">Danke für deine Bewerbung!</h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
              Wir haben deine Angaben erhalten und melden uns innerhalb von zwei Werktagen bei
              dir. Du bleibst ganz normal Postbote bei der Deutschen Post – versprochen.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="bewerbung" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Jetzt bewerben
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Zwei Minuten ausfüllen – wir melden uns innerhalb von zwei Werktagen.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-10 rounded-lg border border-border/70 bg-card p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-foreground">
                Name *
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                maxLength={100}
                className={inputClass}
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              <FieldError message={errors.name?.message} />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-foreground">
                E-Mail *
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                maxLength={255}
                className={inputClass}
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-foreground">
                Telefon *
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                maxLength={30}
                className={inputClass}
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />
              <FieldError message={errors.phone?.message} />
            </div>

            <div>
              <label htmlFor="area" className="mb-1.5 block text-sm font-semibold text-foreground">
                PLZ / Bezirk deiner Tour *
              </label>
              <input
                id="area"
                type="text"
                maxLength={120}
                placeholder="z.B. 10115 Berlin-Mitte"
                className={inputClass}
                aria-invalid={!!errors.area}
                {...register("area")}
              />
              <FieldError message={errors.area?.message} />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="payout" className="mb-1.5 block text-sm font-semibold text-foreground">
                Bevorzugte Auszahlung *
              </label>
              <select
                id="payout"
                className={inputClass}
                aria-invalid={!!errors.payout}
                {...register("payout")}
              >
                {PAYOUT_METHODS.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
              <FieldError message={errors.payout?.message} />
              <p className="mt-1.5 text-xs text-muted-foreground">
                Steuerfrei – Auszahlung bar oder in Krypto, ohne Abrechnung über die Deutsche Post.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-foreground">
                Nachricht <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <textarea
                id="message"
                rows={4}
                maxLength={1000}
                placeholder="Etwas zu deiner Tour, deinen Wunschtagen oder deinen Fragen …"
                className={`${inputClass} resize-y`}
                {...register("message")}
              />
              <FieldError message={errors.message?.message} />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="isPostbote" className="flex cursor-pointer items-start gap-3">
              <input
                id="isPostbote"
                type="checkbox"
                className="mt-1 h-5 w-5 shrink-0 accent-[var(--primary)]"
                aria-invalid={!!errors.isPostbote}
                {...register("isPostbote")}
              />
              <span className="text-sm leading-relaxed text-muted-foreground">
                Ich bestätige, dass ich aktuell als{" "}
                <span className="font-semibold text-foreground">
                  Postbote/Briefträger bei der Deutschen Post angestellt
                </span>{" "}
                bin. (Paketzusteller und Externe können leider nicht berücksichtigt werden.)
              </span>
            </label>
            <FieldError message={errors.isPostbote?.message} />
          </div>

          {submitError && (
            <p role="alert" className="mt-6 text-sm font-medium text-destructive">
              {submitError}
            </p>
          )}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3.5 text-base font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {isSubmitting ? "Wird gesendet …" : "Bewerbung absenden"}
            </button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {PAYOUT_NOTE} Deine Angaben werden ausschließlich zur Bearbeitung deiner Bewerbung
              verwendet.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
