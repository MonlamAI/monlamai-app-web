import React from "react";
import useLocalStorage from "./hooks/useLocaleStorage";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

function DarkModeSwitcher() {
  let [isDarkMode, setIsDarkMode] = useLocalStorage("Darktheme", false);
  function handleClick() {
    setIsDarkMode(!isDarkMode);
  }
  return (
    <div
      onClick={handleClick}
      className="flex flex-1 gap-2 p-1 text-center items-center  hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
    >
      <Flowbite>
        <DarkThemeToggle className="w-full p-0 justify-center text-center flex "></DarkThemeToggle>
      </Flowbite>
    </div>
  );
}

export default DarkModeSwitcher;
