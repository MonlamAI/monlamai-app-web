import React from "react";

type ModalType = {
  img: string;
  name: string;
  desc: string;
};

type EachProps = {
  model: ModalType;
  index: number;
};

function List() {
  let models: ModalType[] = [
    {
      img: "",
      name: "Machine Translation Mastery",
      desc: "Communicate globally with MonlamAI’s MT model. Instantaneous and accurate translations for all your language needs.",
    },
    {
      img: "",
      name: "Speech-to-Text Wonders",
      desc: "Transform any audio into written text with MonlamAI’s STT model. Our intelligent algorithm understands accents and dialects.",
    },
    {
      img: "",
      name: "Text-to-Speech Magic",
      desc: "MonlamAI's TTS model converts any written text into clear, lifelike audio. Experience a voice so natural it’s spooky!",
    },
    {
      img: "",
      name: "OCR Brilliance",
      desc: "Revolutionize image document scanning with MonlamAI’s OCR model. Effortless conversion from pictures to editable text.",
    },
  ];

  return (
    <div className="p-[100px] ">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-16 ">
        {models.map((model, index) => (
          <EachModel key={model.name} model={model} index={index} />
        ))}
      </div>
    </div>
  );
}

function EachModel({ model, index }: EachProps) {
  const { name, desc, img } = model;
  const isEven = index % 2 === 0;
  return (
    <div className={`flex ${!isEven ? "flex-row-reverse" : ""} `}>
      <img
        className="rounded-2xl"
        src={
          "https://framerusercontent.com/images/cyTlKJ3hdhv1sxS3yIFIKosPCIU.jpg?scale-down-to=512"
        }
      />
      <div className="flex flex-col m-10 justify-center gap-8">
        <div className="font-Elsie text-2xl">{name}</div>
        <div className="font-Inter">{desc}</div>
      </div>
    </div>
  );
}

export default List;
