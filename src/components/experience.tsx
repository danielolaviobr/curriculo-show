import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Experience as ExperienceType, FormInputs } from "../types/form";
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
  item: ExperienceType;
  index: number;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
  value: ExperienceType;
}

export default function Experience({
  item,
  index,
  remove,
  register,
  value,
  control,
}: Props) {
  const [enabled, setEnabled] = useState(
    item.company || item.position ? false : true
  );

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
                  {value.company}
                </p>
                <p className="truncate lg:ml-1 text-gray-500">
                  {value.position}
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
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-8 gap-y-4 px-4 pt-6">
                <div className="flex flex-col lg:col-span-3">
                  <label
                    className="text-md font-medium text-gray-700 mb-2"
                    htmlFor={`experience.${index}.company`}>
                    Empresa
                  </label>
                  <input
                    className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                    placeholder="Google"
                    id={`experience.${index}.company`}
                    {...register(`experience.${index}.company`)}
                  />
                </div>
                <div className="flex flex-col lg:col-span-3">
                  <label
                    className="text-md font-medium text-gray-700 mb-2"
                    htmlFor={`experience.${index}.position`}>
                    Cargo
                  </label>
                  <input
                    className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                    placeholder="Desenvolvedor"
                    id={`experience.${index}.position`}
                    {...register(`experience.${index}.position`)}
                  />
                </div>
                <div className="flex flex-col lg:col-span-3">
                  <label
                    className="text-md font-medium text-gray-700 mb-2"
                    htmlFor={`experience.${index}.city`}>
                    Cidade
                  </label>
                  <input
                    className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                    placeholder="Salvador"
                    id={`experience.${index}.city`}
                    {...register(`experience.${index}.city`)}
                  />
                </div>
                <div className="flex flex-col lg:col-span-3">
                  <label
                    className="text-md font-medium text-gray-700 mb-2"
                    htmlFor={`experience.${index}.state`}>
                    Estado
                  </label>
                  <input
                    className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                    placeholder="Bahia"
                    id={`experience.${index}.state`}
                    {...register(`experience.${index}.state`)}
                  />
                </div>
                <div className="flex flex-col lg:col-span-2">
                  <label
                    className="text-md font-medium text-gray-700 mb-2"
                    htmlFor={`experience.${index}.startDate`}>
                    Início
                  </label>
                  <Controller
                    control={control}
                    name={`experience.${index}.startDate`}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DatePicker
                        id={`experience.${index}.startDate`}
                        className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                        onBlur={onBlur}
                        onChange={onChange}
                        selected={value}
                        locale={ptBR}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        renderCustomHeader={MonthInputHeader}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col lg:col-span-2">
                  <label
                    className="text-md font-medium text-gray-700 mb-2"
                    htmlFor={`experience.${index}.endDate`}>
                    Fim
                  </label>
                  <Controller
                    control={control}
                    name={`experience.${index}.endDate`}
                    render={({
                      field: { onChange, onBlur, value: endDataValue },
                    }) => (
                      <DatePicker
                        id={`experience.${index}.endDate`}
                        className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border disabled:bg-gray-100 disabled:cursor-not-allowed"
                        onBlur={onBlur}
                        onChange={onChange}
                        selected={value.isCurrent ? null : endDataValue}
                        locale={ptBR}
                        disabled={value.isCurrent ?? undefined}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        renderCustomHeader={MonthInputHeader}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-row items-center lg:col-span-2 space-x-2">
                  <div className="h-full flex items-center justify-center">
                    <input
                      id={`experience.${index}.isCurrent`}
                      aria-describedby="offers-description"
                      type="checkbox"
                      className="h-5 w-5 block sm:text-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border accent-sky-500"
                      {...register(`experience.${index}.isCurrent`)}
                    />
                  </div>
                  <label
                    className="text-md font-medium text-gray-700 text-center"
                    htmlFor={`experience.${index}.isCurrent`}>
                    Trabalho atual
                  </label>
                </div>
                <div className="flex flex-col lg:col-span-6">
                  <label
                    className="text-md font-medium text-gray-700 mb-2"
                    htmlFor={`experience.${index}.description`}>
                    Descrição
                  </label>
                  <textarea
                    className="block py-2 px-4 sm:text-md  w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md border"
                    id={`experience.${index}.description`}
                    {...register(`experience.${index}.description`)}
                  />
                </div>
              </div>
              <input
                hidden
                type="number"
                value={index}
                id={`experience.${index}.index`}
                {...register(`experience.${index}.index`, {
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

const MonthInputHeader = ({
  date,
  increaseYear,
  decreaseYear,
  prevYearButtonDisabled,
  nextYearButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => (
  <div className="flex items-center justify-between px-2 py-2">
    <span className="text-lg text-gray-800 font-semibold">
      {format(date, "yyyy")}
    </span>

    <div className="space-x-2">
      <button
        onClick={decreaseYear}
        disabled={prevYearButtonDisabled}
        type="button"
        className={`
										${prevYearButtonDisabled && "cursor-not-allowed opacity-50"}
										inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-sky-500
								`}>
        <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
      </button>

      <button
        onClick={increaseYear}
        disabled={nextYearButtonDisabled}
        type="button"
        className={`
										${nextYearButtonDisabled && "cursor-not-allowed opacity-50"}
										inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-sky-500
								`}>
        <ChevronRightIcon className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  </div>
);
