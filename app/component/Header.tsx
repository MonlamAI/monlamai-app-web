import { Form, Link, NavLink, useLoaderData } from "@remix-run/react";
import { DarkThemeToggle, Dropdown, Flowbite } from "flowbite-react";
import { useState } from "react";
import { HiLogout } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import TranslationSwitcher from "./TranslationSwitcher";
import uselitteraTranlation from "./hooks/useLitteraTranslation";
function Header() {
  const { user } = useLoaderData();
  const [showMenu, setShowMenu] = useState(false);
  const { translation, locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";

  return (
    <nav
      className={`flex flex-col lg:flex-row  `}
      style={{
        fontFamily: isEnglish ? "elsie" : "monlam",
        lineHeight: "normal",
      }}
    >
      <div className="flex p-3 items-center justify-between  w-full bg-white dark:bg-slate-700 dark:text-gray-200 ">
        <NavLink
          className={({ isActive, isPending }) =>
            `flex items-center gap-2 text-[1.25rem] ${
              isPending && "text-gray-300"
            }`
          }
          prefetch="intent"
          to="/"
        >
          <img
            src="/assets/logo.png"
            width="40px"
            alt="Monalm AI"
            className="relative -top-1"
          />{" "}
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
            <NavLink
              to="/about"
              className={({ isActive, isPending }) =>
                isActive ? "text-gray-300" : ""
              }
              prefetch="intent"
            >
              {translation.aboutUs}
            </NavLink>
          </div>
          <div className="flex items-center gap-4 mr-7">
            <TranslationSwitcher />
            <Dropdown
              label={user.email}
              dismissOnClick={false}
              className="bg-white"
              renderTrigger={() => (
                <img
                  className="h-8 w-8 rounded-full cursor-pointer"
                  src={user?.picture}
                  title={user?.email}
                  alt={user?.email}
                />
              )}
            >
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{user.username}</span>
                    <span className="block truncate text-xs font-medium">
                      {user.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item icon={HiLogout}>
                    <Form method="post" action="/logout">
                      <button>{translation.logout}</button>
                    </Form>
                  </Dropdown.Item>
                </motion.div>
              </AnimatePresence>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* mobile view */}
      {showMenu && (
        <div
          className="lg:hidden flex justify-between flex-1 items-center  px-5 pb-2 right-0 w-full shadow-sm
"
        >
          <Link to="/about" onClick={() => setShowMenu(false)}>
            {translation.aboutUs}
          </Link>
          <Dropdown
            label={user?.email}
            dismissOnClick={false}
            renderTrigger={() => (
              <img
                className="h-8 w-8 rounded-full cursor-pointer"
                src={user?.picture}
                title={user?.email}
                alt={user?.email}
              />
            )}
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.username}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Form method="post" action="/logout">
                <button>{translation.logout}</button>
              </Form>
            </Dropdown.Item>
          </Dropdown>
        </div>
      )}
    </nav>
  );
}

export default Header;
