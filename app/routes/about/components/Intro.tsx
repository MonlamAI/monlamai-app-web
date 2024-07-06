import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";

export function Intro() {
  let { locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";

  return (
    <div className="flex flex-col mb-20 justify-center items-center gap-10 lg:flex-row">
      <div
        className={`leading-8 text-md ${
          isEnglish ? "font-poppins" : "font-monlam leading-loose"
        }`}
      >
        <h4 className="text-2xl mb-4 text-center">
          {isEnglish ? "Introduction" : "ངོ་སྤྲོད།"}
        </h4>
        <p>
          {!isEnglish
            ? `དེང་སྐབས་འཛམ་གླིང་ཁྱོན་ཡོངས་སུ་ཚན་རྩལ་འཕྲུལ་རིག་ཆེས་ཆེར་དར་ཞིང་། ལྷག་པར་ཉེ་བའི་ལོ་འདི་འགར་ཀུན་གྱིས་ཚ་ཚ་འུར་འུར་དུ་གླེང་བཞིན་པའི་མིས་བཟོས་རིག་ནུས་(Artificial intelligence)ཞེས་པ་བརྡ་འཕྲིན་འཕྲུལ་རིག་ཁྲོད་ཚད་གཞི་ཆེས་མཐོ་ཤོས་སུ་གྱུར་ཡོད་ལ། འབྱུང་འགྱུར་འཕྲུལ་རིག་འདི་བརྒྱུད་ནས་ད་ལྟའི་འགྲོ་བ་མི་ཐུན་མོང་གི་ལོངས་སྤྱོད་དུ་གྱུར་པའི་ཤེས་ཡོན་མཐའ་དག་སྔར་ལས་ནུས་པ་ལྡན་པ་དང་། ལས་ཆོད་མཐོར་འདེགས་གཏོང་ཐུབ་པར་མ་ཟད། ང་ཚོ་བོད་མི་རིགས་ལྟ་བུའི་ཤེས་རིག་རྒྱ་ཆེ་ཡང་སྤྱོད་མཁན་གྲངས་ཉུང་བའི་རིགས་ལ་དམིགས་བསལ་ཕན་ཐོགས་རྒྱ་ཆེར་འབྱུང་ངེས།`
            : ` Welcome to a new era of innovation and progress! In today's world,
          technology has reached remarkable heights, and Artificial
          Intelligence (AI) stands at the forefront of this technological
          revolution. AI's advancement in information technology is reshaping
          how we access and utilize knowledge. The future promises even more
          sophisticated technological advancements, enhancing the efficiency
          and effectiveness of information for communities worldwide. This
          includes groups like the Tibetan community, whose rich knowledge and
          perspective are invaluable in driving positive global change.
          `}
        </p>
        <p>
          {" "}
          {!isEnglish
            ? `
       ལས་གཞི་འདི་རིགས་སྤྱིར་བཏང་གི་ལས་གཞི་ཆུང་ཆུང་ཞིག་མིན་པར་གློག་ཀླད་ཆེད་ལས་པ་དང་། ལས་མི་བརྒྱ་ཕྲག་མང་པོ་མཉམ་རུབ་མ་བྱས་ན་ཧ་ཅང་འགྲུབ་དཀའ་བ་ཞིག་ཡིན་པར་བརྟེན། འདི་ག་སྨོན་ལམ་བོད་ཀྱི་བརྡ་འཕྲིན་ཞིབ་འཇུག་ཁང་གིས་སྤྱི་སྒེར་གྱི་ཚོགས་སྡེ་ཁག་མང་པོ་དང་མཉམ་འབྲེལ་གྱིས་ད་ལྟ་རིག་ནུས་ཀྱི་དཔེ་མཚོན་ནམ་སྦྱོང་བརྡར་རྒྱུ་ཆ་སྟོང་ཕྲག་མང་པོ་མཁོ་སྒྲུབ་བྱེད་ཐུབ་ཡོད།
`
            : `
          
          Our projects are ambitious and complex, demanding the collaboration
          of numerous skilled computer engineers and dedicated staff. At the
          Monlam IT Research Center, we have successfully partnered with a
          wide range of organizations, both public and private. These
          collaborations have enabled us to compile thousands of cognitive
          samples and training materials, crucial for advancing AI research
          and applications. Join us as we journey towards a smarter, more
          connected world.
          `}
        </p>
      </div>
    </div>
  );
}
