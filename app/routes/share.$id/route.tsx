import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button } from "flowbite-react";
import React from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

export const loader: LoaderFunction = async ({ request, params }) => {
  let id = params.id;
  const data = {
    input: "Hi how are you?",
    output: "ཧའེ། ཁྱེད་རང་བདེ་པོ་ཡིན་ནམ།",
    model: "translate",
    source: "en",
    target: "bo",
  };
  return { id, data };
};

const langLabels = {
  bo: "བོད་སྐད།",
  en: "English",
};

function route() {
  let { id, data } = useLoaderData();
  return (
    <div>
      <header>
        <div className="text-2xl  flex gap-3 p-4 bg-red-400 justify-center font-medium text-gray-700 text-center dark:text-gray-200">
          <img
            src="/assets/logo.png"
            width="40px"
            alt="Monalm AI"
            className="relative -top-1"
          />
          Monlam AI
        </div>
        <div className="text-lg text-gray-500 dark:text-gray-300">{id}</div>
      </header>

      <div className="mt-4">
        <div className="text-2xl font-medium text-gray-700 dark:text-gray-200">
          input: {data.input}
        </div>
        <div className="text-2xl font-medium text-gray-700 dark:text-gray-200">
          output: {data.output}
        </div>
      </div>
      <div>
        <Button>get Started with Monlam AI</Button>
      </div>
    </div>
  );
}

export default route;
