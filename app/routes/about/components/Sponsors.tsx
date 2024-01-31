import { sponsors as sponsor_list } from "~/routes/about/data/sponsors";
import uselitteraTranlation from "../../../component/hooks/useLitteraTranslation";
function Sponsors() {
  let { locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";
  return (
    <div className="relative top-10 ">
      <h2 className="lg:text-3xl text-xl font-bold  mt-10 md:my-10 flex justify-center">
        {isEnglish ? "Collaborators and Partners" : "མཉམ་འབྲེལ་དང་རོགས་རམ།"}
      </h2>

      <div className="flex gap-4 justify-center flex-wrap ">
        {sponsor_list.map((sponsor, id) => {
          return (
            <div className="my-4 " key={sponsor}>
              <img
                loading="lazy"
                src={sponsor}
                className="w-[9rem] object-contain hover:scale-110 transition-all duration-700"
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
