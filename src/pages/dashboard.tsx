import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { unstable_getServerSession } from "next-auth";
import Header from "../components/header";
import { authOptions } from "./api/auth/[...nextauth]";
import {
  PencilSquareIcon,
  ArrowDownOnSquareIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import formatRelative from "date-fns/formatRelative";
import ptBR from "date-fns/locale/pt-BR";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import Spinner from "../components/spinner";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  resumes: {
    id: string;
    resumeTitle: string | null;
    previewImage: string | null;
    updatedAt: Date;
  }[];
}

const Dashboard: NextPage<Props> = ({
  resumes: initialResumes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [resumes, setResumes] = useState(initialResumes);
  const duplicateMutation = trpc.useMutation(["resume.duplicate"], {
    onSuccess: ({ resume }) => {
      setResumes((resumes) => [...resumes, resume]);
    },
  });
  const deleteMutation = trpc.useMutation(["resume.delete"], {
    onSuccess: ({ id }) => {
      setResumes((resumes) => resumes.filter((resume) => resume.id !== id));
    },
  });

  function deleteResume(id: string) {
    console.log("deleting");
    deleteMutation.mutate({ id });
  }

  function duplicate(id: string) {
    console.log("mutatin ", id);
    duplicateMutation.mutate({ id });
  }

  return (
    <div className="">
      <Header />
      <main className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-y-8 gap-x-4 mt-10">
        <AnimatePresence initial={false}>
          {resumes
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
            .map((resume) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={resume.id}
                className="border border-gray-200 flex flex-col rounded-lg shadow-sm max-w-[20rem] w-full md:w-[270px]">
                {resume.previewImage && (
                  <Image
                    width={270}
                    height={180}
                    src={`${resume.previewImage}`}
                    alt="Resume Preview"
                    objectFit="cover"
                    className="rounded-t border-b shadow-sm border-gray-200"
                  />
                )}
                <div className="p-4 pt-2 max-w-[20rem] w-full md:w-[270px]">
                  <span className="block font-semibold text-xs tracking-wide uppercase text-gray-600 truncate">
                    {resume.resumeTitle}
                  </span>
                  <span className="text-gray-700 text-sm truncate block">
                    Atualizado{" "}
                    {formatRelative(resume.updatedAt, new Date(), {
                      locale: ptBR,
                    })}
                  </span>
                  <div className="flex items-center justify-start space-x-2 mt-2">
                    <Link
                      href={`/pdf/create?id=${resume.id}`}
                      aria-label="Editar">
                      <a className="rounded bg-white p-1.5 focus:bg-sky-100 hover:bg-sky-100 text-gray-700 focus:text-sky-600 hover:text-sky-500 border shadow-sm transition duration-75 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full flex justify-center items-center">
                        <PencilSquareIcon className="w-5 h-5 " />
                      </a>
                    </Link>
                    <Link
                      href={`/api/pdf/generate?id=${resume.id}`}
                      passHref
                      aria-label="Download">
                      <a
                        download={`${resume.resumeTitle}.pdf`}
                        target="_blank"
                        rel="noopener"
                        className="rounded bg-white p-1.5 focus:bg-emerald-100 hover:bg-emerald-100 text-gray-700 focus:text-emerald-600 hover:text-emerald-500 border shadow-sm transition duration-75 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full flex justify-center items-center">
                        <ArrowDownOnSquareIcon className="w-5 h-5" />
                      </a>
                    </Link>
                    <button
                      onClick={() => duplicate(resume.id)}
                      disabled={
                        duplicateMutation.isLoading &&
                        duplicateMutation.variables?.id === resume.id
                      }
                      className="rounded bg-white p-1.5 focus:bg-purple-100 hover:bg-purple-100 text-gray-700 focus:text-purple-600 hover:text-purple-500 border shadow-sm transition duration-75 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:focus:bg-gray-200 w-full flex justify-center items-center">
                      {duplicateMutation.isLoading &&
                      duplicateMutation.variables?.id === resume.id ? (
                        <Spinner />
                      ) : (
                        <DocumentDuplicateIcon className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteResume(resume.id)}
                      disabled={
                        deleteMutation.isLoading &&
                        deleteMutation.variables?.id === resume.id
                      }
                      className="rounded bg-white p-1.5 focus:bg-red-100 hover:bg-red-100 text-gray-700 focus:text-red-600 hover:text-red-500 border shadow-sm transition duration-75 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:focus:bg-gray-200 w-full flex justify-center items-center">
                      {deleteMutation.isLoading &&
                      deleteMutation.variables?.id === resume.id ? (
                        <Spinner />
                      ) : (
                        <TrashIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const auth = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!auth || !auth?.user?.email) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const resumes = await prisma?.resume.findMany({
    where: { user: { email: auth?.user?.email } },
    select: {
      id: true,
      resumeTitle: true,
      updatedAt: true,
      previewImage: true,
    },
  });

  return {
    props: { resumes: resumes || [] },
  };
};

export default Dashboard;
