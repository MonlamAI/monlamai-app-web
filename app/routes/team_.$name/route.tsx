import { useLoaderData } from "@remix-run/react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import TibetanTeam from "~/helper/teamData/bo.json";
import EnglishTeam from "~/helper/teamData/en.json";
import { FaLinkedinIn } from "react-icons/fa6";

// load the name from the URL
export const loader: LoaderFunction = async ({ params }) => {
  console.log(params, "name is:", params.name);
  return { name: params.name };
};

function TeamDetailsPage() {
  let { translation, isTibetan } = uselitteraTranlation();
  const { name } = useLoaderData();

  const userDetails = EnglishTeam.find((member) => member.route === name);
  console.log(userDetails, "userDetails");

  return (
    <div
      className={`m-auto w-[90%] md:w-[80%]  flex flex-col ${
        isTibetan ? "font-monlam leading-loose" : "font-poppins"
      }`}
    >
      {/* <ToolWraper title="team"> */}
      <div className="flex flex-col lg:flex-row mx-auto gap-10 lg:gap-20 mt-10">
        <div className="lg:w-1/3">
          <img
            src="/assets/instructors/markus.jpeg"
            alt="Tenzin Tashi"
            className="max-w-full h-auto object-cover"
          />
          <div className="flex gap-4 mt-4">
            <h5 className="text-gray-600">Find them online:</h5>
            <a href={userDetails?.linkedInId}>
              <FaLinkedinIn className="text-xl" />
            </a>
          </div>
        </div>
        <div className="lg:w-2/3 flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{userDetails?.name}</h2>
          <p className=" text-2xl text-gray-600">{userDetails?.designation}</p>
          <div className="space-y-4">
            <p className="text-gray-700">{userDetails?.bios}</p>
            <p className="text-gray-700">
              {userDetails?.educationalProfessionalBackground}
            </p>
          </div>
        </div>
      </div>
      {/* </ToolWraper> */}
    </div>
  );
}

export default TeamDetailsPage;
