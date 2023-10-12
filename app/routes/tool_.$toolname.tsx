import { type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import Footer from "~/component/Mainpage/Footer";
import Header from "~/component/Mainpage/Header";
import PowerUser from "~/component/Mainpage/PowerUser";
import { getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  let toolname = params.toolname;
  let user = await getUserSession(request);
  let { AUTH0_DOMAIN, AUTH0_CLIENT_ID, NODE_ENV } = process.env;
  return {
    env: { AUTH0_DOMAIN, AUTH0_CLIENT_ID, NODE_ENV },
    user,
    toolname,
  };
};

function Tool() {
  let { toolname } = useLoaderData();

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <p>{toolname}</p>
      </div>
      <PowerUser />
      <Footer />
    </>
  );
}

export default Tool;
