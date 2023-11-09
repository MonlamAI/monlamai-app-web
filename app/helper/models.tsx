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
    name: "ཡིག་སྒྱུར་རིག་ནུས།",
    desc: "དབྱིན་བོད་ཕན་ཚུན་ཡིག་སྒྱུར་བྱེད་ཐུབ།",
    link: "mt",
    color: "#ff006a",
  },
  {
    icon: <TTSIcon />,
    name: "ཀློག་འདོན་རིག་ནུས།",
    desc: "བོད་ཡིག་གཏག་མ་ཀློག་འདོན་བྱེད་ཐུབ།",
    link: "tts",
    color: "#00AAFF",
  },
  {
    icon: <STTIcon />,
    name: "སྒྲ་འཛིན་རིག་ནུས།",
    desc: "བོད་སྐད་ཡིག་འབེབས་བྱེད་ཐུབ།",
    link: "stt",
    color: "#FF0000",
  },
  {
    icon: <OCRIcon />,
    name: "ཡིག་འཛིན་རིག་ནུས།",
    desc: "པར་རིས་ནང་གི་བོད་ཡིག་ཡིག་འབེབས་བྱེད་ཐུབ།",
    link: "ocr",
    color: "#9933FF",
  },
];
