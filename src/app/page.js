"use client";

import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import Auth from "@/components/Auth";
import Main from "@/components/Main";

export default function Home() {
  const { data: session } = useSession();
  const content = session && session.user ? <Main /> : <Auth />;
  return (
    <>
      <Header />
      <main className="flex h-[857px] flex-col items-center bg-[url('/main-backdrop.png')] bg-cover">
        {content}
      </main>
    </>
  );
}
