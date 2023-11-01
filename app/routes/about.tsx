import { type LoaderFunction } from "@remix-run/node";
import ErrorMessage from "~/component/ErrorMessage";
import Instructor from "~/component/about/Instructors";
import Intro from "~/component/about/Intro";
import Lamas from "~/component/about/Lama";
import Sponsors from "~/component/about/Sponsors";
import { getUserSession } from "~/services/session.server";

type Profile = {
  img: string;
  name: string;
  designation: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  let user = await getUserSession(request);
  let { AUTH0_DOMAIN, AUTH0_CLIENT_ID, NODE_ENV } = process.env;
  return {
    env: { AUTH0_DOMAIN, AUTH0_CLIENT_ID, NODE_ENV },
    user,
  };
};

function About() {
  let profile: Profile[] = [
    {
      img: "/assets/monlam.jpg",
      name: "མོན་ལམ་དགེ་བཤུས།",
      designation: "དཔལ་ལྡན་འདས་པ།",
    },
  ];

  return (
    <div className="py-10 m-auto w-[90%] md:w-[80%] font-monlam">
      <Intro />
      <Lamas />
      <Instructor />
      <Sponsors />
    </div>
  );
}

export default About;

export function ErrorBoundary({ error }) {
  return (
    <>
      <ErrorMessage error={error} />
    </>
  );
}
