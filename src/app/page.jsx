import { RiNextjsLine } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { SiMongodb } from "react-icons/si";
import AuthButton from "@/components/AuthButton";
import UseCard from "@/components/UseCard";
import { getServerSession } from "next-auth";
export default async function Home() {
  const session = await getServerSession();
  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center gap-5 ">
      <UseCard />
      <div className=" flex gap-5 space-x-4 items-center">
        <FaReact
          size={40}
          className="animate-spin duration-1000 text-sky-400"
        ></FaReact>
        <IoShieldCheckmarkSharp size={50} className="text-yellow-500" />
        <RiNextjsLine size={50}></RiNextjsLine>
        <SiMongodb size={50} className="text-green-600"></SiMongodb>
      </div>
      <div className="relative">
        <h2 className="text-5xl">NEXT AUTH</h2>
      </div>
      <AuthButton />
      {session ? (
        <p className="text-gray-600">Welcome back, {JSON.stringify(session)}!</p>
      ) : (
        <p className="text-gray-600">Please log in to access your card.</p>
      )}
    </div>
  );
}
