import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button, Card } from "flowbite-react";
import { FaUniregistry } from "react-icons/fa6";
import { auth } from "~/services/auth.server";
import { db } from "~/services/db.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  let userdata = await auth.isAuthenticated(request);

  let id = params.id as string;

  let data = await db.inference.findUnique({
    where: { id: parseInt(id) },
  });

  return { id, data, user: userdata };
};

function route() {
  let { id, data, user } = useLoaderData();
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
  return (
    <div className=" flex flex-col">
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
