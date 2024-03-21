"use client"

import { useSession, signOut, signIn } from "next-auth/react";

const SignInButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="">
        {session.user.name}
        <button onClick={() => signOut()}>sign out</button>
      </div>
    );
  }
  return (
    <div className="">
      <button onClick={() => signIn()}>sign in</button>
    </div>
  );
};

export default SignInButton;
