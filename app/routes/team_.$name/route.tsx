import { useLoaderData } from "@remix-run/react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import TibetanTeam from "~/helper/teamData/bo.json";
import EnglishTeam from "~/helper/teamData/en.json";
import { FaLinkedinIn } from "react-icons/fa6";
import type { LoaderFunction } from "@remix-run/node";
import ToolWraper from "~/component/ToolWraper";

// load the name from the URL
export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const name = params.name;

  const userDetails = EnglishTeam.find((member) => member.route === name);
  const subRoute = { name: userDetails?.name, route: pathname, subRoute: name };

  return { name, subRoute };
};

function TeamDetailsPage() {
  let { translation, isTibetan } = uselitteraTranlation();
  const { name, subRoute } = useLoaderData();

  const teamData = isTibetan ? TibetanTeam : EnglishTeam;

  const userDetails = teamData.find((member) => member.route === name);

  return (
    <div
      className={`m-auto w-[90%] md:w-[80%]  flex flex-col ${
        isTibetan ? "font-monlam leading-loose" : "font-poppins"
      }`}
    >
      <ToolWraper title="team" subRoute={subRoute}>
        <div className="flex flex-col lg:flex-row mx-auto gap-10 lg:gap-14 mt-10 mb-20">
          <div className="lg:w-1/3">
            <img
              src={userDetails?.headshot}
              alt={userDetails?.name}
              className="w-72 h-72 object-cover"
            />
            {userDetails?.linkedInId !== "" && (
              <div className="flex items-center gap-4 mt-4">
                <h5>Find them online:</h5>
                <a
                  href={userDetails?.linkedInId}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            )}
          </div>
          <div className="lg:w-2/3 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{userDetails?.name}</h2>
            <p className=" text-xl ">{userDetails?.designation}</p>
            <div className="space-y-4">
              <p>{userDetails?.bios}</p>
              <p>{userDetails?.educationalProfessionalBackground}</p>
            </div>
          </div>
        </div>
      </ToolWraper>
    </div>
  );
}

export default TeamDetailsPage;
