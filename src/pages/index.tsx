import { CheckCircleIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "../components/header";
import Image from "next/image";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = (props) => {
  const { status, data } = useSession();

  return (
    <>
      <Head>
        <title>Curriculo Show</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="selection:bg-sky-500/20 snap-y snap-mandatory scroll-smooth">
        <Header />
        <div className="container flex flex-col items-center justify-start p-4 mx-auto text-center h-screen-header sm:justify-center snap-start">
          <h1 className="max-w-2xl text-6xl font-bold tracking-wide text-gray-900">
            Construa seu próximo{" "}
            <span className="relative text-sky-500 whitespace-nowrap">
              <span className="relative">curriculo</span>
              <svg
                width="260"
                height="36"
                viewBox="0 0 260 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-[75%] left-0 h-[0.58em] w-full fill-blue-400">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fillOpacity="0.35"
                  d="M203.108 1.43161C169.791 -0.287887 147.603 0.189776 103.064 3.58523C99.1468 3.88368 93.0229 4.3474 89.4551 4.61574C60.0646 6.82473 18.7436 14.4153 7.15835 19.7333C4.75573 20.8361 0.391496 24.0529 0.344485 24.7558C0.336713 24.872 0.541814 24.7025 1.35632 23.9199C5.11142 20.3115 14.7268 17.5031 38.2326 13.1492C52.1175 10.5771 67.246 8.42862 79.6667 7.26495C89.1478 6.37659 134.05 3.45526 135.543 3.62993C135.849 3.66566 134.131 3.85525 131.726 4.05116C105.886 6.15628 97.0705 7.12081 81.4075 9.55779C69.2715 11.4459 62.1257 12.9478 43.8203 17.4586C36.9334 19.1555 37.1334 19.0888 36.982 19.7451C36.5986 21.4078 37.4598 21.503 43.0953 20.4204C81.3138 13.0802 103.969 10.9966 139.22 11.5799C148.705 11.7369 181.481 13.4918 180.883 13.8107C180.542 13.9929 170.609 14.5848 153.977 15.414C116.764 17.2696 92.7942 20.8264 66.1571 28.4456C58.7714 30.5581 57.4226 31.2882 57.9478 32.8883C58.5025 34.578 62.6449 34.385 83.0122 31.7193C113.515 27.7268 124.801 26.8659 149.014 26.6838C154.642 26.6416 164.291 26.8591 164.004 27.022C163.924 27.0674 157.784 27.7798 150.359 28.605C131.78 30.6695 119.839 32.2955 119.391 32.8216C118.699 33.6328 118.8 34.876 119.591 35.2979C120.556 35.8125 123.385 35.7555 129.931 35.0893C144.127 33.6444 158.242 33.276 179.041 33.8071C182.154 33.8865 185.782 33.9266 187.103 33.8962C190.177 33.8256 195.02 34.1502 197.244 34.5761C198.196 34.7583 199.381 34.9838 199.876 35.0772C201.755 35.4311 195.285 33.5285 192.514 32.912C185.568 31.3671 176.437 30.5145 165.548 30.3943C163.05 30.3667 160.987 30.3076 160.963 30.2633C160.914 30.1699 163.464 29.9202 175.811 28.8098C185.278 27.9583 185.517 27.9088 185.956 26.7119C186.234 25.9526 186.07 25.0162 185.569 24.5146C185.191 24.1353 171.502 23.3315 164.046 23.2508C146.172 23.0577 136.679 23.2775 124.699 24.1611C112.576 25.0553 104.497 26.0388 84.2516 29.0851C71.926 30.9398 65.4441 31.7951 63.2898 31.8515L61.9546 31.8864L63.606 31.3195C68.7003 29.5711 85.5572 25.6021 95.1106 23.9017C114.955 20.3694 128.445 19.042 158.598 17.6537C183.934 16.4874 189.141 15.9782 189.622 14.6208C190.14 13.1583 189.452 12.2229 187.414 11.6192C184.634 10.7959 149.786 8.62794 137.391 8.50709C125.238 8.38873 110.77 8.76558 103.096 9.40052C102.281 9.46799 101.395 9.49543 101.127 9.46159C99.1584 9.21295 126.646 6.75064 142.345 5.76957C159.543 4.6949 173.117 4.31851 191.896 4.39559C204.038 4.44565 234.882 6.82726 247.312 8.67506C258.828 10.3868 259.242 10.4272 259.631 9.88167C260.037 9.31265 260.077 8.87319 259.774 8.29979C259.388 7.57002 256.978 7.03586 251.46 6.45747C249.429 6.24452 244.955 5.63336 241.518 5.09905C238.081 4.56496 233.83 3.92866 232.072 3.68499C228.754 3.22529 210.801 1.82867 203.108 1.43161ZM141.135 3.44195C141.036 3.49769 140.848 3.48893 140.715 3.4223C140.583 3.35567 140.664 3.31011 140.895 3.321C141.126 3.33188 141.234 3.38621 141.135 3.44195ZM139.303 3.55785C139.127 3.60004 138.813 3.58039 138.604 3.51432C138.395 3.44802 138.539 3.41347 138.923 3.43734C139.307 3.46145 139.478 3.51565 139.303 3.55785ZM137.4 3.66085C137.185 3.69859 136.839 3.67547 136.631 3.60946C136.423 3.54345 136.599 3.51266 137.022 3.54092C137.444 3.56918 137.614 3.62311 137.4 3.66085ZM100.312 9.59703C100.135 9.63938 99.8522 9.62046 99.683 9.55499C99.5139 9.48929 99.6582 9.45457 100.004 9.47769C100.35 9.50081 100.488 9.55444 100.312 9.59703ZM98.7606 9.71082C98.6604 9.76738 98.5033 9.75687 98.4114 9.68747C98.3196 9.6183 98.4016 9.57214 98.5936 9.58498C98.7857 9.59783 98.8609 9.6545 98.7606 9.71082ZM201.079 35.4397C201.171 35.5091 201.328 35.5196 201.429 35.463C201.529 35.4067 201.454 35.35 201.262 35.3372C201.07 35.3243 200.988 35.3705 201.079 35.4397Z"
                />
              </svg>
            </span>{" "}
            <span className="relative">em instantes</span>
          </h1>
          <h2 className="max-w-md mt-8 text-lg font-medium text-gray-600">
            Curriulos otimizados para sistemas automatizados e claros para
            recrutadores
          </h2>
        </div>
        <div
          id="prices"
          className="relative flex flex-col items-center justify-center h-screen bg-gray-900 snap-start">
          <h2 className="z-10 mb-10 text-5xl font-semibold text-white">
            Tenha um curriculo de{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative">destaque</span>
              <svg
                width="1340"
                height="176"
                viewBox="0 0 1340 176"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-[100%] left-0 h-[0.58em] w-full fill-blue-400">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1010.25 0.704656C821.859 2.70544 767.994 4.00699 663.466 9.0877C555.143 14.3529 477.621 19.6308 354.618 30.1149C326.104 32.5453 295.572 34.8518 259.779 37.2789C128.294 46.1944 102.708 48.5701 60.2027 55.8066C39.1425 59.3928 20.9291 61.8746 10.721 62.5511C1.64526 63.1517 0 63.53 0 65.0152C0 66.3277 14.5154 67.4776 22.4548 66.7936C25.3 66.5493 33.0084 65.9503 39.5853 65.4642C46.1623 64.9773 60.6356 63.6706 71.7484 62.5603C97.9168 59.9446 110.481 59.1198 155.455 57.0651C231.06 53.6111 288.175 50.292 358.33 45.2753C384.184 43.4261 418.512 40.9713 434.614 39.8197C556.738 31.0845 705.913 23.2953 797.067 20.8952C907.684 17.9813 1251.09 15.4051 1245.29 17.5314C1242.99 18.3747 1203.69 24.6466 1180.14 27.9304C1158.5 30.9472 1122.35 35.2983 1077.88 40.2384C1056.78 42.582 1027.84 45.8254 1013.55 47.4462C959.874 53.5362 942.195 55.4249 911.699 58.3305C771.211 71.7142 678.412 83.3768 549.246 103.88C472.471 116.067 409.543 130.057 339.317 150.553C299.39 162.205 295.5 164.275 299.43 171.777C301.987 176.658 322.133 177.291 362.766 173.765C437.022 167.323 506.802 162.326 574.4 158.611C616.8 156.281 622.417 155.89 665.528 152.273C681.63 150.922 709.464 148.948 727.38 147.886L759.956 145.956L716.659 145.196C651.051 144.042 580.671 144.112 557.493 145.354C480.757 149.465 439.019 152.629 370.844 159.502C354.595 161.141 340.886 162.341 340.379 162.169C335.497 160.506 444.775 135.379 496.906 126.178C614.587 105.406 735.773 89.9082 922.008 71.8111C939.017 70.1582 973.16 66.5425 997.88 63.7768C1022.6 61.0103 1061.57 56.6549 1084.47 54.0964C1172.64 44.2509 1198.91 40.5838 1283.64 26.2919C1337.9 17.138 1338.19 17.0597 1339.67 11.0396C1341.3 4.42063 1336.95 1.41738 1324.5 0.558937C1312.66 -0.257381 1091.14 -0.154627 1010.25 0.704656ZM763.471 145.288C764.496 145.49 765.981 145.482 766.769 145.271C767.558 145.061 766.718 144.896 764.904 144.905C763.09 144.914 762.445 145.087 763.471 145.288Z"
                />
              </svg>
            </span>
          </h2>
          <span className="relative z-10 mb-12 font-medium text-gray-400">
            Curriculos chamativos aumentam as chances de se conseguir um emprego
            em até 78%.
          </span>
          <div className="z-10 flex items-center justify-center space-x-12">
            <div className="flex flex-col px-6 py-8 leading-6 scale-90 bg-white rounded-lg w-96 h-96">
              <div className="flex flex-col mb-8">
                <span className="font-bold text-sky-500">Experimente</span>
                <span className="text-5xl font-extrabold text-gray-800">
                  Grátis
                </span>
              </div>
              <p className="mb-6 font-medium text-gray-600">
                Dois templates gratuitos para experimentar na sua busca por uma
                vaga.
              </p>
              <button className="py-2 mb-6 font-semibold text-white transition duration-150 rounded-full shadow-md hover:bg-sky-600 bg-sky-500">
                Comprar
              </button>
              <ul className="space-y-3 leading-8 text-gray-700 list-outside">
                <li className="flex items-center">
                  <CheckCircleIcon className="w-6 h-6 mr-3" />
                  Dois templates proficinais
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-6 h-6 mr-3" />
                  Downloads ilimitádos
                </li>
              </ul>
            </div>
            <div className="flex flex-col px-6 py-8 leading-6 scale-90 bg-white rounded-lg w-96 h-96">
              <div className="flex flex-col mb-8">
                <span className="font-bold text-sky-500">Cada template</span>
                <span className="text-5xl font-extrabold text-gray-800">
                  R$ 10
                </span>
              </div>
              <p className="mb-6 font-medium text-gray-600">
                Um novo template para quem está começando sua busca.
              </p>
              <button className="py-2 mb-6 font-semibold text-white transition duration-150 rounded-full shadow-md hover:bg-sky-600 bg-sky-500">
                Comprar
              </button>
              <ul className="space-y-3 leading-8 text-gray-700 list-outside">
                <li className="flex items-center">
                  <CheckCircleIcon className="w-6 h-6 mr-3" />
                  Um template de sua escolha
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-6 h-6 mr-3" />
                  Um documento extra
                </li>
              </ul>
            </div>
            <div className="p-2 bg-transparent border-4 rounded-2xl border-sky-500">
              <div className="bg-white rounded-lg w-96 h-[28rem] flex flex-col px-6 py-8 leading-6">
                <div className="flex flex-col mb-8">
                  <span className="font-bold text-sky-500">Acesso total</span>
                  <span className="text-5xl font-extrabold text-gray-800">
                    R$ 59
                  </span>
                </div>
                <p className="mb-6 font-medium text-gray-600">
                  Acesso total para quem quer otimizar sua busca pelo próximo
                  emprego.
                </p>
                <button className="py-2 mb-6 font-semibold text-white transition duration-150 rounded-full shadow-md hover:bg-sky-600 bg-sky-500">
                  Seja Premium
                </button>
                <ul className="space-y-3 leading-8 text-gray-700 list-outside">
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 mr-3" />
                    <b className="mr-1">Todos</b> os templates presentes e
                    futuros
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 mr-3" />
                    Documentos <b className="ml-1">ilimitádos</b>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 mr-3" />
                    Adicione <b className="mx-1">cores</b> nos seus currículos
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="absolute left-[10%] top-[5%]">
            <Image
              src="/assets/prices-bg.png"
              width={3116}
              height={1892}
              alt="background image"
              className="absolute mix-blend-overlay"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
