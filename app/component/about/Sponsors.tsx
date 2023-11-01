import React from "react";
import { sponsors as sponsor_list } from "~/helper/sponsors";
function Sponsors() {
  return (
    <div className="relative top-10">
      <h2 className="lg:text-3xl text-xl font-bold font-monlam mt-10 md:my-10 flex justify-center">
        མཉམ་འབྲེལ་དང་རོགས་རམ།
      </h2>

      <div className="flex flex-wrap gap-2 justify-center">
        {sponsor_list.map((sponsor) => {
          return (
            <div className="my-4 font-Elsie" key={sponsor}>
              <img src={sponsor} className="h-16 shadow-md object-contain " />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sponsors;
