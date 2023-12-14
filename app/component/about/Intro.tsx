export function TibetanIntro() {
  return (
    <div className=" flex flex-col  mb-20 justify-center items-center gap-10 px-4 lg:flex-row">
      <img
        src="/assets/buddha.png"
        alt="monlam"
        className="w-[80%] md:w-[60%] lg:w-[40%] border-[#dddcdc] rounded-lg shadow-sm hover:scale-105 transition-all duration-500"
      />
      <div className="leading-8 text-md">
        <h4 className="text-2xl mb-4 text-center">ངོ་སྤྲོད།</h4>
        <p>
          དེང་སྐབས་འཛམ་གླིང་ཁྱོན་ཡོངས་སུ་ཚན་རྩལ་འཕྲུལ་རིག་ཆེས་ཆེར་དར་ཞིང་།
          ལྷག་པར་ཉེ་བའི་ལོ་འདི་འགར་ཀུན་གྱིས་ཚ་ཚ་འུར་འུར་དུ་གླེང་བཞིན་པའི་མིས་བཟོས་རིག་ནུས་(Artificial
          intelligence)ཞེས་པ་བརྡ་འཕྲིན་འཕྲུལ་རིག་ཁྲོད་ཚད་གཞི་ཆེས་མཐོ་ཤོས་སུ་གྱུར་ཡོད་ལ།
          འབྱུང་འགྱུར་འཕྲུལ་རིག་འདི་བརྒྱུད་ནས་ད་ལྟའི་འགྲོ་བ་མི་ཐུན་མོང་གི་ལོངས་སྤྱོད་དུ་གྱུར་པའི་ཤེས་ཡོན་མཐའ་དག་སྔར་ལས་ནུས་པ་ལྡན་པ་དང་།
          ལས་ཆོད་མཐོར་འདེགས་གཏོང་ཐུབ་པར་མ་ཟད།
          ང་ཚོ་བོད་མི་རིགས་ལྟ་བུའི་ཤེས་རིག་རྒྱ་ཆེ་ཡང་སྤྱོད་མཁན་གྲངས་ཉུང་བའི་རིགས་ལ་ཕན་ཐོགས་རྒྱ་ཆེར་འབྱུང་ངེས།
        </p>
        <p>
          ལས་གཞི་འདི་རིགས་སྤྱིར་བཏང་གི་ལས་གཞི་ཆུང་ཆུང་ཞིག་མིན་པར་གློག་ཀླད་ཆེད་ལས་པ་དང་།
          ལས་མི་བརྒྱ་ཕྲག་མང་པོ་མཉམ་རུབ་མ་བྱས་ན་ཧ་ཅང་འགྲུབ་དཀའ་བར་བརྟེན།
          འདི་ག་སྨོན་ལམ་བོད་ཀྱི་བརྡ་འཕྲིན་ཞིབ་འཇུག་ཁང་གིས་སྤྱི་སྒེར་གྱི་ཚོགས་སྡེ་ཁག་མང་པོ་དང་མཉམ་འབྲེལ་གྱིས་རིག་ནུས་ཀྱི་དཔེ་མཚོན་ནམ་སྦྱོང་བརྡར་རྒྱུ་ཆ་སྟོང་ཕྲག་མང་པོ་མཁོ་སྒྲུབ་བྱེད་ཐུབ་ཡོད། 
        </p>
      </div>
    </div>
  );
}

export function EnglishIntro() {
  return (
    <div className=" flex flex-col  mb-20 justify-center items-center gap-10 px-4 lg:flex-row">
      <div>
        <img
          src="/assets/buddha.png"
          alt="monlam"
          className="w-[80%] float-left my-2 mx-4 md:w-[60%] lg:w-[40%] border-[#dddcdc] rounded-lg shadow-sm hover:scale-95 transition-all duration-500"
        />
        <h4 className="text-2xl mb-4 text-center  font-bold">Introduction</h4>
        <div className="text-sm md:text-md ">
          <p className="leading-[normal]">
            Welcome to a new era of innovation and progress! In today's world,
            technology has reached remarkable heights, and Artificial
            Intelligence (AI) stands at the forefront of this technological
            revolution. AI's advancement in information technology is reshaping
            how we access and utilize knowledge. The future promises even more
            sophisticated technological advancements, enhancing the efficiency
            and effectiveness of information for communities worldwide. This
            includes groups like the Tibetan community, whose rich knowledge and
            perspective are invaluable in driving positive global change.
          </p>
          <br />
          <p className="leading-[normal]">
            Our projects are ambitious and complex, demanding the collaboration
            of numerous skilled computer engineers and dedicated staff. At the
            Monlam IT Research Center, we have successfully partnered with a
            wide range of organizations, both public and private. These
            collaborations have enabled us to compile thousands of cognitive
            samples and training materials, crucial for advancing AI research
            and applications. Join us as we journey towards a smarter, more
            connected world.
          </p>
        </div>
      </div>
    </div>
  );
}
