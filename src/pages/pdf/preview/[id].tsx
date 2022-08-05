import type { NextPage, InferGetServerSidePropsType } from "next";

const PdfPreview: NextPage = (props) => {
  return (
    <div className="bg-gray-300">
      <div className="print:invisible">
        <a
          href="/api/pdf/generate"
          download="generated_pdf.pdf"
          className="mb-4 print:hidden print-blank">
          Download
        </a>
      </div>
      <main className="w-a4 h-a4 print:bg-blue-400 shadow-md m-auto flex flex-col items-center justify-center p-4 print:m-0 print:shadow-none bg-red-500 scale-75">
        <h1 className="text-xl leading-normal font-extrabold text-gray-700">
          Daniel Olavio Ferreira
        </h1>
      </main>
    </div>
  );
};

export default PdfPreview;
