import { type LoaderFunction } from "@remix-run/node";
import Instructor from "~/component/about/Instructors";
import { EnglishIntro, TibetanIntro } from "~/component/about/Intro";
import Lamas from "~/component/about/Lama";
import Sponsors from "~/component/about/Sponsors";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { auth } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return userdata;
};

function About() {
  let { locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";
  return (
    <div className="py-10 m-auto w-[90%] md:w-[80%] font-monlam flex flex-col">
      {isEnglish ? <EnglishIntro /> : <TibetanIntro />}
      <Lamas />
      <Instructor />
      <Sponsors />
    </div>
  );
}

export default About;
