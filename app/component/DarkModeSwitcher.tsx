import uselitteraTranlation from "./hooks/useLitteraTranslation";
import useLocalStorage from "./hooks/useLocaleStorage";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
function DarkModeSwitcher() {
  let [isDarkMode, setIsDarkMode] = useLocalStorage("Darktheme", false);
  const { translation } = uselitteraTranlation();

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
      className="flex flex-1 gap-3 items-center   cursor-pointer"
    >
      {isDarkMode ? (
        <>
          <MdOutlineLightMode />
          {translation.lightmode}
        </>
      ) : (
        <>
          <MdDarkMode />
          {translation.darkmode}
        </>
      )}
    </div>
  );
}

export default DarkModeSwitcher;
