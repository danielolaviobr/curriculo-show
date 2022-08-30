import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Spinner from "./spinner";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import UserMenu from "./userMenu";

export default function Header() {
  const { status } = useSession();
  const { pathname } = useRouter();
  console.log(pathname);

  return (
    <header className="w-full h-24 flex items-center justify-between">
      <nav className="flex items-baseline space-x-4">
        <Link href="/">
          <a className="font-extrabold text-2xl text-gray-800">
            Curriculo <span className="text-sky-500 -ml-1">Show</span>
          </a>
        </Link>
        <Link href="#templates">
          <a className="font-medium text-lg text-gray-600 hover:bg-sky-100 hover:text-sky-600 px-2 py-1 rounded-lg transition duration-75">
            Templates
          </a>
        </Link>
        {status === "authenticated" ? (
          <Link href="#price">
            <a className="font-medium text-lg text-white bg-emerald-500 hover:bg-emerald-600 px-2 py-1 rounded-lg transition duration-75 flex items-center">
              <SparklesIcon className="h-4 w-4 mr-1" />
              Seja Premium
            </a>
          </Link>
        ) : (
          <Link href="#price">
            <a className="font-medium text-lg text-gray-600 hover:bg-sky-100 hover:text-sky-600 px-2 py-1 rounded-lg transition duration-75">
              Preços
            </a>
          </Link>
        )}
      </nav>
      {pathname !== "/dashboard" ? (
        <section>
          {status === "unauthenticated" ? (
            <div className="space-x-4">
              <Link href="/login">
                <a className="font-medium text-lg text-sky-600 hover:text-sky-700 hover:underline hover:decoration-sky-700 px-2 py-1 rounded transition duration-75">
                  Login
                </a>
              </Link>
              <Link href="/signup">
                <a className="font-medium text-lg text-white bg-sky-500 hover:bg-sky-600 px-3 py-2 rounded transition duration-75">
                  Criar conta
                </a>
              </Link>
            </div>
          ) : status === "authenticated" ? (
            <Link href="/dashboard">
              <a className="font-medium text-lg text-white bg-sky-500 hover:bg-sky-600 px-3 py-2 rounded transition duration-75">
                Dashboard
              </a>
            </Link>
          ) : (
            <Spinner />
          )}
        </section>
      ) : (
        <UserMenu />
      )}
    </header>
  );
}
