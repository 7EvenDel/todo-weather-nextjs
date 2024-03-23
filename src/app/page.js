import Header from "@/components/Header";
import Auth from "@/app/auth/page";
import Main from "@/components/Main";

export default function Home() {
  // const content = session && session.user ? <Main /> : <Auth />;
  return (
    <>
      <main className="flex min-h-[857px] flex-col bg-[url('/main-backdrop.png')] bg-fixed">
        {/* {content} */}Main
      </main>
    </>
  );
}
