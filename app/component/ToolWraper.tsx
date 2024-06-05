import React from "react";
import { models } from "~/helper/models";
import uselitteraTranlation from "./hooks/useLitteraTranslation";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Link } from "@remix-run/react";

export const HomeIconWrapper = () => {
  return <HiHome className="dark:fill-primary-500 fill-secondary-500" />;
};

function ToolWraper({ title, children }) {
  let model = models.find((model) => model.name === title) ?? null;
  let { translation, locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";
  return (
    <>
      <Breadcrumb
        theme={breadcrumb_theme.root}
        aria-label="Default breadcrumb "
        className={`${!isEnglish ? "font-monlam" : "font-poppins"} text-[14px]`}
      >
        <Breadcrumb.Item icon={HomeIconWrapper} theme={breadcrumb_theme.item}>
          <Link
            to="/"
            className="dark:text-primary-500 capitalize px-1 text-secondary-500"
          >
            {translation["home"]}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#" theme={breadcrumb_theme.item}>
          {translation[title]}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="pt-[24px]">{children}</div>
    </>
  );
}

export function ShareToolWraper({ title, children }) {
  let model = models.find((model) => model.name === title) ?? null;
  let { translation, locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";
  return (
    <>
      <h1
        className={`text-lg ${
          isEnglish
            ? "font-poppins md:text-[1.6rem]"
            : "font-monlam md:text-[2.7rem]"
        } flex gap-4 justify-center items-center text-center text-slate-700 dark:text-gray-200 `}
      >
        <div className="dark:mix-blend-multiply ">{model?.icon}</div>
        {translation[title]}
      </h1>
      {children}
    </>
  );
}

export default ToolWraper;

let breadcrumb_theme = {
  root: {
    base: "",
    list: "flex items-center",
  },
  item: {
    base: "group flex items-center",
    chevron: "mx-1 h-4 w-4 text-gray-400 group-first:hidden md:mx-2",
    href: {
      off: "flex items-center font-medium text-gray-500 dark:text-gray-400",
      on: "flex items-center font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
    },
    icon: "mr-2 h-4 w-4 ",
  },
};
