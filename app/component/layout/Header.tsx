import { Form, NavLink, useRouteLoaderData, Link } from "@remix-run/react";
import { IoLogInSharp } from "react-icons/io5";
import { Button, CustomFlowbiteTheme, Dropdown } from "flowbite-react";
import { useState } from "react";
import { HiLogout } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import uselitteraTranlation from "../hooks/useLitteraTranslation";
import TranslationSwitcher from "../TranslationSwitcher";
import DarkModeSwitcher from "../DarkModeSwitcher";
import { motion } from "framer-motion";
function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { isEnglish, translation } = uselitteraTranlation();
  const data = useRouteLoaderData("root");
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };
  return (
    <nav
      className={`flex h-20 bg-neutral-100 dark:bg-surface-dark justify-center  flex-col lg:flex-row  ${
        isEnglish ? "font-poppins" : "font-monlam"
      } `}
    >
      <div className="flex px-1 py-2  items-center justify-between  max-w-[1280px] w-full  ">
        <NavLink
          className="flex items-center gap-2 text-xl"
          prefetch="intent"
          unstable_viewTransition
          to="/"
        >
          <img
            src="/assets/logo.png"
            width="40px"
            alt="Monalm AI"
            className="relative -top-1"
          />
          {translation.monlamAI}
        </NavLink>
        <button
          className="block lg:hidden z-50 pr-2"
          onClick={() => setShowMenu((p) => !p)}
        >
          {showMenu ? <RxCross1 /> : <GiHamburgerMenu />}
        </button>
        <div className="hidden lg:flex gap-2 ml-8 flex-1 justify-between ">
          <div className="flex items-center gap-8 text-sm ml-4">
            <AboutLink />
            {data?.isJobEnabled && <JobLink />}
            <TeamLink />
          </div>
          <div className="flex items-center gap-4 mr-7">
            <DarkModeSwitcher />
            <TranslationSwitcher />
            <Menu />
          </div>
        </div>
        {/* mobile view */}
        <motion.div
          animate={showMenu ? "open" : "closed"}
          variants={variants}
          className="block md:hidden absolute top-0 left-0 right-0 w-full h-full bg-neutral-100 dark:bg-secondary-900 shadow-lg z-40"
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-4 p-5">
            <NavLink
              className="flex items-center gap-2 text-xl"
              prefetch="intent"
              unstable_viewTransition
              to="/"
              onClick={() => setShowMenu((p) => !p)}
            >
              <img
                src="/assets/logo.png"
                width="40px"
                alt="Monalm AI"
                className="relative -top-1"
              />
              {translation.monlamAI}
            </NavLink>
            <div onClick={() => setShowMenu((p) => !p)}>
              <AboutLink />
            </div>
            <div onClick={() => setShowMenu((p) => !p)}>
              {data?.isJobEnabled && <JobLink />}
            </div>
            <div onClick={() => setShowMenu((p) => !p)}>
              <TeamLink />
            </div>
            <div onClick={() => setShowMenu((p) => !p)}>
              <DarkModeSwitcher />
            </div>

            <div onClick={() => setShowMenu((p) => !p)}>
              <TranslationSwitcher />
            </div>
            <Menu />
          </div>
        </motion.div>
      </div>
    </nav>
  );
}

export default Header;

function Menu() {
  const { user } = useRouteLoaderData("root");
  const { translation, locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";
  const isTibetan = locale === "bo_TI";
  const customTheme: CustomFlowbiteTheme["button"] = {
    color: {
      primary: "bg-primary-500 hover:bg-primary-600",
      secondary: "bg-secondary-500 hover:bg-secondary-600 text-white",
    },
  };
  if (!user)
    return (
      <Form method="post" action="/auth0">
        <Button
          type="submit"
          className={` ${isEnglish ? "font-poppins " : "font-monlam"}`}
          color="secondary"
          pill
          theme={customTheme}
        >
          {translation.login}
        </Button>
      </Form>
    );
  return (
    <Dropdown
      label={user.email}
      dismissOnClick={false}
      className="bg-white"
      renderTrigger={() => (
        <img
          className="h-8 w-8 rounded-full cursor-pointer"
          src={user.picture}
          title={user.email}
          alt={user.email}
          referrerPolicy="no-referrer"
        />
      )}
    >
      <Dropdown.Header>
        <span className="block truncate text-sm font-medium font-poppins">
          {user.email}
        </span>
      </Dropdown.Header>
      <hr />
      <Dropdown.Item icon={HiLogout} className="mt-2">
        <Form method="post" action="/logout">
          <button className={isEnglish ? "font-poppins" : "font-monlam"}>
            {translation.logout}
          </button>
        </Form>
      </Dropdown.Item>
    </Dropdown>
  );
}

function JobLink() {
  const { translation, locale } = uselitteraTranlation();
  return (
    <NavLink
      to="/jobs"
      className="text-base"
      prefetch="intent"
      unstable_viewTransition
    >
      {translation.jobs}
    </NavLink>
  );
}

function AboutLink() {
  const { translation, locale } = uselitteraTranlation();
  return (
    <NavLink
      to="/about"
      className="text-base"
      prefetch="intent"
      unstable_viewTransition
    >
      {translation.aboutUs}
    </NavLink>
  );
}

function TeamLink() {
  const { translation, locale } = uselitteraTranlation();
  return (
    <NavLink
      to="#"
      className="text-base capitalize text-gray-300 cursor-default"
      prefetch="intent"
      unstable_viewTransition
    >
      {/* {translation.team} */}
    </NavLink>
  );
}
