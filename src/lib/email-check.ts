import { getSupabase } from "./supabase";

export async function checkEmailExists(email: string) {
  const { data } = await getSupabase()
    .from("waitlist")
    .select("id")
    .eq("email", email)
    .limit(1);

  return (data?.length ?? 0) > 0;
}
