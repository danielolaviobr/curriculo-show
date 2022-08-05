import { SelectorIcon, XIcon } from "@heroicons/react/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { Education as EducationType } from "../types/form";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Switch } from "@headlessui/react";

interface Props {
  item: EducationType;
  index: number;
  remove(id: EducationType["id"]): void;
}

export default function Education({ item, index, remove }: Props) {
  const [enabled, setEnabled] = useState(false);
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className="block items-center bg-white lg:col-span-2 py-5 px-4 mb-4 rounded border-gray-300 border shadow-sm"
          ref={provided.innerRef}
          {...provided.draggableProps}>
          <div className="flex items-center justify-between space-x-2">
            <span {...provided.dragHandleProps}>
              <SelectorIcon className="w-7 h-7 mr-4 border-gray-300 border rounded p-1 hover:bg-gray-100" />
            </span>
            <div className="flex-grow min-w-0">
              <div className="lg:flex items-center overflow-hidden">
                <p className="font-semibold text-sky-500 text-lg truncate">
                  {item.institution}
                </p>
                <p className="truncate lg:ml-1 ">{item.degree}</p>
              </div>
            </div>
            {enabled && (
              <button onClick={() => remove(item.id)}>
                <TrashIcon className="text-white w-7 h-7 rounded border-gray-300 bg-red-600 hover:bg-red-700 p-1" />
              </button>
            )}
            <Switch checked={enabled} onChange={setEnabled}>
              <ToggleEditIcon
                checked={enabled}
                className="w-7 h-7 mr-4 border-gray-300 border rounded p-1 hover:bg-gray-100"
              />
            </Switch>
          </div>
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
    <XIcon className={className} />
  ) : (
    <PencilIcon className={className} />
  );
