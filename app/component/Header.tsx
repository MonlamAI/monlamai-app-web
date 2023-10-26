import { Form, Link, useLoaderData } from "@remix-run/react";
import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { HiLogout } from "react-icons/hi/index.js";
import { GiHamburgerMenu } from "react-icons/gi/index.js";
import { RxCross1 } from "react-icons/rx/index.js";
function Header() {
  const { user } = useLoaderData();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex flex-col lg:flex-row  mb-10  ">
      <div className="flex p-3 items-center justify-between  w-full  bg-white ">
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
          {showMenu ? <RxCross1 /> : <GiHamburgerMenu />}
        </button>
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
                  className="h-8 w-8 rounded-full cursor-pointer"
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
      </div>

      {/* mobile view */}
      {showMenu && (
        <div
          className="lg:hidden flex justify-between flex-1 items-center  px-5 pb-2 right-0 w-full shadow-sm
"
        >
          <Link to="/about" onClick={() => setShowMenu(false)}>
            ང་ཚོའི་སྐོར།
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
                <button>logout</button>
              </Form>
            </Dropdown.Item>
          </Dropdown>
        </div>
      )}
    </nav>
  );
}

export default Header;
