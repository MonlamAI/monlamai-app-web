import React from "react";
import { sponsors as sponsor_list } from "~/helper/sponsors";
function Sponsors() {
  return (
    <div className="relative top-10">
      <h2 className="lg:text-3xl text-xl font-bold font-monlam my-10 md:my-20 flex justify-center">
        མཉམ་འབྲེལ་དང་རོགས་རམ།
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {sponsor_list.map((sponsor) => {
          return (
            <div
              className="h-24  md:h-28  my-10 md:my-4 font-Elsie"
              key={sponsor}
            >
              <img src={sponsor} className="h-24 object-cover shadow-md p-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sponsors;
