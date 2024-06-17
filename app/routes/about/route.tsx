import { type LoaderFunction } from "@remix-run/node";
import Instructor from "~/routes/about/components/Instructors";
import Lamas from "~/routes/about/components/Lama";
import Sponsors from "~/routes/about/components/Sponsors";
import { getUserDetail } from "~/services/session.server";
import { Intro } from "./components/Intro";
import ToolWraper from "~/component/ToolWraper";

export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await getUserDetail(request);
  return userdata;
};

function About() {
  return (
    <div className="m-auto w-[90%] md:w-[80%] font-monlam flex flex-col">
      <ToolWraper title="aboutUs">
        <Intro />
        <Lamas />
        <Instructor />
        <Sponsors />
      </ToolWraper>
    </div>
  );
}

export default About;
