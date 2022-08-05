import type { NextPage } from "next";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChevronLeftIcon, CheckIcon, PlusIcon } from "@heroicons/react/solid";
import { InboxInIcon } from "@heroicons/react/outline";
import { OnDragEndResponder, resetServerContext } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import { Education as EducationType } from "../../types/form";
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
import { useState } from "react";
import Education from "../../components/education";

type Inputs = {
  resumeTitle: string;
  firstName: string;
  lastName: string;
  currentTitle: string;
  email: string;
  phone: string;
  website: string;
  summary: string;
};
const CreatePdf: NextPage = (props) => {
  const [education, setEducation] = useState<EducationType[]>([
    { id: "1", institution: "Faculdade", degree: "Bacharelado" },
    { id: "2", institution: "Escola", degree: "Fundamental" },
    { id: "3", institution: "Curso", degree: "Fullstack" },
    {
      id: "4",
      institution:
        "Fundação Getúlio Vargas de almeida muito texto pra pouco espaço aqui meu irmão",
      degree: "Bacharelado",
    },
  ]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const formData = watch();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const handleOnDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      education,
      result.source.index,
      result.destination.index
    );
    setEducation(items);
  };

  const reorder = (
    list: EducationType[],
    startIndex: number,
    endIndex: number
  ): EducationType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed as EducationType);

    return result;
  };

  const removeEducation = (id: EducationType["id"]) => {
    setEducation(education.filter((item) => item.id !== id));
  };

  const createEducation = () => {
    setEducation((education) => [...education, { id: uuid() }]);
  };

  return (
    <main className="h-screen grid lg:grid-cols-8 grid-cols-1">
      <section className="bg-gray-200 px-8 py-6 overflow-y-scroll scroll-smooth lg:col-span-3 col-span-1">
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="education">
                  {(provided) => (
                    <ul ref={provided.innerRef} {...provided.droppableProps}>
                      {education.map((item, index) => (
                        <Education
                          key={item.id}
                          item={item}
                          index={index}
                          remove={removeEducation}
                        />
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
              <button
                onClick={createEducation}
                className="w-full flex items-center justify-center border-2 border-gray-300 border-dashed rounded-sm font-semibold text-lg text-sky-500 hover:text-sky-600 py-4">
                <PlusIcon className="w-5 h-5 mr-1" />
                Adicionar Estudos
              </button>
            </div>
          </div>

          {/* include validation with required or other standard HTML validation rules */}
          {/* <input {...register("lastName", { required: true })} /> */}
          {/* errors will return when field validation fails  */}
          {/* {errors.exampleRequired && <span>This field is required</span>} */}
        </form>
      </section>
      <section className="h-screen bg-gray-700 shadow-inner hidden lg:flex lg:items-center lg:justify-center lg:col-span-5">
        <div
          id="preview"
          className="flex-1 scale-[85%] max-h-[297mm] max-w-[210mm] px-auto">
          <div className="bg-white aspect-[210/297] max-h-[297mm] max-w-[210mm]">
            {formData.firstName}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreatePdf;
