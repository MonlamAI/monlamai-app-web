import React, { useState, useRef, useEffect } from "react";
import { Card } from "flowbite-react";
import { Blurhash } from "react-blurhash";
import uselitteraTranlation from "../../../component/hooks/useLitteraTranslation";
import { lamas } from "~/routes/about/data/lama";
import { useRouteLoaderData } from "@remix-run/react";

function Lamas() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
    };
    img.src = "/assets/lamas/dalai_lama.png";
  }, []);

  const { translation } = uselitteraTranlation();

  return (
    <div className="container mx-auto">
      <h2 className="lg:text-3xl text-xl font-bold my-10 lg:my-20 flex justify-center">
        {translation.lamas}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div
          className={`${loaded ? "hidden" : ""} md:col-span-2 md:row-span-1`}
        >
          <Blurhash
            hash={"LMO_+Yb:%%x9~Ts~NZtRX0aeauM{"}
            width={196}
            height={66}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
        <div className="md:col-span-2 md:row-span-1">
          <img
            src="/assets/lamas/dalai_lama.png"
            loading="lazy"
            alt="dalai_lama"
            className="object-cover flex rounded-lg aspect-auto h-64 w-full" // Set height and ensure it fits the container
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
    <div className="flex rounded-lg border border-gray-200  bg-white shadow-md dark:bg-[--card-bg] dark:border-[--card-border] flex-col relative w-full md:max-w-xs  max-h-[250px] p-2">
      <div className="flex flex-1 justify-start flex-col  items-center gap-3 ">
        <div
          className={`${
            loaded ? "hidden" : ""
          } overflow-hidden rounded-full h-fit w-24 object-cover shadow-md p-1 hover:scale-105 transition-all duration-500`}
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
          className={`text-center text-sm py-2 ${
            isTibetan
              ? "font-monlam leading-loose"
              : "font-poppins font-semibold"
          }`}
        >
          {isTibetan ? lama.tibetan_name : lama.name}
        </p>
      </div>
    </div>
  );
}

export default Lamas;
