import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { unstable_getServerSession } from "next-auth";
import Header from "../components/header";
import { authOptions } from "./api/auth/[...nextauth]";
import puppeteer from "puppeteer";

interface Props {
  resumes: {
    id: string;
    resumeTitle?: string;
    updatedAt: Date;
    image: string;
  }[];
}

const Dashboard: NextPage<Props> = ({ resumes }) => {
  console.log(resumes);
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <main>
        {resumes.map((resume) => (
          <div key={resume.id}>
            <span>{resume.resumeTitle}</span>
            <img
              src={`data:image/jpeg;base64, ${resume.image}`}
              alt="Resume Preview"
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!auth || !auth?.user?.email) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const resumes = await prisma?.resume.findMany({
    where: { user: { email: auth?.user?.email } },
    select: {
      id: true,
      resumeTitle: true,
      updatedAt: true,
    },
  });

  if (!resumes) {
    return {
      props: { resumes: [] },
    };
  }

  const promises = resumes?.map(async (resume) => {
    const browser = await puppeteer.launch({
      args: [`--window-size=1080,720`],
      defaultViewport: {
        width: 1080,
        height: 720,
      },
    });
    const page = await browser.newPage();
    await page.goto(`http://localhost:3000/pdf/preview/${resume.id}`);
    const image = await page.screenshot({ encoding: "base64" });
    await browser.close();
    return { ...resume, image };
  });

  const resumesWithImages = await Promise.all(promises);
  // console.log(resumesWithImages);

  return {
    props: { resumes: resumesWithImages },
  };
};

export default Dashboard;
