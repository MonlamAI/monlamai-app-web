import { BsGlobe2, BsFillVolumeUpFill } from "react-icons/bs";
import { FaAssistiveListeningSystems } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";

import MTIcon from "~/styles/modelIcons/MT";
import TTSIcon from "~/styles/modelIcons/TTS";
import STTIcon from "~/styles/modelIcons/STT";
import OCRIcon from "~/styles/modelIcons/OCR";

export type ModalType = {
  icon: any;
  name: string;
  desc: string;
  link: string;
  color: string;
};

export let models: ModalType[] = [
  {
    icon: <MTIcon />,
    name: "MT",
    desc: "MT_description",
    link: "mt",
    color: "#ff006a",
  },
  {
    icon: <TTSIcon />,
    name: "TTS",
    desc: "TTS_description",
    link: "tts",
    color: "#00AAFF",
  },
  {
    icon: <STTIcon />,
    name: "STT",
    desc: "STT_description",
    link: "stt",
    color: "#FF0000",
  },
  {
    icon: <OCRIcon />,
    name: "OCR",
    desc: "OCR_description",
    link: "ocr",
    color: "#9933FF",
  },
];
