import { Form, Link, useLoaderData } from "@remix-run/react";
import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { HiLogout } from "react-icons/hi/index.js";

function Header() {
  const { user } = useLoaderData();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex h-[60px] p-3 items-center justify-between  w-full z-20 bg-transparent ">
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
          className="lg:hidden absolute top-[60px] p-5 right-0 w-full bg-white
"
        >
          <div className="flex justify-between items-center">
            <Link to="/about">ང་ཚོའི་སྐོར།</Link>
            <Dropdown
              label={user?.email}
              dismissOnClick={false}
              renderTrigger={() => (
                <img
                  className="h-8 w-8 rounded-full"
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
                  <button>logout</button>
                </Form>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      )}
      <div className="hidden lg:flex gap-2 ml-8 flex-1 justify-between bg-white">
        <ul className="flex items-center gap-8">
          <li>
            <Link to="/about">ང་ཚོའི་སྐོར།</Link>
          </li>
        </ul>
        <div className="flex items-center gap-4 mr-7">
          <Dropdown
            label={user.email}
            dismissOnClick={false}
            className="bg-white"
            renderTrigger={() => (
              <img
                className="h-8 w-8 rounded-full"
                src={user?.picture}
                title={user?.email}
                alt={user?.email}
              />
            )}
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.username}</span>
              <span className="block truncate text-xs font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item icon={HiLogout}>
              <Form method="post" action="/logout">
                <button>logout</button>
              </Form>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}

export default Header;
