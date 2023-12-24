import { redirect } from "@remix-run/node";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

function ErrorMessage(error: any) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(".", { replace: true });
  }, []);
  return (
    <>
      {/* <div className="relative  flex flex-col mt-20 items-center  m-auto w-[90%] md:w-[80%]">
        <img
          src="/assets/buddha.png"
          alt="monlam"
          className="w-[80%] opacity-40 md:w-[60%] lg:w-[40%] border-[#dddcdc] rounded-lg shadow-sm hover:scale-95 transition-all duration-500"
        />
        <div className="w-[80%] md:w-[60%] lg:w-[40%] text-center absolute top-[45%] pointer-events-none">
          <h4 className="mb-40 text-slate-500 text-xl lg:text-4xl">
            འདིར་དཀའ་ངལ་འདུག
          </h4>
        </div>
        <Link
          to="/"
          title={"འདིར་ནོན།"}
          className="text-blue-600 mt-6 hover:text-blue-500 font-bold lg:text-3xl pointer-events-autopy-2 px-3  rounded"
        >
          འདིར་ནོན།
        </Link>
      </div> */}
    </>
  );
}

export default ErrorMessage;
