import Link from "next/link";
import { NextPage } from "next/types";

const ForgotPassword: NextPage = (props) => {
  return (
    <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24 min-h-screen">
      <div className="relative max-w-xl mx-auto">
        <svg
          className="absolute left-full transform translate-x-1/2 "
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true">
          <defs>
            <pattern
              id="3a666081-514a-4e27-88d0-8b5db5f87fe0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse">
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={404}
            fill="url(#3a666081-514a-4e27-88d0-8b5db5f87fe0)"
          />
        </svg>
        <svg
          className="absolute right-full bottom-0 transform -translate-x-1/2 translate-y-3/4"
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true">
          <defs>
            <pattern
              id="3a666081-514a-4e27-88d0-8b5db5f87fe0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse">
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={404}
            fill="url(#3a666081-514a-4e27-88d0-8b5db5f87fe0)"
          />
        </svg>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Recuperar senha
          </h2>
        </div>
        <div className="mt-12">
          <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  required
                  aria-required
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="py-3 px-4 block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-150">
                Recuperar senha
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
