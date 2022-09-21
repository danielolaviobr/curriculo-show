import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Header from "../components/header";
import Image from "next/image";

const Prices: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Curriculo Show</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="selection:bg-sky-500/20">
        <Header />
        
      </div>
    </>
  );
};

export default Prices;