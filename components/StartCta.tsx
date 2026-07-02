"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";

export function StartCta({ size = "lg" as const }: { size?: "sm" | "md" | "lg" }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  function handleClick() {
    if (session) {
      router.push("/onboarding");
    } else {
      signIn("google", { callbackUrl: "/onboarding" });
    }
  }

  return (
    <Button size={size} onClick={handleClick} disabled={status === "loading"}>
      Find My Resource
    </Button>
  );
}
