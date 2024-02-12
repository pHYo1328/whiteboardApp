import Link from "next/link";
import { WhiteBoardsDisplayPanel } from "./_components/WhiteBoardsDisplayPanel";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {

  const session = await getServerAuthSession();
  return (
    <>
      <header className="sticky top-0 flex flex-row items-center justify-between p-2 bg-purple-600">
        <b className="text-white italic scr">INC WHITEBOARD PET PROJECT</b>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>

      </header>
      {session ? <WhiteBoardsDisplayPanel /> : <></>}
    </>

  );
}