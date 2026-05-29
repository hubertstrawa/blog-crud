import { getSession } from "@/lib/session";
import Link from "next/link";
import SignInPanel from "./signInPanel";
import Profile from "./Profile";

const Navbar = async () => {
  const session = await getSession();
  return (
    <>
      <Link
        href="/"
        className="text-xl font-semibold tracking-tight px-2 py-1"
      >
        Ztrawy Blog
      </Link>
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 ml-auto md:p-1 md:rounded-full text-sm font-medium [&>a]:py-2 [&>a]:px-4 [&>a]:rounded-full [&>a]:transition-colors [&>a]:duration-200 [&>a]:hover:bg-current/10">
        <Link href="/">Blog</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>
        {session && session.user ? (
          <Profile user={session.user} />
        ) : (
          <SignInPanel />
        )}
      </div>
    </>
  );
};

export default Navbar;
