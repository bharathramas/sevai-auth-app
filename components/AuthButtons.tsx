"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Auto-redirect to /private after successful sign-in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/private");
    }
  }, [status, router]);

  if (status === "loading") return null;

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-white">Hi, {session.user.email}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("cognito")}
      className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200"
    >
      Sign in
    </button>
  );
}
