import Header from "@/components/Header";
import Link from "next/link";

const Auth = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center  p-24 bg-[url('/main-backdrop.png')] bg-cover">
        <h1 className=" text-2xl">auth page</h1>

        <Link href="/">/app</Link>
      </main>
    </>
  );
};

export default Auth;
