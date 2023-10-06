import { Link } from "@remix-run/react";
import React, { useEffect, useState } from "react";
function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Add a scroll event listener to monitor scroll position
    const handleScroll = (e) => {
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
      className={`flex h-[60px] p-2 items-center justify-between fixed top-0 w-full z-20 ${
        scrolled ? "bg-blue-950" : "bg-transparent"
      }`}
    >
      <a href="index.html" className="flex items-center gap-2 text-[1.25rem]">
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
        <div className="lg:hidden  absolute top-[60px] bg-blue-950 p-5 right-0">
          <ul className="flex flex-col gap-8">
            <li>
              <a href="/about">ང་ཚོའི་སྐོར།</a>
            </li>
            <li>
              <a href="#skills">མིས་བཟོས་རིག་ནུས།</a>
            </li>
            <li>
              <a href="#contact">འབྲེལ་མཐུད།</a>
            </li>
          </ul>
          <div>
            <ul className="flex gap-2 mt-6">
              <li>
                <a href="#portfolio">
                  <i className="fas fa-globe mr-2"></i>སྐད་ཡིག
                </a>
              </li>
              <li>
                <a href="#portfolio">
                  <i className="fas fa-user mr-2"></i>ནང་འཛུལ།
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="hidden lg:flex gap-2 ml-8 flex-1 justify-between">
        <ul className="flex gap-8">
          <li>
            <a href="#about">ང་ཚོའི་སྐོར།</a>
          </li>
          <li>
            <a href="#skills">མིས་བཟོས་རིག་ནུས།</a>
          </li>

          <li>
            <a href="#contact">འབྲེལ་མཐུད།</a>
          </li>
        </ul>
        <div>
          <ul className="flex gap-4 mr-7">
            <li>
              <a href="#portfolio">
                <i className="fas fa-globe mr-2"></i>སྐད་ཡིག
              </a>
            </li>
            <li>
              <a href="#portfolio">
                <i className="fas fa-user mr-2"></i>ནང་འཛུལ།
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
