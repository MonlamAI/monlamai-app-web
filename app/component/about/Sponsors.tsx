import Marquee, { Motion, randomIntFromInterval } from "react-marquee-slider";
import { sponsors as sponsor_list } from "~/helper/sponsors";
function Sponsors() {
  return (
    <div className="relative top-10 ">
      <h2 className="lg:text-3xl text-xl font-bold font-monlam mt-10 md:my-10 flex justify-center">
        མཉམ་འབྲེལ་དང་རོགས་རམ།
      </h2>

      <div className="flex gap-3 justify-between flex-wrap">
        {sponsor_list.map((sponsor, id) => {
          return (
            <div className="my-4 font-Elsie " key={sponsor}>
              <img
                src={sponsor}
                className="w-[7rem] object-contain hover:scale-110 transition-all duration-700"
                style={{ aspectRatio: "3/2", mixBlendMode: "darken" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sponsors;
