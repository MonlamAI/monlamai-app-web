import { type LoaderFunction } from "@remix-run/node";
import { useState } from "react";
import PowerUser from "~/component/PowerUser";
import { getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  let user = await getUserSession(request);
  let { AUTH0_DOMAIN, AUTH0_CLIENT_ID, NODE_ENV } = process.env;
  return {
    env: { AUTH0_DOMAIN, AUTH0_CLIENT_ID, NODE_ENV },
    user,
  };
};

const toggleFullScreen = () => {
  const element = document.getElementById("fullscreen");
  console.log("element", element);
  if (!element) {
    return; // Exit if the element doesn't exist
  }
  if (!isFullScreen(element)) {
    enterFullScreen(element);
  } else {
    exitFullScreen();
  }
};

const isFullScreen = (element: HTMLElement) => {
  return document.fullscreenElement === element;
};

const enterFullScreen = (element: HTMLElement) => {
  element.requestFullscreen();
};

const exitFullScreen = () => {
  document.exitFullscreen();
};

function MachineTranslation() {
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("bo");

  const handleFromLang = (e: any) => {
    setFromLang(e.target.value);
  };
  const handleToLang = (e: any) => {
    setToLang(e.target.value);
  };

  return (
    <div>
      <div id="fullscreen">
        <div className="flex flex-col gap-6 py-[100px] m-auto w-[90%] md:w-[80%]">
          <div className="text-right">
            <button onClick={toggleFullScreen}>
              <i className="fas fa-expand-arrows-alt text-[#c2c5c5] text-xl"></i>
            </button>
          </div>
          <section className="w-full">
            <div className="bg-[#f4f0f8] border rounded-xl py-4 md:py-10 text-[#808080]">
              <div className="w-[80%] mx-auto">
                <div className="flex flex-row justify-center items-center rounded-lg border border-[#dddddd] mb-4">
                  <select
                    className="w-[100px] h-10 p-2 rounded-md border bg-[#dddddd]  border-solid m-1"
                    value={fromLang}
                    onChange={handleFromLang}
                  >
                    <option value="en">English</option>
                    <option value="bo">བོད་ཡིག</option>
                    <option value="en">ལེགས་སྦྱར།</option>
                    <option value="sa">པཱ་ལི།</option>
                    <option value="sa">हिन्दी</option>
                    <option value="en">বাংলা</option>
                  </select>
                  <img
                    src="/assets/transfer.png"
                    alt="arrow"
                    className="w-5 mx-5 cursor-pointer"
                  />
                  <select
                    className="w-[100px] h-10 p-2 rounded-md border bg-[#dddddd]  border-solid m-1"
                    value={toLang}
                    onChange={handleToLang}
                  >
                    <option value="bo">བོད་ཡིག</option>
                    <option value="en">English</option>
                    <option value="en">ལེགས་སྦྱར།</option>
                    <option value="sa">པཱ་ལི།</option>
                    <option value="sa">हिन्दी</option>
                  </select>
                </div>
                <div className="flex flex-col justify-center items-center md:flex-row  mb-4">
                  <textarea
                    rows={6}
                    cols={30}
                    className="w-full md:w-1/2 p-2 rounded-md border border-solid m-1 text-[#707070]"
                  ></textarea>
                  <textarea
                    rows={6}
                    cols={30}
                    className="w-full md:w-1/2 p-2 rounded-md border border-solid m-1 text-[#707070]"
                  ></textarea>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <p className="">ཐ་སྙད་གྲངས 0 དང་།</p>
                    <p className=" block sm:flex">
                      ཐ་སྙད་ཚད་གཞིའི་གྲངས། 1500
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <button className="bg-[#dddddd] hover:bg-[#1F4C89] p-2 rounded-md mt-2">
                      <img
                        src="/assets/copy.png"
                        alt="copy"
                        className="w-5 mx-5 cursor-pointer"
                      />
                    </button>
                    <button className="bg-[#dddddd] hover:bg-[#1F4C89] px-4 py-2 rounded-md mt-2">
                      ཡིག་སྒྱུར།
                    </button>
                  </div>
                </div>
              </div>
              <hr className="border-t border-[#dddddd] my-5 " />
              <p className="w-[80%] mx-auto leading-7 text-sm">
                འདི་ནི། དབང་རྩའི་འཕྲུལ་རིག་ཡིག་སྒྱུར་ ({" "}
                <span className="text-[#5285f1]  ">
                  Neural Machine Translation
                </span>
                ) གཞིར་བཟུང་ཐོག་མའི་ཚོད་ལྟའི་རིམ་པ་དང་པོ་ (
                <span className="text-[#5285f1]">Beta Version</span>) ཡིན།
                <br />
                སྐབས་འདིར་
                <span className="text- [#c85b07]">
                  གང་ཟག་གི་མིང་དང་། ས་ཆའི་མིང་། དམའ་རིམ་
                </span>
                <span>དང་</span>
                <span className="text-[#c85b07]">
                  སྤྱིར་བཏང་གི་སྐད་ཆ། ཡིག་གེའི་རྟགས་འདྲ་མིན་
                </span>
                ཁག་ལ་འཐུས་སྒོ་ཚང་བ་ཞིག་མེད་པས་ཐུགས་སྣང་གནང་གལ་ཆེ།
              </p>
            </div>
          </section>
        </div>
      </div>
      <PowerUser />
    </div>
  );
}

export default MachineTranslation;
