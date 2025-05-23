import { Form, NavLink, useRouteLoaderData, Link,useFetcher } from "@remix-run/react";
import { Button, CustomFlowbiteTheme, Dropdown } from "flowbite-react";
import { useState } from "react";
import { HiBriefcase, HiLogout } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import uselitteraTranlation from "../hooks/useLitteraTranslation";
import TranslationSwitcher from "../TranslationSwitcher";
import ThemeSwitcher from "../ThemeSwitcher.client";
import { FaQuoteRight, FaUsers } from "react-icons/fa";
import { ICON_SIZE } from "~/helper/const";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { TbApi } from "react-icons/tb";
import { ClientOnly } from "remix-utils/client-only";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { isEnglish, translation } = uselitteraTranlation();
  const data = useRouteLoaderData("root");
  return (
    <nav
      className={`flex p-4 md:p-[24px] border-b border-b-neutral-200 bg-neutral-100 dark:bg-[--card-bg] dark:border-b-[--card-border] justify-center  flex-col lg:flex-row  ${
        isEnglish ? "font-poppins" : "font-monlam"
      } `}
    >
      <div className="flex items-center justify-between  max-w-[1280px] w-full">
        <NavLink
          className="flex items-center gap-2"
          unstable_viewTransition
          to="/"
        >
          <img
            src="/assets/logo.png"
            width="40px"
            alt="Monalm AI"
            className="relative -top-1"
          />
          <span className="text-xl md:text-2xl ">{translation.monlamAI}</span>
        </NavLink>
        <button
          className={`block lg:hidden right-2 z-50 pr-2 ${
            showMenu ? "fixed" : ""
          } `}
          onClick={() => setShowMenu((p) => !p)}
        >
          {showMenu ? <RxCross1 /> : <GiHamburgerMenu />}
        </button>
        <div className="hidden lg:flex gap-2 ml-8 flex-1 justify-between ">
          <div className="flex items-center gap-8 text-sm ml-4">
            <AboutLink />
            <TeamLink />
          </div>
          <div className="flex items-center gap-4 mr-7">
            <ClientOnly fallback={null}>
              {()=>
            <ThemeSwitcher />
              }
            </ClientOnly>
            <TranslationSwitcher />
            <Menu />
          </div>
        </div>
        {/* mobile view */}
        <div
          className={`${
            showMenu ? "block" : "hidden"
          } h-full fixed bg-neutral-100 top-0 left-0 right-0 w-full dark:bg-[--card-bg] shadow-lg z-40`}
        >
          <NavLink
            className="flex items-center gap-2 p-4"
            unstable_viewTransition
            to="/"
          >
            <img
              src="/assets/logo.png"
              width="40px"
              alt="Monalm AI"
              className="relative -top-1"
            />
            <span className="text-xl md:text-2xl ">{translation.monlamAI}</span>
          </NavLink>
          <Devider />
          <div className="flex flex-col gap-4 text-light_text-secondary dark:text-dark_text-secondary">
            <div onClick={() => setShowMenu((p) => !p)} className="px-3 pt-3 ">
              <AboutLink />
            </div>
            <div onClick={() => setShowMenu((p) => !p)} className="px-3 pt-3 ">
              <TeamLink />
            </div>
            <Devider />
            <div onClick={() => setShowMenu((p) => !p)} className="px-3">
            <ClientOnly fallback={null}>
              {()=>
            <ThemeSwitcher />
              }
            </ClientOnly>
            </div>
            <Devider />
            <div className="px-3">
              <TranslationSwitcher />
            </div>
            <Devider />
            <Menu />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;

function Devider() {
  return (
    <div className="Separator self-stretch h-px bg-stone-300 dark:bg-[--card-border]" />
  );
}

function Menu() {
  const { user } = useRouteLoaderData("root");
  const { translation, locale } = uselitteraTranlation();
  const isEnglish = locale === "en_US";
  const isTibetan = locale === "bo_TI";

  if (!user)
    return (
      <Form method="post" action="/auth0">
        <Button
          type="submit"
          className={`dark:bg-primary-500 dark:enabled:hover:bg-primary-600 bg-secondary-500 hover:enabled:bg-secondary-600 text-white dark:text-[--card-border] w-full p-1 pb-[1px] ${
            isEnglish ? "font-poppins " : "font-monlam"
          }`}
          pill
          size={"xs"}
        >
          {translation.login}
        </Button>
      </Form>
    );
  const userEmail = user.emails[0].value;
  const userPhoto = user.emails[0].value.includes('appleid')?`https://eu.ui-avatars.com/api/?name=${userEmail}&size=250`:user.photos[0].value;
  const userName = user.name?.givenName?.split(" ")[0] || user?.displayName;
  const fetcher=useFetcher();

  const logout = () => {
  fetcher.submit({},{method:"post",action:"/logout"})  
  }
  return (
    <>
      <Dropdown
        label={user.email}
        dismissOnClick={false}
        className="bg-white dark:bg-[--card-bg] hidden md:block shadow-lg"
        renderTrigger={() => (
          <img
            className="h-6 w-6 rounded-full hidden md:block  cursor-pointer"
            src={userPhoto}
            title={userEmail}
            alt={userEmail}
          />
        )}
      >
        <Dropdown.Header>
          <span className="block truncate text-sm font-medium font-poppins">
            {userEmail}
          </span>
        </Dropdown.Header>
        <Dropdown.Item icon={HiLogout} className="mt-2" onClick={logout}>
            <div className={isEnglish ? "font-poppins" : "font-monlam"}>
              {translation.logout}
            </div>
        </Dropdown.Item>
        <Dropdown.Item icon={TbApi} className="mt-2">
          <a
            href="https://status.monlam.ai"
            className={isEnglish ? "font-poppins" : "font-monlam"}
            target="_blank"
          >
            {translation.status}
          </a>
        </Dropdown.Item>
      </Dropdown>
      <Form method="post" action="/logout" className="md:hidden">
        <button
          className={`flex gap-2 items-center px-3 text-secondary-500 dark:text-primary-500 ${
            isEnglish ? "font-poppins" : "font-monlam"
          }`}
        >
          <FaArrowRightFromBracket /> {translation.logout}
        </button>
      </Form>
    </>
  );
}

function JobLink() {
  const { translation, locale } = uselitteraTranlation();
  return (
    <NavLink
      to="/jobs"
      className="text-base flex items-center gap-2"
      unstable_viewTransition
    >
      <HiBriefcase size={ICON_SIZE} className="md:hidden" /> {translation.jobs}
    </NavLink>
  );
}

function AboutLink() {
  const { translation, locale } = uselitteraTranlation();
  return (
    <NavLink
      to="/about"
      className="text-base flex gap-2 items-center"
      unstable_viewTransition
    >
      <FaQuoteRight size={ICON_SIZE} className="md:hidden" />{" "}
      {translation.aboutUs}
    </NavLink>
  );
}

function TeamLink() {
  const { translation, locale } = uselitteraTranlation();
  return (
    <NavLink
      to="/team"
      className="text-base flex gap-2 items-center"
      unstable_viewTransition
    >
      <FaUsers size={ICON_SIZE} className="md:hidden" /> {translation.team}
    </NavLink>
  );
}
