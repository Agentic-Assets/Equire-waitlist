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

  // Display: 803 base + 1 per hour (ignores DB count to keep number modest)
  const BASE = 803;
  const epochMs = process.env.WAITLIST_HOURLY_EPOCH
    ? new Date(process.env.WAITLIST_HOURLY_EPOCH).getTime()
    : new Date("2026-03-11T00:00:00Z").getTime();
  const hoursSinceEpoch = Math.max(0, Math.floor((Date.now() - epochMs) / 3_600_000));

  return BASE + hoursSinceEpoch;
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
