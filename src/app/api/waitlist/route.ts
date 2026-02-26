import { NextResponse } from "next/server";
import { getSupabase } from "~/lib/supabase";
import { generateCode } from "~/lib/utils";

export async function POST(request: Request) {
  try {
    const { email, firstname, referredBy } = await request.json();
    const supabase = getSupabase();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    // Check for duplicate email
    const { data: existing } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "You're already on the waitlist!" },
        { status: 409 },
      );
    }

    // Generate unique referral code
    const code = generateCode();

    // Find referrer by matching referral code
    let referrerId: string | null = null;
    if (referredBy) {
      const { data: referrer } = await supabase
        .from("waitlist")
        .select("id")
        .eq("referral_code", referredBy)
        .limit(1);

      if (referrer && referrer.length > 0) {
        referrerId = referrer[0].id;
      }
    }

    // Insert new entry
    const { data: inserted, error: insertError } = await supabase
      .from("waitlist")
      .insert({
        name: firstname || email.split("@")[0],
        email,
        referral_code: code,
        referred_by: referredBy || null,
        referrer_id: referrerId,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Supabase insert error:", insertError.message);
      return NextResponse.json(
        {
          error: "Failed to save to waitlist",
          details: insertError.message,
          success: false,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Added to waitlist",
        code,
        id: inserted.id,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Waitlist API error:", error.message);

      return NextResponse.json(
        {
          error: "Failed to save to waitlist",
          details: error.message,
          success: false,
        },
        { status: 500 },
      );
    }
  }
}
