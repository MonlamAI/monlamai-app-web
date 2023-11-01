import { Link } from "@remix-run/react";

function ErrorMessage({ error }) {
  console.log(error);
  return (
    <>
      <div className="relative h-screen flex flex-col justify-center items-center py-10 m-auto w-[90%] md:w-[80%]">
        <img
          src="/assets/about.jpg"
          alt="monlam"
          className="w-[80%] opacity-40 md:w-[60%] lg:w-[40%] border-[#dddcdc] rounded-lg shadow-sm hover:scale-95 transition-all duration-500"
        />
        <div className="w-[80%] md:w-[60%] lg:w-[40%] text-center absolute top-[40%] pointer-events-none">
          <h4 className="mb-40 text-slate-500 text-xl lg:text-4xl">
            འདིར་དཀའ་ངལ་འདུག
          </h4>
        </div>
        <Link
          to="/"
          className="text-blue-500 mt-3 font-bold lg:text-3xl pointer-events-auto bg-slate-300 py-2 px-3  rounded"
        >
          འདིར་ནོན།
        </Link>
      </div>
    </>
  );
}

export default ErrorMessage;
