import { lamas } from "~/helper/lama";
import { Blurhash } from "react-blurhash";
import { useState, useRef, useEffect } from "react";
import uselitteraTranlation from "../hooks/useLitteraTranslation";
function Lamas() {
  let { locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";
  return (
    <div>
      <h2 className="lg:text-3xl text-xl font-bold font-monlam my-10 lg:my-20 flex justify-center">
        {isEnglish
          ? "Blessings and Guidance of our Gurus"
          : "བླ་ཆེན་རྣམ་པས་བྱིན་རླབས་དང་ལམ་སྟོན།"}
      </h2>
      <div className="flex gap-10 mt-10 flex-col md:flex-row ">
        <img
          src="/assets/lamas/dalai_lama.png"
          loading="lazy"
          alt="dalai_lama"
          className=" object-contain flex h-full my-auto hover:scale-110 transition-all duration-700 md:w-[40%] justify-center rounded-lg"
        />
        <div className="flex flex-wrap gap-6 justify-center">
          {lamas.map((lama) => (
            <EachLama lama={lama} key={lama.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EachLama({ lama }) {
  let [loaded, setLoaded] = useState(false);
  let imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
    };
    img.src = lama.image;
  }, [lama.image]);
  return (
    <div className="h-24 w-24 md:h-28 md:w-28 my-5 md:my-4">
      <div
        style={{ display: loaded ? "none" : "" }}
        className=" overflow-hidden rounded-full h-24 w-24 object-cover shadow-md p-1 hover:scale-105 transition-all duration-500 "
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
        className="  rounded-full h-24 w-24 object-cover shadow-md p-1 hover:scale-105 transition-all duration-500 "
      />
      <p className="text-center text-[10px] py-2  font-Elsie">{lama.name}</p>
    </div>
  );
}

export default Lamas;
