import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import ToolWraper from "~/component/ToolWraper";
import TeamMember from "./components/TeamMember";
import { Outlet } from "@remix-run/react";
import TibetanTeam from "~/helper/teamData/bo.json";
import EnglishTeam from "~/helper/teamData/en.json";
import { auth } from "../../services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await auth.isAuthenticated(request);
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
        <div className="flex flex-col md:flex-row mb-8 justify-between items-center gap-6">
          <div className="w-full md:w-1/2 mb-4 text-left">
            <h1
              className={`text-4xl font-bold mb-4 ${
                isTibetan ? "leading-loose" : ""
              }`}
            >
              {translation.ourTeam}
            </h1>
            <p className={`${isTibetan ? "leading-loose" : ""}`}>
              {isTibetan
                ? `སྨོན་ལམ་མིས་བཟོས་རིག་ནུས་ཚན་པའི་ཁོངས་མི་རེ་རེས་གྲངས་ཉུང་མི་རིགས་ཀྱི་སྐད་ཡིག་དང་རིག་གཞུང་གི་ཆེད་དུ་བརྡ་འཕྲིན་འཕྲུལ་རིག་གིས་ཅི་ཞིག་བྱེད་ཐུབ་པའི་ས་མཚམས་རྒྱ་བསྐྱེད་གཏོང་རྒྱུར་བསམ་གཞིག་དང་འབད་བརྩོན་བྱེད་བཞིན་ཡོད། ང་ཚོའི་ཚོགས་མི་སོ་སོའི་ཆེད་ལས་དང་ལས་འགན་སྣ་ཚོགས་ཡིན་ཡང་། ང་ཚོས་རང་གི་སྐད་ཡིག་དང་རིག་གཞུང་ལ་དོན་སྙིང་ལྡན་པའི་ཞབས་འདེགས་ཤིག་ཞུ་ཐུབ་རྒྱུའི་ཆོད་སེམས་ཀྱིས་མཉམ་དུ་འབྲེལ་ཡོད། མཉེན་ཆས་བཟོ་སྐྲུན་པ་ནས་བོད་ཀྱི་སྐད་ཡིག་ཆེད་མཁས་པ་དང་རིག་གཞུང་སློབ་སྟོན་པའི་བར། ང་ཚོའི་ཚོགས་པས་ལས་འཆར་རྣམས་བོད་མིའི་སྤྱི་ཚོགས་ཀྱི་དགོས་མཁོ་དང་ཕྱོགས་ཡོངས་ནས་མཐུན་པར་མཉམ་ལས་བྱེད་བཞིན་ཡོད།`
                : `Each member of the Monlam AI team is dedicated to pushing
              the boundaries of what technology can do for minority languages
              and cultures. Our backgrounds are as diverse as our roles, yet we
              are united by a commitment to making a meaningful impact. From
              software engineers to Tibetan language experts and cultural
              advisors, our team collaborates closely to ensure that our
              projects align with the needs and aspirations of the Tibetan community.`}
            </p>
          </div>
          <div className="w-full md:w-[50%]">
            <img
              src="/assets/team/team2.jpg"
              alt="Our office"
              className="w-full max-h-80 object-cover rounded-xl"
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isTibetan ? "ཁོངས་མི་ངོ་སྤྲོད།" : "Meet Our Team"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {teamData.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
          <Outlet />
        </div>
      </ToolWraper>
    </div>
  );
}

export default Team;
