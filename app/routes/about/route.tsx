import { type LoaderFunction } from "@remix-run/node";
import Instructor from "~/routes/about/components/Instructors";
import Lamas from "~/routes/about/components/Lama";
import Sponsors from "~/routes/about/components/Sponsors";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { getUserDetail } from "~/services/session.server";
import { Intro } from "./components/Intro";

export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await getUserDetail(request);
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
