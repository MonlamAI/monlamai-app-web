import { Link } from "@remix-run/react";

function ErrorMessage({ error }) {
  console.log(error);
  return (
    <>
      <div className="relative h-screen flex justify-center items-center py-10 m-auto w-[90%] md:w-[80%]">
        <img
          src="/assets/about.jpg"
          alt="monlam"
          className="w-[80%] opacity-40 md:w-[60%] lg:w-[40%] border-[#dddcdc] rounded-lg shadow-sm hover:scale-105 transition-all duration-500"
        />
        <div className="w-[80%] md:w-[60%] lg:w-[40%] text-center absolute top-[40%] pointer-events-none">
          <h4 className="mb-40 text-slate-500 text-4xl">འདིར་དཀའ་ངལ་འདུག</h4>
          <Link
            to="/"
            className="text-blue-500 font-bold text-3xl pointer-events-auto"
          >
            འདིར་ནོན།
          </Link>
        </div>
      </div>
    </>
  );
}

export default ErrorMessage;
