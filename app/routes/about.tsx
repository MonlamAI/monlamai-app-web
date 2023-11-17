import { type LoaderFunction } from "@remix-run/node";
import Instructor from "~/component/about/Instructors";
import Intro from "~/component/about/Intro";
import Lamas from "~/component/about/Lama";
import Sponsors from "~/component/about/Sponsors";
import { auth } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return userdata;
};

function About() {
  return (
    <div className="py-10 m-auto w-[90%] md:w-[80%] font-monlam flex flex-col">
      <Intro />
      <Lamas />
      <Instructor />
      <Sponsors />
    </div>
  );
}

export default About;
