import { BsGlobe2, BsFillVolumeUpFill } from "react-icons/bs";
import { FaAssistiveListeningSystems } from "react-icons/fa";
import SVG from "~/styles/OCR_logo.svg";

export type ModalType = {
  icon: any;
  name: string;
  desc: string;
  link: string;
  color: string;
};

export let models: ModalType[] = [
  {
    icon: <BsGlobe2 />,
    name: "ཡིག་སྒྱུར་རིག་ནུས།",
    desc: "དབྱིན་བོད་ཕན་ཚུན་ཡིག་སྒྱུར་བྱེད་ཐུབ།",
    link: "mt",
    color: "#ff006a",
  },
  {
    icon: <BsFillVolumeUpFill />,
    name: "ཀློག་འདོན་རིག་ནུས།",
    desc: "བོད་ཡིག་གཏག་མ་ཀློག་འདོན་བྱེད་ཐུབ།",
    link: "tts",
    color: "#00AAFF",
  },
  {
    icon: <FaAssistiveListeningSystems />,
    name: "སྒྲ་འཛིན་རིག་ནུས།",
    desc: "བོད་སྐད་ཡིག་འབེབས་བྱེད་ཐུབ།",
    link: "stt",
    color: "#FF0000",
  },
  {
    icon: <img src={SVG} height={45} width={45} />,
    name: "ཡིག་འཛིན་རིག་ནུས།",
    desc: "པར་རིས་ནང་གི་བོད་ཡིག་ཡིག་འབེབས་བྱེད་ཐུབ།",
    link: "ocr",
    color: "#9933FF",
  },
];
