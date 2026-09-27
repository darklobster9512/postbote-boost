CREATE TYPE public.application_status AS ENUM ('neu','mailbox','interessiert','kein_interesse');
ALTER TABLE public.applications ADD COLUMN status public.application_status NOT NULL DEFAULT 'neu';
GRANT UPDATE (status) ON public.applications TO authenticated;
CREATE POLICY "Admins update" ON public.applications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));