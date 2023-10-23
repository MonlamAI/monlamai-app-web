import { useLoaderData, useNavigate } from "@remix-run/react";
import { motion } from "framer-motion";

type ModalType = {
  icon: string;
  name: string;
  desc: string;
  link: string;
  color: string;
};

type EachProps = {
  model: ModalType;
  index: number;
  navigateTo: (link: string) => void;
};

function Tools() {
  const { user } = useLoaderData();
  let navigater = useNavigate();

  function navigateTo(link: string) {
    navigater("/tools/" + link);
  }

  let models: ModalType[] = [
    {
      icon: "fa fa-solid fa-globe",
      name: "ཡིག་སྒྱུར་རིག་ནུས།",
      desc: "དབྱིན་བོད་ཕན་ཚུན་ཡིག་སྒྱུར་བྱེད་ཐུབ།",
      link: "mt",
      color: "#ff006a",
    },
    {
      icon: "fas fa-volume-up",
      name: "ཀློག་འདོན་རིག་ནུས།",
      desc: "བོད་ཡིག་གཏག་མ་ཀློག་འདོན་བྱེད་ཐུབ།",
      link: "tts",
      color: "#00AAFF",
    },
    {
      icon: "fas fa-assistive-listening-systems",
      name: "སྒྲ་འཛིན་རིག་ནུས།",
      desc: "བོད་སྐད་ཡིག་འབེབས་བྱེད་ཐུབ།",
      link: "stt",
      color: "#FF0000",
    },
    {
      icon: "fas fa-file-alt",
      name: "ཡིག་འཛིན་རིག་ནུས།",
      desc: "པར་རིས་ནང་གི་བོད་ཡིག་ཡིག་འབེབས་བྱེད་ཐུབ།",
      link: "ocr",
      color: "#9933FF",
    },
  ];

  return (
    <main>
      <div className="py-[80px]" id="skills">
        <div className="text-center  max-w-[1140px] mx-auto">
          <p className="mb-20 text-2xl">
            གཤམ་གསལ་ཚོད་ལྟའི་རིག་ནུས་ཁག་ཁྱེད་ཀྱིས་མཉམ་སྤྱོད་བྱ་ཆོག།
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 mx-10">
            {models.map((model, index) => (
              <EachModel
                key={model.name}
                model={model}
                index={index}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function EachModel({ model, index, navigateTo }: EachProps) {
  const { name, desc, icon, link, color } = model;

  return (
    <motion.div
      whileHover={{ scale: 0.95 }}
      className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 shadow-lg hover:border-blue-600 hover:border-2 h-full flex flex-col gap-10 p-8 cursor-pointer"
      onClick={() => navigateTo(link)}
    >
      <i className={icon} style={{ fontSize: 35, color: color }}></i>
      <h2 className="text-xl">{name}</h2>
      <p className="text-gray-400">{desc}</p>
    </motion.div>
  );
}

export default Tools;
