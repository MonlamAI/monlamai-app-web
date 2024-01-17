import { useLitteraMethods } from "@assembless/react-littera";
import useLocalStorage from "./hooks/useLocaleStorage";
import uselitteraTranlation from "./hooks/useLitteraTranslation";

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
    <div onClick={SwitchLanguage} className="cursor-pointer">
      {isEnglish && <span className="font-monlam rounded-full ">བོདཡིག</span>}
      {isTibetan && <span className="font-poppins rounded-full ">English</span>}
    </div>
  );
}

export default TranslationSwitcher;
