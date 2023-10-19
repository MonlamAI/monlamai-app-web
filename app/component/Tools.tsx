import { useLoaderData, useNavigate } from "@remix-run/react";
import { Card } from "flowbite-react";
import { MdOutlineArrowRightAlt } from "react-icons/md/index.js";

type ModalType = {
  icon: string;
  name: string;
  desc: string;
  link: string;
};

type EachProps = {
  model: ModalType;
  index: number;
  checkAuth: (link: string) => void;
  navigateTo: (link: string) => void;
};

function List() {
  const { user } = useLoaderData();
  let navigater = useNavigate();

  function checkAuth(link: string) {
    console.log("user", user);
    navigater("/tools/" + link);
  }

  function navigateTo(link: string) {
    navigater("/tools/" + link);
  }

  let models: ModalType[] = [
    {
      icon: "fa fa-solid fa-globe",
      name: "ཡིག་སྒྱུར་རིག་ནུས།",
      desc: "དབང་རྩའི་འཕྲུལ་རིག་གི་ཡིག་སྒྱུར་རིག་ནུས།",
      link: "mt",
    },
    {
      icon: "fas fa-volume-up",
      name: "ཀློག་འདོན་རིག་ནུས།",
      desc: "ཡེ་གེ་ཀློག་འདོན་གྱིས་འགྲོ་བ་མིའི་ངག་གི་འགན་སྒྲུབ་ཐུབ།",
      link: "tts",
    },
    {
      icon: "fas fa-assistive-listening-systems",
      name: "སྒྲ་འཛིན་རིག་ནུས།",
      desc: "རིག་ནུས་འདིའི་བོད་སྐད་གོ་ཐུབ་པའི་ཁྱད་ཆོས་ལྡན།",
      link: "stt",
    },
    {
      icon: "fas fa-file-alt",
      name: "གཟུགས་འཛིན་རིག་ནུས།",
      desc: "པར་རིས་ཡིག་གཟུགས་འདྲ་མིན་ངོས་འཛིན་བྱེད་ཐུབ།",
      link: "ocr",
    },
  ];

  return (
    <main>
      <div className="py-[100px]" id="skills">
        <div className="text-center  max-w-[1140px] mx-auto">
          <h2 className="text-[2rem] mb-2">སྨོན་མ་རིག་ནུས་ཞབས་ཞུའི་མ་ལག</h2>
          <p className="mb-8">
            གཤམ་གསལ་ཚོད་ལྟའི་མ་ལག་ཁག་ལ་ཁྱེད་རང་མཉམ་ཞུགས་བྱ་ཆོག
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 mx-10">
            {models.map((model, index) => (
              <EachModel
                key={model.name}
                model={model}
                index={index}
                checkAuth={checkAuth}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function EachModel({ model, index, checkAuth, navigateTo }: EachProps) {
  const { name, desc, icon, link } = model;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <i className={icon} style={{ fontSize: 24 }}></i>
      <h2 className="text-xl">{name}</h2>
      <p className="text-gray-400">{desc}</p>
      <button
        type="button"
        className="text-[#368df7] py-3 rounded-xl flex gap-2  justify-center items-center mt-2"
        onClick={() => navigateTo(link)}
      >
        བེད་སྤྱོད་གནང་རོགས།
        <MdOutlineArrowRightAlt />
      </button>
    </Card>
  );
}

export default List;
