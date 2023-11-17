import { lamas } from "~/helper/lama";

function Lamas() {
  return (
    <div>
      <h2 className="lg:text-3xl text-xl font-bold font-monlam my-10 lg:my-20 flex justify-center">
        བླ་ཆེན་རྣམ་པས་བྱིན་རླབས་དང་ལམ་སྟོན།
      </h2>
      <div className="flex gap-10 mt-10 flex-col md:flex-row ">
        <img
          src="/assets/lamas/dalai_lama.png"
          alt="dalai_lama"
          className=" object-contain flex h-full my-auto hover:scale-110 transition-all duration-700 md:w-[40%] justify-center rounded-lg"
        />
        <div className="flex flex-wrap gap-6 justify-center">
          {lamas.map((lama) => {
            return (
              <div
                className="h-24 w-24 md:h-28 md:w-28 my-5 md:my-4"
                key={lama.name}
              >
                <img
                  src={lama.image}
                  alt={lama.name}
                  className="rounded-full h-24 w-24 object-cover shadow-md p-1 hover:scale-105 transition-all duration-500 "
                />
                <p className="text-center text-[10px] py-2  font-Elsie">
                  {lama.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Lamas;
