import {
  Form,
  NavLink,
  useRouteLoaderData,
  useLoaderData,
  Link,
} from "@remix-run/react";
import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { HiLogout } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import uselitteraTranlation from "../hooks/useLitteraTranslation";
import TranslationSwitcher from "../TranslationSwitcher";
import { IoMdGlobe } from "react-icons/io";
import DarkModeSwitcher from "../DarkModeSwitcher";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { isEnglish, translation } = uselitteraTranlation();
  const data = useRouteLoaderData("root");
  return (
    <nav
      className={`flex flex-col lg:flex-row  ${
        isEnglish ? "font-poppins" : "font-monlam"
      }`}
    >
      <div className="flex p-3 items-center justify-between  w-full bg-white dark:bg-slate-700 dark:text-gray-200 ">
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
          className="block lg:hidden"
          onClick={() => setShowMenu((p) => !p)}
        >
          {showMenu ? <RxCross1 /> : <GiHamburgerMenu />}
        </button>
        <div className="hidden lg:flex gap-2 ml-8 flex-1 justify-between bg-white dark:bg-slate-700 dark:text-gray-200">
          <div className="flex items-center gap-8 text-sm ml-4">
            <AboutLink />
            {data?.isJobEnabled && <JobLink />}
          </div>
          <div className="flex items-center gap-4 mr-7">
            <TranslationSwitcher />
            <Menu />
          </div>
        </div>
      </div>

      {/* mobile view */}
      {showMenu && (
        <div
          className="lg:hidden flex justify-between flex-1 items-center px-5 pb-5 right-0 w-full shadow-sm
"
        >
          <div className="flex flex-col gap-4">
            <AboutLink />
            <JobLink />
            <TranslationSwitcher />
          </div>
          <div className="flex gap-4">
            <Menu />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;

function Menu() {
  const { user } = useRouteLoaderData("root");
  const { translation, locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";
  if (!user) return null;
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
      <Dropdown.Item className="px-3 py-2">
        <DarkModeSwitcher />
      </Dropdown.Item>
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
