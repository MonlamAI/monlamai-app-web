import React from "react";

function Footer() {
  return (
    <footer className="rounded-lg shadow m-4 ">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-200 sm:text-center dark:text-gray-200">
          <a href="#" className="hover:underline">
            © Monlam IT 2023
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-200 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              <i className="fab fa-facebook-square"></i>
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              <i className="fab fa-discord"></i>
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
