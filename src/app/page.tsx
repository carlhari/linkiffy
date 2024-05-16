import Button from "./components/Button";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-1/4 m-auto rounded-lg shadow-2xl p-4 bg-white">
        {/* {-----------------------------------------------} */}
        <h1 className="text-3xl font-semibold text-center mb-4">Linkiffy</h1>
        {/* {-----------------------------------------------} */}
        <div className="flex flex-col justify-center gap-4 w-full h-1/3">
          <button
            type="button"
            className="border border-black border-solid rounded-lg text-xl flex items-center justify-center gap-2 p-1"
          >
            <span className="text-[#4267B2] text-2xl">
              <FaFacebook />
            </span>
            Login With Facebook
          </button>
          <button
            type="button"
            className="border border-black border-solid rounded-lg text-xl flex items-center justify-center gap-2 p-1"
          >
            <span className="text-[#4267B2] text-2xl">
              <FcGoogle />
            </span>
            Login With Google
          </button>
        </div>

        <div className="hr-lines text-2xl h-1/3">OR</div>
        {/* {-----------------------------------------------} */}

        <form className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Email"
              className="text-xl w-full border border-black border-solid px-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Password"
              className="text-xl w-full border border-black border-solid px-2 rounded-md"
            />
          </div>
          <Button
            type="submit"
            content={"Submit"}
            className="bg-blue-500 text-white text-xl border border-black border-solid px-2 rounded-md"
          />
        </form>

        <div className="w-full flex items-center justify-center mt-2">
          <a href="/register" className="underline text-blue-600">
            Rigester
          </a>
        </div>
      </div>
    </div>
  );
}