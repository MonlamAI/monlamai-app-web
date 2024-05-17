import { useLitteraMethods } from "@assembless/react-littera";
import useLocalStorage from "./hooks/useLocaleStorage";
import uselitteraTranlation from "./hooks/useLitteraTranslation";
import { IoMdGlobe } from "react-icons/io";

function TranslationSwitcher() {
  const [current, setCurrent] = useLocalStorage("language", "bo_TI");
  const methods = useLitteraMethods();
  const { isEnglish, isTibetan } = uselitteraTranlation();

  const SwitchLanguage = () => {
    const isTibetan = current === "bo_TI";
    const code = isTibetan ? "en_US" : "bo_TI";
    setCurrent(code);
    methods.setLocale(code);
  };

  return (
    <div
      onClick={SwitchLanguage}
      className="cursor-pointer flex gap-2 items-center mr-2"
    >
      {isEnglish && (
        <span className=" flex gap-2 font-poppins rounded-full ">
          <div className="mt-1">
            <IoMdGlobe />
          </div>
          <div>Tibetan</div>
        </span>
      )}
      {isTibetan && (
        <span className=" flex gap-2 font-monlam rounded-full ">
          <IoMdGlobe />
          <div>དབྱིན་ཡིག་</div>
        </span>
      )}
    </div>
  );
}

export default TranslationSwitcher;
