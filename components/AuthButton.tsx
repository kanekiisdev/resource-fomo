"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/Button";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-8 w-20 rounded-md bg-surface animate-pulse" />;
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted hidden sm:inline">
          {session.user?.name?.split(" ")[0]}
        </span>
        <Button size="sm" variant="secondary" onClick={() => signOut({ callbackUrl: "/" })}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <Button size="sm" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
      Sign in with Google
    </Button>
  );
}
