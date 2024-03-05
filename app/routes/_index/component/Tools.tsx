import { Link, NavLink } from "@remix-run/react";
import { Card } from "flowbite-react";

import { motion } from "framer-motion";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { ModalType, models } from "~/helper/models";

type EachProps = {
  model: ModalType;
};

function Tools() {
  return (
    <main>
      <div className="text-center max-w-7xl mx-auto h-[70vh] mt-10 lg:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-10">
          {models.map((model, index) => (
            <EachModel key={model.name} model={model} />
          ))}
        </div>
      </div>
    </main>
  );
}

function EachModel({ model }: EachProps) {
  const { name, desc, icon, link } = model;
  const { translation, locale } = uselitteraTranlation();
  const isEnglish = locale === "en_US";
  return (
    <NavLink prefetch="intent" to={"/model/" + link} unstable_viewTransition>
      {({ isTransitioning }) => (
        <motion.div whileHover={{ scale: 0.95 }} className="h-full">
          <Card
            className="h-full flex flex-row md:flex-col md:py-3"
            renderImage={() => (
              <div
                className="flex  justify-center items-center ml-2 md:ml-0 md:py-3  dark:mix-blend-exclusion dark:rounded-lg "
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
            )}
          >
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
                } md:text-[0.7rem] mt-3 lg:mt-0 `}
              >
                {translation[desc]}
              </p>
            </div>
          </Card>
        </motion.div>
      )}
    </NavLink>
  );
}

export default Tools;
