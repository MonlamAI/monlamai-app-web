import React from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import ToolWraper from "~/component/ToolWraper";
import { getUserDetail } from "~/services/session.server";
import TeamMember from "./components/TeamMember";
import { Outlet } from "@remix-run/react";
import TibetanTeam from "~/helper/teamData/bo.json";
import EnglishTeam from "~/helper/teamData/en.json";

export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await getUserDetail(request);
  return userdata;
};

function Team() {
  let { translation, isTibetan } = uselitteraTranlation();

  const teamData = isTibetan ? TibetanTeam : EnglishTeam;

  return (
    <div
      className={`m-auto w-[90%] md:w-[80%]  flex flex-col ${
        isTibetan ? "font-monlam leading-loose" : "font-poppins"
      }`}
    >
      <ToolWraper title="team">
        <div className="flex flex-col md:flex-row mb-8 justify-between items-center">
          <div className="w-full md:w-1/2 mb-4 text-left">
            <h1 className="text-4xl font-bold mb-4">Our Team</h1>
            <p>
              Our Team Each member of the Monlam AI team is dedicated to pushing
              the boundaries of what technology can do for minority languages
              and cultures. Our backgrounds are as diverse as our roles, yet we
              are united by a commitment to making a meaningful impact. From
              software engineers to Tibetan language experts and cultural
              advisors, our team collaborates closely to ensure that our
              projects align with the needs and aspirations of the Tibetan
              community.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <img
              src="/assets/buddha.png"
              alt="Our office"
              className="w-full max-h-80 object-contain rounded-xl"
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {teamData
            // .sort(() => Math.random() - 0.5)
            .map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          <Outlet />
        </div>
      </ToolWraper>
    </div>
  );
}

export default Team;
