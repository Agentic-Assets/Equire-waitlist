import { LandingPage } from "./page.client";
import { connection } from "next/server";
import { getWaitlistCount } from "~/lib/utils";

export const dyamic = "force-dynamic";

export default async function Home() {
  const [waitlistPeople] = await Promise.all([
    await getWaitlistCount(),
    // forces the page to be dyamically rendered
    await connection(),
  ]);

  return <LandingPage waitlistPeople={waitlistPeople} />;
}
