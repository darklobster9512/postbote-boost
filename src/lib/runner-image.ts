import { supabase } from "@/integrations/supabase/client";

export const RUNNER_BUCKET = "runner";
export const RUNNER_SETTING_KEY = "runner_image_path";

/** Returns a viewable URL for the current /runner image, or null if none is set. */
export async function getRunnerImageUrl(): Promise<{ path: string; url: string } | null> {
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", RUNNER_SETTING_KEY)
    .maybeSingle();
  const path = data?.value;
  if (!path) return null;
  const { data: signed } = await supabase.storage
    .from(RUNNER_BUCKET)
    .createSignedUrl(path, 60 * 60 * 24);
  return signed?.signedUrl ? { path, url: signed.signedUrl } : null;
}
