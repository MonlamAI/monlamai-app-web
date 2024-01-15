import { Link, NavLink } from "@remix-run/react";

import { motion } from "framer-motion";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { ModalType, models } from "~/helper/models";

type EachProps = {
  model: ModalType;
};

function Tools() {
  let { translation, locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";
  return (
    <main>
      <div className="py-5 md:pt-[5vh] h-full my-auto">
        <div className="text-center max-w-7xl mx-auto">
          <div
            className={` 
            px-3 mb-20 mt-10 leading-[normal] text-[1.25rem] md:text-[2rem]  ${
              !isEnglish ? "font-monlam " : " font-poppins"
            }
          `}
          >
            {translation.homepageHeading}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-10 mb-7 ">
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
  const isEnglish = locale === "en_US";
  return (
    <NavLink prefetch="intent" to={"/model/" + link} unstable_viewTransition>
      {({ isTransitioning }) => (
        <motion.div
          whileHover={{ scale: 0.95 }}
          className="rounded-lg flex  md:flex-col border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 shadow-lg hover:border-blue-600 hover:border-2 h-full gap-1 md:gap-5 p-2 md:py-5 cursor-pointer"
        >
          <div
            className="flex justify-center dark:mix-blend-exclusion dark:rounded-lg  "
            style={
              isTransitioning
                ? {
                    viewTransitionName: "icon-transition",
                  }
                : undefined
            }
          >
            {icon}
          </div>
          <div
            className={`flex flex-col justify-around flex-1 md:gap-5 text-[1.25rem] md:text-[2.2rem] 
        ${isEnglish ? "font-poppins" : "font-monlam"}`}
          >
            <h2
              className={`${
                isEnglish ? "text-[1rem]" : "text-[1.2rem]"
              } md:text-[1.4rem]`}
            >
              {translation[name]}
            </h2>
            <p
              className={`text-gray-400 ${
                isEnglish ? "text-[0.7rem]" : "text-[0.7rem]"
              } md:text-[0.7rem]`}
            >
              {translation[desc]}
            </p>
          </div>
        </motion.div>
      )}
    </NavLink>
  );
}

export default Tools;
