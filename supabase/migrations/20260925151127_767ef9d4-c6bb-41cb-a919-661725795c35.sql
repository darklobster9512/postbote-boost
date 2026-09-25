CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE TABLE public.settings (
  key text PRIMARY KEY,
  value text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage settings" ON public.settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.applications ADD COLUMN notified_at timestamptz;
GRANT ALL ON public.applications TO service_role;

CREATE OR REPLACE FUNCTION public.notify_new_application()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  BEGIN
    PERFORM net.http_post(
      url := 'https://yivtnyoobtptczamdebj.supabase.co/functions/v1/notify-telegram',
      body := jsonb_build_object('id', NEW.id),
      headers := '{"Content-Type":"application/json"}'::jsonb
    );
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  RETURN NEW;
END; $$;
REVOKE EXECUTE ON FUNCTION public.notify_new_application() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER on_application_created AFTER INSERT ON public.applications
FOR EACH ROW EXECUTE FUNCTION public.notify_new_application();