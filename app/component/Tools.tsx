import { Link } from "@remix-run/react";

import { motion } from "framer-motion";
import { ModalType, models } from "~/helper/models";

type EachProps = {
  model: ModalType;
};

function Tools() {
  return (
    <main>
      <div className="md:pt-[40px]" id="skills">
        <div className="text-center max-w-7xl mx-auto">
          <p className=" px-3 mb-20 text-2xl leading-[200%] ">
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
    <Link prefetch="intent" to={"/model/" + link}>
      <motion.div
        whileHover={{ scale: 0.95 }}
        className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 shadow-lg hover:border-blue-600 hover:border-2 h-full flex flex-col gap-10 p-8 cursor-pointer"
      >
        <div
          style={{ fontSize: 35, color: color }}
          className="flex justify-center"
        >
          {icon}
        </div>
        <h2 className="text-xl">{name}</h2>
        <p className="text-gray-400">{desc}</p>
      </motion.div>
    </Link>
  );
}

export default Tools;
