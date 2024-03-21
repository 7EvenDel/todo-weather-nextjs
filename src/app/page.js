// import getUserSession
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-24 bg-[url('/main-backdrop.png')] bg-cover">
        <h1 className=" text-2xl">main page</h1>

        <Link href="/auth">/auth</Link>
      </main>
    </>
  );
}
