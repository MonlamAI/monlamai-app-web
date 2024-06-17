import React, { useState, useRef, useEffect } from "react";
import { Card } from "flowbite-react";
import { Blurhash } from "react-blurhash";
import uselitteraTranlation from "../../../component/hooks/useLitteraTranslation";
import { lamas } from "~/routes/about/data/lama";
import { useRouteLoaderData } from "@remix-run/react";

function Lamas() {
  const { translation } = uselitteraTranlation();
  const { show_about_lama } = useRouteLoaderData("root");
  if (!show_about_lama) return null;
  return (
    <div className="container mx-auto">
      <h2 className="lg:text-3xl text-xl font-bold my-10 lg:my-20 flex justify-center">
        {translation.lamas}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div className="md:col-span-2 md:row-span-1">
          <img
            src="/assets/lamas/dalai_lama.png"
            loading="lazy"
            alt="dalai_lama"
            className="object-contain h-full w-full hover:scale-110 transition-all duration-700 rounded-lg"
          />
        </div>
        {lamas.map((lama) => (
          <EachLama lama={lama} key={lama.name} />
        ))}
      </div>
    </div>
  );
}

function EachLama({ lama }) {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const { translation, isTibetan } = uselitteraTranlation();

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
    };
    img.src = lama.image;
  }, [lama.image]);

  return (
    <div className="flex rounded-lg border border-gray-200 md:h-[25vh] bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col relative w-full md:max-w-xs  max-h-[250px] p-2">
      <div className="flex flex-col justify-start items-center gap-3 ">
        <div
          style={{ display: loaded ? "none" : "" }}
          className="overflow-hidden rounded-full h-24 w-24 object-cover shadow-md p-1 hover:scale-105 transition-all duration-500"
        >
          <Blurhash
            hash={lama.blurhash}
            width={96}
            height={96}
            resolutionX={32}
            resolutionY={32}
            punch={1}
            style={{ borderRadius: "50%", overflow: "hidden" }}
          />
        </div>
        <img
          ref={imageRef}
          src={lama.image}
          style={{ opacity: !loaded ? 0 : 1, height: !loaded ? 0 : "" }}
          onLoad={() => setLoaded(true)}
          className="rounded-full h-24 w-24 object-cover  shadow-md p-1 hover:scale-105 transition-all duration-500"
        />
        <p
          className={`text-center text-sm py-2 font-semibold ${
            isTibetan ? "font-monlam leading-loose" : "font-poppins"
          }`}
        >
          {isTibetan ? lama.tibetan_name : lama.name}
        </p>
      </div>
    </div>
  );
}

export default Lamas;
