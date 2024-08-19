"use client"; // to make it a client component
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot, faUser } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";

export default function Header({ session }: { session: Session | null }) {
  const name = session?.user?.name || "";
  const firstName = name?.split(" ")[0];
  return (
    <>
      <header className="mb-16">
        <div className="flex justify-between max-w-2xl mx-auto px-4 py-4">
          <Link href={"/"} className="inline-flex gap-1 items-center">
            <FontAwesomeIcon className="h-8" icon={faMugHot} />
            <span className="mt-2">Buy me a coffee</span>
          </Link>
          <nav className="mt-2 gap-6 flex items-center">
            <Link href={"/about"}>About</Link>
            <Link href={"/faq"}>FAQ</Link>
            <Link href={"/contact"}>Contact</Link>
            <div className="flex gap-4">
              {session && (
                <div className="">
                  <button className="flex items-center gap-2 bg-yellow-300 rounded-full p-1 pr-4">
                    <Image
                      src={session.user?.image as string}
                      alt="avatar"
                      height="36"
                      width="36"
                      className="rounded-full"
                    />
                    {firstName}
                  </button>
                </div>
              )}
              {!session && (
                <>
                  <button
                    onClick={() => signIn("google")}
                    className="border-2 rounded-full px-4 py-2 ml-4"
                  >
                    Login
                  </button>
                  <button className="bg-yellow-300 rounded-full px-4 py-2">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
