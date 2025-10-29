import { NavLink } from "@remix-run/react";
import { Card } from "flowbite-react";
import { motion } from "framer-motion";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import type { ModalType } from "~/helper/models";
import { models } from "~/helper/models";
type EachProps = {
  model: ModalType;
};

function Tools() {
  const { translation, locale } = uselitteraTranlation();
  const isEnglish = locale === "en_US";
  return (
    <main className="flex justify-center pt-6 md:pt-10 mb-8 md:mb-12">
      <div className="w-full lg:max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Hero section */}
        <section className="text-center mb-10">
          <h1
            className={`text-light_text-default dark:text-dark_text-default ${
              isEnglish ? "text-2xl md:text-3xl font-bold" : "text-2xl md:text-3xl font-monlam"
            }`}
          >
            {translation.homepageHeading}
          </h1>
          <p
            className={`mt-2 text-light_text-secondary dark:text-neutral-400 ${
              isEnglish ? "text-sm md:text-base" : "text-sm md:text-base font-monlam"
            }`}
          >
            {translation.homepageTagline}
          </p>
        </section>

        {/* Tools grid */}
        <section className="bg-gradient-to-b from-gray-50 to-white dark:from-transparent dark:to-transparent rounded-none">
          <div id="tools" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {models
              .filter((m) => m.name !== "TTS")
              .map((model) => <EachModel key={model.name} model={model} />)}
          </div>
        </section>
      </div>
    </main>
  );
}

function EachModel({ model }: EachProps) {
  const { name, desc, icon, link } = model;
  const { translation, locale } = uselitteraTranlation();
  const isEnglish = locale === "en_US";
  return (
    <NavLink to={"/model/" + link} prefetch={link==='mt'?"render":"intent"}  className="w-full transition-transform active:scale-[0.98]" unstable_viewTransition>
      {({ isTransitioning }) => (
        <motion.div whileHover={{ scale: 0.98 }}>
          <Card
            theme={{
              root: {
                base: "flex rounded-2xl border border-neutral-200 bg-shadow-md dark:border-[--card-border] bg-neutral dark:bg-[--card-bg] hover:ring-1 hover:ring-secondary-300 dark:hover:ring-primary-600/40 shadow-sm hover:shadow-md transition-colors transition-shadow duration-200 transform hover:-translate-y-1",
                children: `flex flex-col justify-start items-start space-y-2 md:space-y-3 ${
                  isEnglish ? "font-poppins" : "font-monlam"
                }`,
              },
            }}
            className="h-full w-full  flex flex-col p-6 md:p-8"
            renderImage={() => (
              <div
                className="flex justify-start mb-2 md:mb-3 text-neutral-950 dark:text-primary-500"
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
            <h2
              className={`text-light_text-default dark:text-dark_text-default ${
                isEnglish
                  ? "text-xl md:text-3xl font-semibold"
                  : "text-xl md:text-2xl  mt-2 md:mt-3"
              }`}
            >
              {translation[name]}
            </h2>
            <p
              className={`text-light_text-secondary dark:text-neutral-400 ${
                isEnglish ? "text-base font-normal" : "text-[0.7rem]"
              }`}
            >
              {translation[desc]}
            </p>
          </Card>
        </motion.div>
      )}
    </NavLink>
  );
}

export default Tools;
