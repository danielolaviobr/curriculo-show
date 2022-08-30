import { Menu } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";
import { forwardRef, Fragment, ReactNode } from "react";
import {
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function UserMenu() {
  const router = useRouter();

  const logout = async () => {
    await signOut();
    router.push("/");
  };
  return (
    <div className="w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-full text-gray-800">
            <UserCircleIcon className="w-10 h-10 " />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none space-y-1 p-1">
            <Menu.Item>
              {({ active }) => (
                <LinkWrap
                  href="#settings"
                  className={`${
                    active ? "bg-sky-500 text-white" : "text-gray-800"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                  <Cog6ToothIcon className="h-4 w-4 mr-2" />
                  Configurações
                </LinkWrap>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? "bg-sky-500 text-white" : "text-gray-800"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                  Sair
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
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
