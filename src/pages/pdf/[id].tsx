import type { NextPage } from "next";

const PdfPreview: NextPage = () => {
  return (
    <main className="w-a4 h-a4 print:bg-blue-400 shadow-md m-auto flex flex-col items-center justify-center p-4 print:m-0 print:shadow-none bg-red-500">
      <h1 className="text-xl leading-normal font-extrabold text-gray-700">
        Daniel Olavio Ferreira
      </h1>
    </main>
  );
};

export default PdfPreview;
