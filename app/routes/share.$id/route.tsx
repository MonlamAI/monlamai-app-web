import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "flowbite-react";
import { FaUniregistry } from "react-icons/fa6";
import { auth } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  let userdata = await auth.isAuthenticated(request);

  let id = params.id;
  const data = {
    input: "Hi how are you?",
    output: "ཧའེ། ཁྱེད་རང་བདེ་པོ་ཡིན་ནམ།",
    model: "translate",
    source: "en",
    target: "bo",
  };
  return { id, data, user: userdata };
};

function route() {
  let { id, data, user } = useLoaderData();

  return (
    <div className="h-screen flex flex-col">
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

      <div className="flex flex-col  mx-auto gap-3  justify-between  pt-12">
        <div className="flex gap-3">
          <div className="text-2xl border-2 border-gray-200 rounded shadow-md  font-medium text-gray-700 dark:text-gray-200   h-[50vh] p-2">
            <div className="text-gray-400 text-xl">User:</div>
            <div className="md:w-[600px]">{data.input}</div>
          </div>
          <div className="text-2xl border-2 border-gray-200 rounded shadow-md font-medium text-gray-700 dark:text-gray-200  h-[50vh] p-2">
            <div className="text-gray-400 text-xl">Translation:</div>
            <div className="md:w-[600px]">{data.output}</div>
          </div>
        </div>
        <div className="bg-red-300 self-end  mt-4">
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
