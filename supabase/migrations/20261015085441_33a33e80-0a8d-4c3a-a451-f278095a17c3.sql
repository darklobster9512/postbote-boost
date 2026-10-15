CREATE POLICY "Runner images readable" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'runner');
CREATE POLICY "Admins upload runner images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'runner' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update runner images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'runner' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete runner images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'runner' AND public.has_role(auth.uid(), 'admin'));
GRANT SELECT ON public.settings TO anon, authenticated;
CREATE POLICY "Public read runner image setting" ON public.settings FOR SELECT TO anon, authenticated USING (key = 'runner_image_path');