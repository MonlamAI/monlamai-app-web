import { useLocation } from "@remix-run/react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import instasvg from "~/styles/instagram.svg";
import useLocalStorage from "./hooks/useLocaleStorage";
import uselitteraTranlation from "./hooks/useLitteraTranslation";
function Footer() {
  let location = useLocation();
  let [isDarkMode, setIsDarkMode] = useLocalStorage("Darktheme", false);
  let isAboutPage = location.pathname.includes("about");
  const { translation, locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";

  const logos = [
    {
      name: "facebook",
      link: "https://www.facebook.com/profile.php?id=100092133731838",
      icon: <AiFillFacebook />,
      color: "#3b5998",
    },
    {
      name: "instagram",
      link: "https://www.instagram.com/monlam_ai/",
      icon: <img src={instasvg} height={45} width={45} />,
      color: "#e4405f",
    },
    {
      name: "twitter",
      link: "https://twitter.com/Monlam_AI",
      icon: <AiFillTwitterCircle />,
      color: "#55acee",
    },
  ];

  function handleClick() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <div className="w-full p-4">
      <footer
        className={`p-4 ${!isAboutPage ? "lg:fixed" : ""} bottom-0 w-full`}
        style={{
          fontFamily: isEnglish ? "Inter" : "monlam",
          lineHeight: "normal",
        }}
      >
        <div className=" mx-auto max-w-screen-xl p-4 flex flex-col md:flex-row items-center md:justify-between">
          <div className="text-sm text-gray-400 sm:text-center">
            <div className="hover:underline text-[1rem] cursor-default leading-relaxed text-center">
              {isEnglish
                ? "Web © Monlam AI 2023"
                : "བདག་དབང་། © སྨོན་ལམ་བརྡ་འཕྲིན་ཞིབ་འཇུག་ཁང་། ༢༠༢༣"}
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-3 sm:mt-2">
            {logos.map((logo) => {
              return (
                <a
                  key={logo.name}
                  href={logo.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`mr-2 hover:underline md:mr-3 transition-all duration-500 `}
                  style={{ color: logo.color, fontSize: 26 }}
                >
                  {logo.icon}
                </a>
              );
            })}
            <div onClick={handleClick}>
              <Flowbite>
                <DarkThemeToggle />
              </Flowbite>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
