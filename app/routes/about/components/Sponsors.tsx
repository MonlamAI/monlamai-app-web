import { sponsors as sponsor_list } from "~/routes/about/data/sponsors";
import uselitteraTranlation from "../../../component/hooks/useLitteraTranslation";
function Sponsors() {
  let { translation } = uselitteraTranlation();
  return (
    <div className="relative top-10 ">
      <h2 className="lg:text-3xl text-xl font-bold  mt-10 md:my-10 flex justify-center">
        {translation.partners}
      </h2>
      <div className="flex gap-4 justify-center flex-wrap ">
        {sponsor_list.map((sponsor, id) => {
          return (
            <div
              className="my-4  dark:bg-gray-200 dark:rounded-lg"
              key={sponsor}
            >
              <img
                loading="lazy"
                src={sponsor}
                className="w-[9rem] p-3 h-fit object-contain hover:scale-110 transition-all duration-700"
                style={{ mixBlendMode: "darken" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sponsors;
