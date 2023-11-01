import { useLocation } from "@remix-run/react";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";

function Footer() {
  let location = useLocation();
  let isAboutPage = location.pathname.includes("about");
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
      icon: <AiFillInstagram />,
      color: "#e4405f",
    },
    {
      name: "twitter",
      link: "https://twitter.com/Monlam_AI",
      icon: <AiFillTwitterCircle />,
      color: "#55acee",
    },
  ];

  return (
    <div className="w-full p-4">
      <footer
        className={`p-4 ${!isAboutPage ? "lg:fixed" : ""} bottom-0 w-full`}
      >
        <div className=" mx-auto max-w-screen-xl p-4 flex flex-col md:flex-row items-center md:justify-between">
          <div className="text-sm text-gray-400 sm:text-center">
            <a href="#" className="hover:underline">
              © Monlam IT 2023
            </a>
            . All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-2">
            {logos.map((logo) => {
              return (
                <a
                  key={logo.name}
                  href={logo.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`mr-2 hover:underline md:mr-3 transition-all duration-500 text-xl`}
                  style={{ color: logo.color }}
                >
                  {logo.icon}
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
