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
  const base = (count ?? 0) + WAITLIST_OFFSET;

  // Add 1 for each hour since the epoch (optional env: WAITLIST_HOURLY_EPOCH, ISO date)
  const epochMs = process.env.WAITLIST_HOURLY_EPOCH
    ? new Date(process.env.WAITLIST_HOURLY_EPOCH).getTime()
    : new Date("2025-03-10T00:00:00Z").getTime();
  const hoursSinceEpoch = Math.max(0, Math.floor((Date.now() - epochMs) / 3_600_000));

  return base + hoursSinceEpoch;
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
