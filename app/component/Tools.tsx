import {
  Link,
  PrefetchPageLinks,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
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
};

function Tools() {
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
      <div className="md:pt-[40px]" id="skills">
        <div className="text-center max-w-7xl mx-auto">
          <p className="mb-20 text-2xl leading-[200%] ">
            གཤམ་གསལ་ཚོད་ལྟའི་རིག་ནུས་ཁག་ཁྱེད་ཀྱིས་མཉམ་སྤྱོད་བྱ་ཆོག
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-10">
            {models.map((model, index) => (
              <EachModel key={model.name} model={model} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function EachModel({ model }: EachProps) {
  const { name, desc, icon, link, color } = model;

  return (
    <Link prefetch="intent" to={"/tools/" + link}>
      <motion.div
        whileHover={{ scale: 0.95 }}
        className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 shadow-lg hover:border-blue-600 hover:border-2 h-full flex flex-col gap-10 p-8 cursor-pointer"
      >
        <i className={icon} style={{ fontSize: 35, color: color }}></i>
        <h2 className="text-xl">{name}</h2>
        <p className="text-gray-400">{desc}</p>
      </motion.div>
    </Link>
  );
}

export default Tools;
