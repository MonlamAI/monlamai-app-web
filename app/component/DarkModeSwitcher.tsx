import useLocalStorage from "./hooks/useLocaleStorage";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
function DarkModeSwitcher() {
  let [isDarkMode, setIsDarkMode] = useLocalStorage("Darktheme", false);

  function handleClick() {
    if (
      !isDarkMode ||
      (!("Darktheme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsDarkMode(!isDarkMode);
  }
  return (
    <div
      onClick={handleClick}
      className="flex flex-1 gap-3 items-center  hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
    >
      {isDarkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
      Appearance
    </div>
  );
}

export default DarkModeSwitcher;
