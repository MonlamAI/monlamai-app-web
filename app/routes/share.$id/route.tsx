import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button, Card } from "flowbite-react";
import { FaArrowRightArrowLeft, FaUniregistry } from "react-icons/fa6";
import { auth } from "~/services/auth.server";
import { db } from "~/services/db.server";

const langLabels = {
  bo: "བོད་སྐད།",
  en: "English",
};

export const loader: LoaderFunction = async ({ request, params }) => {
  let userdata = await auth.isAuthenticated(request);
  let id = params.id as string;
  let data = await db.inference.findUnique({
    where: { id: parseInt(id) },
  });

  let langDir = data?.inputLang === "en" ? "en2bo" : "bo2en";
  // You can add more logic here to handle different language codes

  return { id, data, user: userdata, langDir };
};

function route() {
  let { id, data, user, langDir } = useLoaderData();

  if (!data)
    return (
      <div className=" flex gap-2 flex-col text-center capitalize">
        <span>Not found</span>
        <Link to="/" className="block mx-auto">
          <Button color="blue" type="button">
            <FaUniregistry className="mr-2" />
            Try it yourself
          </Button>
        </Link>
      </div>
    );
  let sourceLang = langDir === "en2bo" ? "en" : "bo";
  let targetLang = langDir === "en2bo" ? "bo" : "en";
  return (
    <div className=" flex flex-col z-20">
      {!user && (
        <header>
          <div className="text-2xl  flex gap-3 p-4  justify-center font-medium text-gray-700 text-center dark:text-gray-200">
            <img
              src="/assets/logo.png"
              width="40px"
              alt="Monalm AI"
              className="relative -top-1"
            />
            Monlam AI
          </div>
        </header>
      )}

      <div className="flex flex-col mt-5 md:mx-auto gap-3  justify-between  md:mt-20">
        {langDir && (
          <div className="w-full text-center">
            <div className="flex justify-center items-center gap-2">
              <div
                className={`inline-block text-lg text-gray-500 dark:text-gray-300 ${
                  sourceLang == "en" && "font-poppins text-xl"
                } ${sourceLang == "bo" && "text-lg leading-loose font-monlam"}`}
              >
                {langLabels[sourceLang]}
              </div>

              <button
                disabled
                className="group flex items-center justify-center text-center font-medium relative focus:z-10 focus:outline-none text-white bg-primary border border-transparent enabled:hover:bg-primary-hover focus:ring-primary dark:bg-primary dark:enabled:hover:bg-primary-hover dark:focus:ring-primary rounded-full focus:ring-2 px-2"
              >
                <FaArrowRightArrowLeft size="20px" />
              </button>

              <div
                className={`inline-block text-lg text-right text-gray-500 dark:text-gray-300
          ${sourceLang != "en" && "font-poppins text-xl"} ${
                  sourceLang != "bo" && "text-lg leading-loose font-monlam"
                }`}
              >
                {langLabels[targetLang]}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row h-[50vh] gap-3">
          <Card>
            <div className="h-full">
              <div className="text-gray-400 text-xl">User:</div>
              <div className="md:w-[600px] font-poppins mt-4">{data.input}</div>
            </div>
          </Card>
          <Card>
            <div className="h-full">
              <div className="text-gray-400 text-xl">Translation:</div>
              <div className="md:w-[600px] font-monlam mt-4">{data.output}</div>
            </div>
          </Card>
        </div>
        <div className=" self-end  mt-4">
          <Link to="/">
            <Button color="blue" type="button">
              <FaUniregistry className="mr-2" />
              Try it yourself
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default route;
