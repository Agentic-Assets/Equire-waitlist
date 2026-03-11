import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { getSupabase } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getWaitlistCount() {
  const { count, error } = await getSupabase()
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Error fetching waitlist count:", error);
    throw error;
  }

  const WAITLIST_OFFSET = 237;
  return (count ?? 0) + WAITLIST_OFFSET;
}

// Simple referral code generator used in the waitlist API route
const REFERRAL_CODE_CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateCode(length = 8): string {
  let code = "";
  const charsetLength = REFERRAL_CODE_CHARSET.length;

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * charsetLength);
    code += REFERRAL_CODE_CHARSET[index];
  }

  return code;
}
