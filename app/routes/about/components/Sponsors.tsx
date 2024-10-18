import { sponsors as sponsor_list } from "~/routes/about/data/sponsors";
import uselitteraTranlation from "../../../component/hooks/useLitteraTranslation";
function Sponsors() {
  let { translation, isTibetan } = uselitteraTranlation();
  return (
    <div className="mb-[30px]">
      <h2 className="lg:text-3xl text-xl font-bold mt-10 md:my-10 flex justify-center">
        {translation.partners}
      </h2>
      <div className="flex gap-4 justify-center flex-wrap">
        {sponsor_list.map((sponsor, id) => {
          return (
            <div className="my-4 bg-primary-50 rounded-lg" key={sponsor}>
              <img
                loading="lazy"
                src={sponsor}
                className="w-[9rem] p-3 object-contain hover:scale-110 transition-all duration-700"
                style={{ mixBlendMode: "darken" }}
                alt="sponsors"
              />
            </div>
          );
        })}
          <p className="font-poppins prose mt-2 text-center">
            The machine translation capability provided in{" "}
            <span className="font-monlam">ཡིག་སྒྱུར་རིག་ནུས།</span> was
            developed by Sebastian Nehrdich, under the guidance of Prof. Kurt
            Keutzer, at the Berkeley AI Research Lab (BAIR) at the University of
            California, Berkeley. As part of the MITRA project, open source
            Large Language Models were trained on extensive data provided by
            Monlam.ai.
          </p>
      </div>
    </div>
  );
}

export default Sponsors;
