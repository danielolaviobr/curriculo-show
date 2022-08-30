import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFormState } from "../hooks/useFormState";
import { FormInputs } from "../types/form";

interface Props {
  data?: FormInputs;
  className?: string;
}

const formatDate = (date: Date) => {
  const stringDate = format(date, "MMM yyyy", { locale: ptBR });
  return stringDate.replace(/\w{1}/, (match) => match.toUpperCase());
};

export default function ResumePreview({ data: propsData, className }: Props) {
  const { data: stateData } = useFormState();
  const data = propsData || stateData;
  return (
    <div
      className={`bg-white aspect-[210/297] min-h-[297mm] w-[210mm] antialiased overflow-y-scroll ${className}`}>
      <div className="p-16">
        <div id="header" className="flex justify-between space-x-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {data?.firstName} {data?.lastName}
            </h1>
            <h2 className="text-xl font-semibold tracking-wide text-gray-800">
              {data?.currentTitle?.toLocaleUpperCase()}
            </h2>
          </div>
          <div className="flex flex-col items-end text-gray-500">
            <span>{data?.email}</span>
            <span>{data?.phone}</span>
            <span>{data?.website}</span>
          </div>
        </div>
        <div id="intro" className="mt-4">
          <p className="text-sm text-gray-500 font-light text-justify tracking-wide">
            {data?.summary}
          </p>
        </div>
        {data?.education.length ? (
          <div className="mt-4" id="education">
            <h3 className="font-semibold tracking-wider text-gray-800">
              EDUCAÇÃO
            </h3>
            <div className="mt-4 space-y-4">
              {data?.education
                .sort((a, b) => a.index - b.index)
                .map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {item?.institution}
                        </h4>
                        <h5 className="text-gray-700">{item?.degree}</h5>
                      </div>
                      <span>
                        {item?.city}
                        {item?.state && ", "}
                        {item?.state}
                        {item?.startDate && " • "}
                        {item.startDate && (
                          <span>{formatDate(item.startDate)}</span>
                        )}
                        {item.endDate && " - "}
                        {item.endDate && (
                          <span>{formatDate(item.endDate)}</span>
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-light text-justify tracking-wide">
                      {item?.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
        {data?.experience.length ? (
          <div className="mt-4" id="experience">
            <h3 className="font-semibold tracking-wider text-gray-800">
              EXPERIÊNCIA
            </h3>
            <div className="mt-4 space-y-4">
              {data?.experience
                .sort((a, b) => a.index - b.index)
                .map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {item?.company}
                        </h4>
                        <h5 className="text-gray-700">{item?.position}</h5>
                      </div>
                      <span>
                        {item?.city}
                        {item?.state && ", "}
                        {item?.state}
                        {item?.startDate && " • "}
                        {item.startDate && (
                          <span>{formatDate(item.startDate)}</span>
                        )}
                        {(item.endDate || item.isCurrent) && " - "}
                        {item.isCurrent ? (
                          <span>Atualmente</span>
                        ) : (
                          item.endDate && (
                            <span>{formatDate(item.endDate)}</span>
                          )
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-light text-justify tracking-wide">
                      {item?.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
        {data?.projects.length ? (
          <div className="mt-4" id="projects">
            <h3 className="font-semibold tracking-wider text-gray-800">
              PROJETOS
            </h3>
            <div className="mt-4 space-y-4">
              {data?.projects
                .sort((a, b) => a.index - b.index)
                .map((item) => (
                  <div key={item.id}>
                    <h4 className="font-semibold text-gray-800">
                      {item?.title}
                    </h4>
                    <p className="text-sm text-gray-500 font-light text-justify tracking-wide">
                      {item?.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
