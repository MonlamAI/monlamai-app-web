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

  const teamMembers = Array(10).fill({
    name: "KhenrapGyatso",
    role: "Chief editor",
    imageUrl: "/assets/instructors/kurt.png",
  });

  return (
    <div
      className={`m-auto w-[90%] md:w-[80%]  flex flex-col ${
        isTibetan ? "font-monlam leading-loose" : "font-poppins"
      }`}
    >
      <ToolWraper title="team">
        <div className="container mx-auto text-center">
          <div className="flex flex-col md:flex-row mb-8 justify-between items-center">
            <div className="w-full md:w-1/2 mb-4 text-left">
              <h1 className="text-4xl font-bold mb-4">Our Team</h1>
              <p className="text-gray-700">
                Welcome to a new era of innovation and progress! In today's
                world, technology has reached remarkable heights, and Artificial
                Intelligence (AI) stands at the forefront of this technological
                revolution. AI's advancement in information technology is
                reshaping how we access and utilize knowledge. The future
                {/* ... rest of the paragraph */}
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <img
                src="/assets/buddha.png"
                alt="Our office"
                className="w-full h-80 object-contain rounded-xl"
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-6">Meet Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {EnglishTeam.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
            <Outlet />
          </div>
        </div>
      </ToolWraper>
    </div>
  );
}

export default Team;
