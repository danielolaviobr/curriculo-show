import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSideProps,
} from "next";
import ResumePreview from "../../../components/resumePreview";
import { FormInputs } from "../../../types/form";
import { prisma } from "../../../server/db/client";

interface Props {
  data: FormInputs;
}

const PdfPreviewForPrint: NextPage<Props> = ({
      data,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="bg-gray-600 pt-[10%]">
      <ResumePreview data={data} className="mx-auto" />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.params?.id as string;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const data = await prisma?.resume.findUnique({
    where: { id },
    include: { education: true, experience: true, projects: true, user: true },
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data as FormInputs,
    },
  };
};

export default PdfPreviewForPrint;
