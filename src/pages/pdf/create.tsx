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

interface Props {
  data?: FormInputs;
}

const CreatePdf: NextPage<Props> = ({
      data,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { update } = useFormState();
  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm<FormInputs>({
      defaultValues: {
        ...data,
      },
      mode: "onBlur",
    });
  const mutation = trpc.useMutation(["resume.upsert"], {
    onSuccess: (data, variables, context) => {
      console.log("resulted");
      setValue("id", data.id);
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

  const formData = watch();

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
    console.log("submitting");
    const response = mutation.mutate(data);
    console.log(response);
    console.log(data);
  };

  const handleOnDragEnd = (result: DropResult, move: UseFieldArrayMove) => {
    if (!result.destination) {
      return;
    }
    move(result.source.index, result.destination.index);
    update(formData);
  };

  const createItem = (create: UseFieldArrayAppend<FormInputs, any>) => {
    create({
      id: uuid(),
    });
  };

  return (
    <main className="h-screen grid lg:grid-cols-8 grid-cols-1">
      <section className="bg-gray-200 px-2 lg:px-8 py-6  overflow-y-scroll scroll-smooth lg:col-span-3 col-span-1">
        <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard">
              <a className="flex text-lg font-medium items-center justify-start text-gray-800 transition duration-100">
                <ChevronLeftIcon className="w-6 h-6" />
                Voltar
              </a>
            </Link>
            <button
              className="font-medium text-sm text-white bg-emerald-500 hover:bg-emerald-600 px-2 py-1 rounded transition duration-75 flex items-center"
              type="submit">
              Salvar
              <CheckIcon className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 px-4">
            <div className="flex flex-col lg:col-span-2 mb-4">
              <label
                className="text-md font-medium text-gray-700 mb-2"
                htmlFor="resumeTitle">
                Título do curriculo
              </label>
              <input
                className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                id="resumeTitle"
                {...register("resumeTitle")}
              />
            </div>
            <h2 className="lg:col-span-2 text-2xl font-bold text-gray-800 mb-2">
              Sobre mim
            </h2>
            <div className="flex flex-col">
              <label
                className="text-md font-medium text-gray-700 mb-2"
                htmlFor="firstName">
                Primeiro nome
              </label>
              <input
                className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                id="firstName"
                {...register("firstName")}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-md font-medium text-gray-700 mb-2"
                htmlFor="lastName">
                Sobrenome
              </label>
              <input
                className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                id="lastName"
                {...register("lastName")}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-md font-medium text-gray-700 mb-2"
                htmlFor="currentTitle">
                Cargo atual
              </label>
              <input
                className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                id="currentTitle"
                {...register("currentTitle")}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-md font-medium text-gray-700 mb-2"
                htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                id="email"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-md font-medium text-gray-700 mb-2"
                htmlFor="phone">
                Telefone
              </label>
              <input
                className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                id="phone"
                {...register("phone")}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-md font-medium text-gray-700 mb-2"
                htmlFor="site">
                Site
              </label>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  https://
                </span>
                <input
                  className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 border rounded-r-md"
                  id="site"
                  {...register("website")}
                />
              </div>
            </div>
            <div className="flex flex-col lg:col-span-2">
              <label
                className="text-md font-medium text-gray-700 mb-2"
                htmlFor="summary">
                Introdução
              </label>
              <textarea
                className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                id="summary"
                {...register("summary")}
              />
            </div>
            <h2 className=" text-2xl font-bold text-gray-800 mb-2 mt-4 lg:col-span-2">
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
                          value={formData.education[index] as EducationType}
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
                className="w-full flex items-center justify-center border-2 border-gray-300 border-dashed rounded-sm font-semibold text-lg text-sky-500 hover:text-sky-600 py-4 outline-none focus:border-gray-500">
                <PlusIcon className="w-5 h-5 mr-1" />
                Adicionar Estudos
              </button>
            </div>
            <h2 className=" text-2xl font-bold text-gray-800 mb-2 mt-4 lg:col-span-2">
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
                          value={formData.experience[index] as ExperienceType}
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
                className="w-full flex items-center justify-center border-2 border-gray-300 border-dashed rounded-sm font-semibold text-lg text-sky-500 hover:text-sky-600 py-4 outline-none focus:border-gray-500">
                <PlusIcon className="w-5 h-5 mr-1" />
                Adicionar Experiência
              </button>
            </div>
            <h2 className=" text-2xl font-bold text-gray-800 mb-2 mt-4 lg:col-span-2">
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
                          value={formData.projects[index] as Project}
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
                className="w-full flex items-center justify-center border-2 border-gray-300 border-dashed rounded-sm font-semibold text-lg text-sky-500 hover:text-sky-600 py-4 outline-none focus:border-gray-500">
                <PlusIcon className="w-5 h-5 mr-1" />
                Adicionar Projeto
              </button>
            </div>
          </div>
        </form>
      </section>
      <section className="h-screen bg-gray-700 shadow-inner hidden lg:flex lg:items-center lg:justify-center lg:col-span-5 relative">
        <Link href={`/api/pdf/generate?id=${getValues("id")}`} passHref>
          <a
            download="resume.pdf"
            target="_blank"
            rel="noopener"
            className="absolute top-4 right-4 bg-sky-600 text-white py-1 px-2 h-auto rounded font-medium hover:bg-sky-700 flex items-center">
            Baixar
            <ArrowDownOnSquareIcon className="h-4 w-4 ml-1" />
          </a>
        </Link>
        <div
          id="preview"
          className="flex-1 scale-[85%] min-h-[297mm] max-w-[210mm] px-auto">
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
  console.log(auth);

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
    include: { education: true, experience: true, projects: true, user: true },
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
