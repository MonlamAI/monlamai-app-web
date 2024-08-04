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
        {!isTibetan ? (
          <p className="font-poppins prose mt-2 text-center">
            The machine translation capability provided in{" "}
            <span className="font-monlam">ཡིག་སྒྱུར་རིག་ནུས།</span> was
            developed by Sebastian Nehrdich, under the guidance of Prof. Kurt
            Keutzer, at the Berkeley AI Research Lab (BAIR) at the University of
            California, Berkeley. As part of the MITRA project, open source
            Large Language Models were trained on extensive data provided by
            Monlam.ai.
          </p>
        ) : (
          <p className="font-monlam mt-2 text-center leading-loose">
            ཡིག་སྒྱུར་རིག་ནུས་ནང་མཁོ་སྤྲོད་བྱས་པའི་འཕྲུལ་ཆས་ཡིག་སྒྱུར་གྱི་ནུས་པ་དེ་ནི་ཀེ་ལི་ཕོར་ནི་ཡ་གཙུག་ལག་སློབ་ཆེན་གྱི་བྷར་ཀི་ལེ་རྫས་འགྱུར་ཞིབ་འཇུག་ཁང་(BAIR)
            དུ་སློབ་དཔོན་ཆེན་མོ་ཀརྚ་ཀོཊ་ཛེར་གྱི་ལམ་སྟོན་འོག་སེ་བྷ་སི་ཊིན་ནེ་རི་ཌི་ཆི་ཡིས་གསར་གཏོད་བྱས་པ་ཞིག་རེད།
            མི་ཏྲ་ལས་འཆར་གྱི་ཆ་ཤས་སུ་སྒོ་མོ་ལྔ་མཛོད་ཀྱིས་མཁོ་སྤྲོད་བྱས་པའི་རྒྱ་ཆེ་བའི་གཞི་གྲངས་ཐོག་གཞི་རྒྱ་ཆེ་བའི་སྐད་བརྡའི་དཔེ་དབྱིབས་རྣམས་སྦྱོང་བརྡར་བྱས་ཡོད།
          </p>
        )}
      </div>
    </div>
  );
}

export default Sponsors;
