import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Header from "../components/header";

const Settings: NextPage = (props) => {
  const { data } = useSession();
  console.log(data);
  return (
    <div className="">
      <Header />
      <main className="mt-10"></main>
    </div>
  );
};

export default Settings;
