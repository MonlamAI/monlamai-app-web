import { Link, useLoaderData } from "@remix-run/react";
import React, { Fragment, useEffect, useState } from "react";
import Login from "./Login";
import { Menu, Transition } from "@headlessui/react";

function Header() {
  const { user } = useLoaderData();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Add a scroll event listener to monitor scroll position
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex h-[60px] p-3 items-center justify-between fixed top-0 w-full z-20 ${
        scrolled ? "bg-blue-950" : "bg-transparent"
      }`}
    >
      <a href="/" className="flex items-center gap-2 text-[1.25rem]">
        <img
          src="/assets/logo.png"
          width="40px"
          alt="Monalm AI"
          className="relative -top-1"
        />{" "}
        སྨོན་ལམ་རིག་ནུས།
      </a>
      <button
        className="block lg:hidden"
        onClick={() => setShowMenu((p) => !p)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-5 h-5 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* mobile view */}
      {showMenu && (
        <div
          className="lg:hidden  absolute top-[60px] bg-blue-950 p-5 right-0 w-full
"
        >
          <ul className="flex flex-col gap-6">
            <li>
              <Link to="/about">ང་ཚོའི་སྐོར།</Link>
            </li>
            <li>
              <a href="#skills">མིས་བཟོས་རིག་ནུས།</a>
            </li>
            <li>
              <a href="#contact">འབྲེལ་མཐུད།</a>
            </li>
          </ul>
          <div>
            <ul className="flex flex-col gap-6 mt-6">
              <li>
                <a href="#portfolio">
                  <i className="fas fa-globe mr-2"></i>སྐད་ཡིག
                </a>
              </li>
              <li>
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user?.picture}
                          title={user?.email}
                          alt={user?.email}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {() => (
                            <div className="block px-4 py-2 text-sm text-gray-700">
                              {user.name}
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {() => (
                            <Link
                              to={"/logout"}
                              className="block px-4 py-2 text-sm text-gray-700"
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Login />
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="hidden lg:flex gap-2 ml-8 flex-1 justify-between">
        <ul className="flex items-center gap-8">
          <li>
            <Link to="/about">ང་ཚོའི་སྐོར།</Link>
          </li>
          <li>
            <a href="#skills">མིས་བཟོས་རིག་ནུས།</a>
          </li>

          <li>
            <a href="#contact">འབྲེལ་མཐུད།</a>
          </li>
        </ul>
        <div>
          <ul className="flex items-center gap-4 mr-7">
            <li>
              <a href="#portfolio">
                <i className="fas fa-globe mr-2"></i>སྐད་ཡིག
              </a>
            </li>
            <li>
              {user ? (
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user?.picture}
                        title={user?.email}
                        alt={user?.email}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {() => (
                          <div className="block px-4 py-2 text-sm text-gray-700">
                            {user.name}
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {() => (
                          <Link
                            to={"/logout"}
                            className="block px-4 py-2 text-sm text-gray-700"
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <Login />
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
