import { type LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import Footer from "~/component/Mainpage/Footer";
import Header from "~/component/Mainpage/Header";
import PowerUser from "~/component/Mainpage/PowerUser";
import { getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  let user = await getUserSession(request);
  console.log("MachineTranslation user:", user);
  if (!user) redirect("/");
  return {
    user,
  };
};

function MachineTranslation() {
  const { user } = useLoaderData();

  return (
    <>
      <div className="text-white">
        <Header />
        <div className="h-screen py-[160px] m-auto w-[90%] md:w-[80%]">
          <section className="w-full">
            <div className="bg-[#f4f0f8] border rounded-xl py-4 md:py-10 text-[#808080]">
              <div className="w-[80%] mx-auto">
                <div className="flex flex-row justify-center items-center rounded-lg border border-[#dddddd] mb-4">
                  <select
                    className="w-[100px] h-10 p-2 rounded-md border bg-[#dddddd]  border-solid m-1"
                    value="en"
                    onChange={(e) => {}}
                  >
                    <option value="en">English</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                  </select>
                  <img
                    src="/assets/transfer.png"
                    alt="arrow"
                    className="w-5 mx-5 cursor-pointer"
                  />
                  <select
                    className="w-[100px] h-10 p-2 rounded-md border bg-[#dddddd]  border-solid m-1"
                    value="en"
                    onChange={(e) => {}}
                  >
                    <option value="en">English</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>
                <div className="flex flex-col justify-center items-center md:flex-row  mb-4">
                  <textarea
                    rows={6}
                    cols={30}
                    className=" w-full md:w-1/2 p-2 rounded-md border border-solid m-1 text-[#707070]"
                  ></textarea>
                  <textarea
                    rows={6}
                    cols={30}
                    className="  w-full md:w-1/2 p-2 rounded-md border border-solid m-1 text-[#707070]"
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <p className="">
                    <span className="ml-4">ཐ་སྙད་གྲངས།</span>
                    <span className="ml-4">0</span>
                    <span className="ml-4">དང་། ཐ་སྙད་ཚད་གཞིའི་གྲངས།</span>
                    <span className="ml-4">1500</span>
                  </p>
                  <button className="bg-[#dddddd] hover:bg-[#1F4C89] p-2 rounded-md mt-2">
                    <img
                      src="/assets/copy.png"
                      alt="copy"
                      className="w-5 mx-5 cursor-pointer"
                    />
                  </button>
                </div>
                <div className="text-right ">
                  <button className="bg-[#dddddd] hover:bg-[#1F4C89] px-4 py-2 rounded-md mt-2">
                    ཡིག་སྒྱུར།
                  </button>
                </div>
              </div>
              <hr className="border-t border-[#dddddd] my-5 " />
              <p className="w-[80%] mx-auto leading-7">
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
        <PowerUser />
        <Footer />
      </div>
    </>
  );
}

export default MachineTranslation;
