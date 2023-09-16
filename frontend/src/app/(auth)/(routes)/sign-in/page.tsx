"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [googleLoading, setGoogleLoading] = useState(false);

  const signInWithGoogle = () => {
    setGoogleLoading(true);
    signIn("google", {
      callbackUrl: "http://localhost:3000/chat",
    });
    setGoogleLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={signInWithGoogle}
        className="flex items-center justify-center rounded-md border-2 border-purple-200 bg-purple-500 py-3 text-white transition-all duration-200 hover:bg-purple-600 px-4"
      >
        <Image src="/whitegoogle.png" width="20" height="20" alt="google" />
        <span className="text-md ml-4">
          {googleLoading ? "Loading..." : "Continue with Google"}
        </span>
      </button>
    </div>
  );
}
