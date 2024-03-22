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
      <main className="flex min-h-[857px] flex-col bg-[url('/main-backdrop.png')] bg-fixed">
        {content}
      </main>
    </>
  );
}
