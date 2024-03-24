"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/weather");
  }, []);
  return (
    <>
      <main className="flex min-h-[857px] flex-col bg-[url('/main-backdrop.png')] bg-fixed">
        <Image
          className="mx-auto mt-40"
          src="/Gear-0.2s-200px.gif"
          width={200}
          height={200}
          alt="Loading..."
        />
      </main>
    </>
  );
}
