"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButtons() {
  const sessionHook = useSession();
  const session = sessionHook?.data;

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-white">Hi, {session.user.email}</span>
        <button
          onClick={() => signOut()}
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
