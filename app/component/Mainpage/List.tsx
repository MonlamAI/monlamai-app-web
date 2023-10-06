import React from "react";

type ModalType = {
  img: string;
  name: string;
  desc: string;
  icon: string;
  bg: string;
};

type EachProps = {
  model: ModalType;
  index: number;
};

function List() {
  let models: ModalType[] = [
    {
      img: "/assets/mt.png",
      name: "ཡིག་སྒྱུར་རིག་ནུས།",
      desc: "དབང་རྩའི་འཕྲུལ་རིག་གི་ཡིག་སྒྱུར་རིག་ནུས།",
      icon: "fa fa-solid fa-globe",
      bg: "#a3c8eb",
    },
    {
      img: "/assets/tts.png",
      name: "ཀློག་འདོན་རིག་ནུས།",
      desc: "ཡེ་གེ་ཀློག་འདོན་གྱིས་འགྲོ་བ་མིའི་ངག་གི་འགན་སྒྲུབ་ཐུབ།",
      icon: "fas fa-volume-up",
      bg: "#ded4dc",
    },
    {
      img: "/assets/stt.png",
      name: "སྒྲ་འཛིན་རིག་ནུས།",
      desc: "རིག་ནུས་འདིའི་བོད་སྐད་གོ་ཐུབ་པའི་ཁྱད་ཆོས་ལྡན།",
      icon: "fas fa-assistive-listening-systems",
      bg: "#c8b3c9",
    },
    {
      img: "/assets/ocr.png",
      name: "གཟུགས་འཛིན་རིག་ནུས།",
      desc: "པར་རིས་ཡིག་གཟུགས་འདྲ་མིན་ངོས་འཛིན་བྱེད་ཐུབ།",
      icon: "fas fa-file-alt",
      bg: "#c7ddd1",
    },
  ];

  return (
    <div className="bg-[#2d1f3e] py-[100px]" id="skills">
      <div className="text-center  max-w-[1140px] mx-auto">
        <h2 className="text-[2rem] mb-2">སྨོན་མ་རིག་ནུས་ཞབས་ཞུའི་མ་ལག</h2>
        <p className="mb-8">
          གཤམ་གསལ་ཚོད་ལྟའི་མ་ལག་ཁག་ལ་ཁྱེད་རང་མཉམ་ཞུགས་བྱ་ཆོག
        </p>
        <div className="flex gap-2 mx-10 flex-col md:flex-row ">
          {models.map((model, index) => (
            <EachModel key={model.name} model={model} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EachModel({ model, index }: EachProps) {
  const { name, desc, img, icon, bg } = model;
  return (
    <div
      className={`flex flex-col text-black rounded-2xl overflow-hidden min-h-[400px]`}
      style={{ backgroundColor: bg }}
    >
      <img src={img} alt={"image" + index} />
      <div className="flex flex-col  justify-center gap-8 p-5">
        <div className="text-[1.25rem]">{name}</div>
        <div className="">{desc}</div>
        <button
          type="button"
          className="bg-[#368df7] py-3 rounded-xl flex gap-2 text-white  justify-center items-center"
        >
          <i className={icon} style={{ fontSize: 24 }}></i>
          བེད་སྤྱོད་གནང་རོགས།
        </button>
      </div>
    </div>
  );
}

export default List;
