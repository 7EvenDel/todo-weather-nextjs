"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "./button";

const SignInButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="mt-2">
        {session.user.name}
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }
  return (
    <div className="mt-2">
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
};

export default SignInButton;
