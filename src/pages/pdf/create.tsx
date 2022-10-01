import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSideProps,
} from "next";
import Link from "next/link";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  UseFieldArrayMove,
  UseFieldArrayAppend,
} from "react-hook-form";
import {
  ChevronLeftIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { DropResult } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import {
  Education as EducationType,
  Experience as ExperienceType,
  FormInputs,
  Project,
} from "../../types/form";
import { v4 as uuid } from "uuid";
import isEqual from "lodash/isEqual";

const DragDropContext = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.DragDropContext;
  },
  { ssr: false }
);
const Droppable = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.Droppable;
  },
  { ssr: false }
);
import Education from "../../components/education";
import { useEffect, useState } from "react";
import { useFormState } from "../../hooks/useFormState";
import ResumePreview from "../../components/resumePreview";
import Experience from "../../components/experience";
import Projects from "../../components/projects";
import { trpc } from "../../utils/trpc";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Spinner from "../../components/spinner";

interface Props {
  data?: FormInputs;
}

const CreatePdf: NextPage<Props> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [previousData, setPreviousData] = useState(data);
  const { update, data: formData } = useFormState();
  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm<FormInputs>({
      defaultValues: {
        ...data,
      },
      mode: "onBlur",
    });
  const previewMutation = trpc.useMutation(["resume.preview"], {
    onSuccess: () => {
      console.log("generated preview");
    },
  });
  const resumeMutation = trpc.useMutation(["resume.upsert"], {
    onSuccess: (data) => {
      console.log("resulted");
      setValue("id", data.id);
      previewMutation.mutate({ id: data.id });
    },
  });
  const {
    fields: education,
    append: appendEducation,
    remove: removeEducation,
    move: moveEducation,
  } = useFieldArray({
    control,
    name: "education",
  });
  const {
    fields: experience,
    append: appendExperience,
    remove: removeExperience,
    move: moveExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });
  const {
    fields: projects,
    append: appendProject,
    remove: removeProject,
    move: moveProject,
  } = useFieldArray({
    control,
    name: "projects",
  });

  const watchData = watch();

  useEffect(() => {
    if (data) {
      update(data);
    }
  }, [data, update]);

  useEffect(() => {
    const subscribtion = watch((data) => {
      update(data as FormInputs);
    });
    return () => subscribtion.unsubscribe();
  }, [watch, update]);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const hasChange = !isEqual(data, previousData);

    if (hasChange) {
      console.log("submitting");
      // setLoading(true)
      resumeMutation.mutate(data);
      setPreviousData(data);
    }
  };

  const handleOnDragEnd = (result: DropResult, move: UseFieldArrayMove) => {
    if (!result.destination) {
      return;
    }
    move(result.source.index, result.destination.index);
    update(watchData);
  };

  const createItem = (create: UseFieldArrayAppend<FormInputs, any>) => {
    create({
      id: uuid(),
    });
  };

  return (
    <main className="grid h-screen grid-cols-1 lg:grid-cols-8">
      <section className="col-span-1 px-2 py-6 overflow-y-scroll bg-gray-200 lg:px-8 scroll-smooth lg:col-span-3">
        <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard">
              <a className="flex items-center justify-start text-lg font-medium text-gray-800 transition duration-100">
                <ChevronLeftIcon className="w-6 h-6" />
                Voltar
              </a>
            </Link>
            <button
              className="flex items-center px-2 py-1 text-sm font-medium text-white transition duration-75 rounded bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 disabled:text-gray-100 disabled:cursor-not-allowed"
              disabled={resumeMutation.isLoading}
              type="submit">
              {resumeMutation.isLoading ? "Salvando" : "Salvar"}
              {resumeMutation.isLoading ? (
                <Spinner className="ml-1" />
              ) : (
                <CheckIcon className="w-4 h-4 ml-1" />
              )}
            </button>
          </div>
          <div className="grid grid-cols-1 px-4 lg:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex flex-col mb-4 lg:col-span-2">
              <label
                className="mb-2 font-medium text-gray-700 text-md"
                htmlFor="resumeTitle">
                Título do curriculo
              </label>
              <input
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                id="resumeTitle"
                {...register("resumeTitle")}
              />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-800 lg:col-span-2">
              Sobre mim
            </h2>
            <div className="flex flex-col">
              <label
                className="mb-2 font-medium text-gray-700 text-md"
                htmlFor="firstName">
                Primeiro nome
              </label>
              <input
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                id="firstName"
                {...register("firstName")}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="mb-2 font-medium text-gray-700 text-md"
                htmlFor="lastName">
                Sobrenome
              </label>
              <input
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                id="lastName"
                {...register("lastName")}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="mb-2 font-medium text-gray-700 text-md"
                htmlFor="currentTitle">
                Cargo atual
              </label>
              <input
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                id="currentTitle"
                {...register("currentTitle")}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="mb-2 font-medium text-gray-700 text-md"
                htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                id="email"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="mb-2 font-medium text-gray-700 text-md"
                htmlFor="phone">
                Telefone
              </label>
              <input
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                id="phone"
                {...register("phone")}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="mb-2 font-medium text-gray-700 text-md"
                htmlFor="site">
                Site
              </label>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                  https://
                </span>
                <input
                  className="block w-full px-4 py-2 border border-gray-300 shadow-sm sm:text-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-r-md"
                  id="site"
                  {...register("website")}
                />
              </div>
            </div>
            <div className="flex flex-col lg:col-span-2">
              <label
                className="mb-2 font-medium text-gray-700 text-md"
                htmlFor="summary">
                Introdução
              </label>
              <textarea
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                id="summary"
                {...register("summary")}
              />
            </div>
            <h2 className="mt-4 mb-2 text-2xl font-bold text-gray-800 lg:col-span-2">
              Estudos
            </h2>
            <div className="lg:col-span-2">
              <DragDropContext
                onDragEnd={(result) => handleOnDragEnd(result, moveEducation)}>
                <Droppable droppableId="education">
                  {(provided) => (
                    <ul ref={provided.innerRef} {...provided.droppableProps}>
                      {education.map((item, index) => (
                        <Education
                          key={item.id}
                          item={item}
                          index={index}
                          remove={removeEducation}
                          register={register}
                          value={formData?.education[index] as EducationType}
                          control={control}
                        />
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
              <button
                onClick={() => createItem(appendEducation)}
                className="flex items-center justify-center w-full py-4 text-lg font-semibold border-2 border-gray-300 border-dashed rounded-sm outline-none text-sky-500 hover:text-sky-600 focus:border-gray-500">
                <PlusIcon className="w-5 h-5 mr-1" />
                Adicionar Estudos
              </button>
            </div>
            <h2 className="mt-4 mb-2 text-2xl font-bold text-gray-800 lg:col-span-2">
              Experiência
            </h2>
            <div className="lg:col-span-2">
              <DragDropContext
                onDragEnd={(result) => handleOnDragEnd(result, moveExperience)}>
                <Droppable droppableId="experience">
                  {(provided) => (
                    <ul ref={provided.innerRef} {...provided.droppableProps}>
                      {experience.map((item, index) => (
                        <Experience
                          key={item.id}
                          item={item}
                          index={index}
                          remove={removeExperience}
                          register={register}
                          value={formData?.experience[index] as ExperienceType}
                          control={control}
                        />
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
              <button
                onClick={() => createItem(appendExperience)}
                className="flex items-center justify-center w-full py-4 text-lg font-semibold border-2 border-gray-300 border-dashed rounded-sm outline-none text-sky-500 hover:text-sky-600 focus:border-gray-500">
                <PlusIcon className="w-5 h-5 mr-1" />
                Adicionar Experiência
              </button>
            </div>
            <h2 className="mt-4 mb-2 text-2xl font-bold text-gray-800 lg:col-span-2">
              Projetos
            </h2>
            <div className="lg:col-span-2">
              <DragDropContext
                onDragEnd={(result) => handleOnDragEnd(result, moveProject)}>
                <Droppable droppableId="projects">
                  {(provided) => (
                    <ul ref={provided.innerRef} {...provided.droppableProps}>
                      {projects.map((item, index) => (
                        <Projects
                          key={item.id}
                          item={item}
                          index={index}
                          remove={removeProject}
                          register={register}
                          value={formData?.projects[index] as Project}
                          control={control}
                        />
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
              <button
                onClick={() => createItem(appendProject)}
                className="flex items-center justify-center w-full py-4 text-lg font-semibold border-2 border-gray-300 border-dashed rounded-sm outline-none text-sky-500 hover:text-sky-600 focus:border-gray-500">
                <PlusIcon className="w-5 h-5 mr-1" />
                Adicionar Projeto
              </button>
            </div>
          </div>
        </form>
      </section>
      <section className="relative hidden h-screen bg-gray-700 shadow-inner lg:flex lg:items-center lg:justify-center lg:col-span-5">
        <Link href={`/api/pdf/generate?id=${getValues("id")}`} passHref>
          <a
            download={`${getValues("resumeTitle") || "resume"}.pdf`}
            target="_blank"
            rel="noopener"
            className="absolute flex items-center h-auto px-2 py-1 font-medium text-white rounded top-4 right-4 bg-sky-600 hover:bg-sky-700">
            Baixar
            <ArrowDownOnSquareIcon className="w-4 h-4 ml-1" />
          </a>
        </Link>
        <div id="preview" className="flex-1 scale-[calc(100vh/1080)] px-auto">
          <ResumePreview />
        </div>
      </section>
    </main>
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

  if (!auth) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const id = context.query.id as string | undefined;

  if (!id) {
    return { props: {} };
  }

  const resume = await prisma?.resume.findUnique({
    where: { id },
    include: {
      education: { orderBy: { index: "asc" } },
      experience: { orderBy: { index: "asc" } },
      projects: { orderBy: { index: "asc" } },
      user: true,
    },
  });

  if (resume?.user.email !== auth?.user?.email) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: resume as FormInputs,
    },
  };
};

export default CreatePdf;
