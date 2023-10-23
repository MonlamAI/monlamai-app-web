import { type LoaderFunction } from "@remix-run/node";
import { getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  let user = await getUserSession(request);
  let { AUTH0_DOMAIN, AUTH0_CLIENT_ID, NODE_ENV } = process.env;
  return {
    env: { AUTH0_DOMAIN, AUTH0_CLIENT_ID, NODE_ENV },
    user,
  };
};

function About() {
  return (
    <div className="md:py-[160px] m-auto w-[90%] md:w-[80%]">
      <div className="flex flex-col justify-center items-center gap-10 px-4 lg:flex-row">
        <img
          src="/assets/about.jpg"
          alt="monlam"
          className="w-[80%] md:w-[60%] lg:w-[40%] border-[#dddcdc] rounded-xl"
        />
        <div className="text-lg leading-8">
          <h4 className="text-[1.5rem] mb-4">
            སྨོན་ལམ་མིས་བཟོས་རིག་ནུས་ཀྱི་ལས་གཞི།
          </h4>
          <div className="mb-4">
            ཕྱི་ལོ་༢༠༢༣ ལོར་སྨོན་ལམ་བོད་ཀྱི་བརྡ་འཕྲིན་ཞིབ་འཇུག་ཁང་དང་།
            འབྲེལ་ཡོད་སློབ་ཆེན་དང་།
            ཚོགས་པ་རེ་འགས་མཉམ་འབྲེལ་ངང་བོད་ཀྱི་སྐད་ཡིག་གི་སྐོར་བརྡ་ཕྲིན་ལག་རྩལ་འཕེལ་རྒྱས་གཏོང་བའི་ལས་གཞིའི་ནང་།
            <ol className="list-decimal ml-5">
              <li>སྨོན་ལམ་ཡིག་སྒྱུར་རིག་ནུས།</li>
              <li>སྨོན་ལམ་ཡིག་གཟུགས་ངོས་འཛིན་རིག་ནུས།</li>
              <li>སྨོན་ལམ་འབྲི་ཀློག་རིག་ནུས།</li>
            </ol>
          </div>
          <p>
            ལས་གཞི་འདི་ནི་མིས་བཟོས་རིག་ནུས་(AI) མཉེན་ཆས་ཡིན་པས།
            འཕྲུལ་ཆས་རང་ལ་ཡིག་གཟུགས་དང་། སྐད་གདངས།
            ཡི་གེ་ཀློག་ཚུལ་བཅས་ངོས་འཛིན་པའི་ནུས་པ་ཡོད་པ་ཞིག་བཟོ་དགོས་པས།
            དེའི་ཆེད་དུ་པར་རིས་དང་། ཡིག་གཟུགས།
            སྒྲ་གདངས་སོགས་རྒྱུ་ཆ་ཤིན་ཏུ་མང་པོ་གསོག་སྒྲུབ་བྱ་དགོས་ན།
            མི་གྲངས་བརྒྱ་ཕྲག་བརྒལ་པས་ལོ་གསུམ་རིང་བསྒྲུབ་དགོས་པས།
            དུས་ཡུན་རིང་ཞིང་གཞི་རྒྱ་ཆེ་བའི་བྱ་བ་ཞིག་ཡིན།
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
