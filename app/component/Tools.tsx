import { Link } from "@remix-run/react";

import { motion } from "framer-motion";
import { ModalType, models } from "~/helper/models";
import uselitteraTranlation from "./hooks/useLitteraTranslation";

type EachProps = {
  model: ModalType;
};

function Tools() {
  let { translation, locale } = uselitteraTranlation();
  return (
    <main>
      <div className="md:pt-[40px]">
        <div className="text-center max-w-7xl mx-auto">
          <div
            className=" px-3 mb-20 mt-10 leading-[normal] text-[1.25rem] md:text-[2.2rem] "
          >
            {translation.homepageHeading}
          </div>
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
  const { translation, locale } = uselitteraTranlation();
  return (
    <Link prefetch="intent" to={"/model/" + link}>
      <motion.div
        whileHover={{ scale: 0.95 }}
        className="rounded-lg flex flex-col border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 shadow-lg hover:border-blue-600 hover:border-2 h-full gap-5 p-6 cursor-pointer"
      >
        <div
          style={{ fontSize: 35, color: color }}
          className="flex justify-center dark:mix-blend-exclusion dark:rounded-lg h-32"
        >
          {icon}
        </div>
        <div className="flex flex-col justify-between flex-1 gap-5 text-[1.25rem] md:text-[2.2rem] ">
          <h2
            className=" content-start"
            style={{ fontSize: locale === "en_US" ? "1em" : "1.6em" }}
          >
            {translation[name]}
          </h2>
          <p
            className="text-gray-400 "
            style={{ fontSize: locale === "en_US" ? "1rem" : "1.2rem" }}
          >
            {translation[desc]}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default Tools;
