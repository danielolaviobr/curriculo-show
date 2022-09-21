import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { forwardRef, ReactNode } from "react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { data, status } = useSession();
  const isLoggedin = status === "authenticated";
  const router = useRouter();
  const pathname = router.pathname.slice(1);

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex items-center flex-shrink-0">
                  <Link href="/">
                    <a className="flex items-center h-full text-2xl font-extrabold text-gray-900 outline-sky-500">
                      Curriculo <span className="text-sky-500">Show</span>
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/dashboard">
                    <a
                      className={classNames(
                        pathname === "dashboard"
                          ? "border-sky-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium outline-sky-500"
                      )}>
                      Dashboard
                    </a>
                  </Link>
                  <Link href="#">
                    <a
                      className={classNames(
                        pathname === "templates"
                          ? "border-sky-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium outline-sky-500"
                      )}>
                      Templates
                    </a>
                  </Link>
                  <Link href="/prices">
                    <a
                      className={classNames(
                        pathname === "prices"
                          ? "border-sky-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium outline-sky-500"
                      )}>
                      Preços
                    </a>
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {isLoggedin ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                        <span className="sr-only">Open user menu</span>
                        <UserCircleIcon className="w-10 h-10 text-gray-600 rounded-full" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <LinkWrap
                              href="/settings"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm font-medium text-gray-700"
                              )}>
                              Configurações
                            </LinkWrap>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                " w-full text-left px-4 py-2 text-sm font-medium text-gray-700"
                              )}>
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="flex items-center h-full space-x-4">
                    <Link href="/signup">
                      <a className="inline-flex items-center h-full text-sm font-medium text-gray-500 hover:text-gray-700">
                        Criar conta
                      </a>
                    </Link>
                    <Link href="/login">
                      <a className="inline-flex items-center h-full text-sm font-medium text-gray-500 hover:text-gray-700 group">
                        Login
                        <svg
                          className="mt-0.5 ml-2 -mr-1 stroke-gray-500 group-hover:stroke-gray-700 stroke-2"
                          fill="none"
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true">
                          <path
                            className="transition opacity-0 group-hover:opacity-100"
                            d="M0 5h7"></path>
                          <path
                            className="transition group-hover:translate-x-[3px]"
                            d="M1 1l4 4-4 4"></path>
                        </svg>
                      </a>
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex items-center -mr-2 sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Disclosure.Button
                as="a"
                href="/dashboard"
                className={classNames(
                  pathname === "dashboard"
                    ? "bg-sky-50 border-sky-500 text-sky-700"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700",
                  "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                )}>
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#templates"
                className={classNames(
                  pathname === "templates"
                    ? "bg-sky-50 border-sky-500 text-sky-700"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700",
                  "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                )}>
                Templates
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/prices"
                className={classNames(
                  pathname === "prices"
                    ? "bg-sky-50 border-sky-500 text-sky-700"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700",
                  "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                )}>
                Preço
              </Disclosure.Button>
            </div>
            {isLoggedin ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <UserCircleIcon className="w-10 h-10 text-gray-600 rounded-full" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {data?.user?.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {data?.user?.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="/settings"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                    Configurações
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    onClick={() => signOut()}
                    className="block w-full px-4 py-2 text-base font-medium text-left text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                    Logout
                  </Disclosure.Button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 space-y-1 border-t border-gray-200">
                <Link href="#" passHref>
                  <Disclosure.Button
                    as="a"
                    className="block w-full px-4 py-2 text-base font-medium text-left text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                    Login
                  </Disclosure.Button>
                </Link>
                <Link href="#" passHref>
                  <Disclosure.Button
                    as="a"
                    className="block w-full px-4 py-2 text-base font-medium text-left text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                    Criar conta
                  </Disclosure.Button>
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

interface LinkProps {
  href: string;
  children: ReactNode;
  [key: string]: any;
}

// eslint-disable-next-line react/display-name
const LinkWrap = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...rest }, ref) => {
    return (
      <Link href={href}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    );
  }
);
