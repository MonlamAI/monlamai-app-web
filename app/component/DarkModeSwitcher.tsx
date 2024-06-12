import { ICON_SIZE } from "~/helper/const";
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
      className="flex flex-1 gap-2 items-center text-[14px] text-light_text-secondary dark:text-dark_text-secondary  cursor-pointer"
    >
      {isDarkMode ? (
        <>
          <MdOutlineLightMode size={ICON_SIZE} />
          {translation.lightmode}
        </>
      ) : (
        <>
          <MdDarkMode size={ICON_SIZE} />
          {translation.darkmode}
        </>
      )}
    </div>
  );
}

export default DarkModeSwitcher;
