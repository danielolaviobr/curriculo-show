import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Project, FormInputs } from "../types/form";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Switch } from "@headlessui/react";
import { className } from "../utils/tailwind";
import {
  Control,
  Controller,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  item: Project;
  index: number;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
  value: Project;
}

export default function Projects({
  item,
  index,
  remove,
  register,
  value,
}: Props) {
  const [enabled, setEnabled] = useState(item.title ? false : true);

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className="block items-center bg-white lg:col-span-2 py-5 px-4 mb-4 rounded border-gray-300 border shadow-sm"
          ref={provided.innerRef}
          {...provided.draggableProps}>
          <div className="flex items-center justify-between space-x-2">
            <span {...provided.dragHandleProps} className="mr-4">
              <ChevronUpDownIcon className="w-7 h-7 border-gray-300 border rounded p-1 hover:bg-gray-100" />
            </span>
            <div className="flex-grow min-w-0">
              <div className="lg:flex items-center overflow-hidden">
                <p className="font-semibold text-sky-500 text-lg truncate">
                  {value.title}
                </p>
              </div>
            </div>
            {enabled && (
              <button
                className="rounded border-gray-300 bg-red-600 focus:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-yellow-500"
                onClick={() => remove(index)}>
                <TrashIcon className="text-white w-7 h-7  p-1" />
              </button>
            )}
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className="mr-4 focus:outline-none focus:ring-2 focus:hover:bg-gray-50 focus:ring-offset-0 focus:ring-sky-500 rounded border-gray-300">
              <ToggleEditIcon
                checked={enabled}
                className="w-7 h-7 border rounded p-1"
              />
            </Switch>
          </div>
          {enabled && (
            <>
              {" "}
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-8 gap-y-4 px-4 pt-6">
                <div className="flex flex-col lg:col-span-6">
                  <label
                    className="text-md font-medium text-gray-700 mb-2"
                    htmlFor={`projects.${index}.title`}>
                    Título
                  </label>
                  <input
                    className="block py-2 px-4 sm:text-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                    placeholder="Todo App"
                    id={`projects.${index}.title`}
                    {...register(`projects.${index}.title`)}
                  />
                </div>
                <div className="flex flex-col lg:col-span-6">
                  <label
                    className="text-md font-medium text-gray-700 mb-2"
                    htmlFor={`projects.${index}.description`}>
                    Descrição
                  </label>
                  <textarea
                    className="block py-2 px-4 sm:text-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                    id={`projects.${index}.description`}
                    {...register(`projects.${index}.description`)}
                  />
                </div>
              </div>
              <input
                hidden
                type="number"
                value={index}
                id={`projects.${index}.index`}
                {...register(`projects.${index}.index`, {
                  valueAsNumber: true,
                })}
              />
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

interface ToggleEditIconProps {
  checked: boolean;
  className: string;
}

const ToggleEditIcon = ({ checked, className }: ToggleEditIconProps) =>
  checked ? (
    <XMarkIcon className={className} />
  ) : (
    <PencilIcon className={className} />
  );
