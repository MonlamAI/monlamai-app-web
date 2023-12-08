const q1Options = [
  "གསར་འགྱུར་",
  "དཔེ་དེབ་",
  "གླེང་མོལ་",
  "སྙན་ངག་",
  "འཕྲིན་ཡིག་",
  "རྩོམ་ཡིག་",
  "ཡིག་ཆ་",
  "ཁྱབ་བསྒྲགས་",
  "གཞན་དག",
];

// options to audio transcribe,
// conversations, news, teaching, movies, lyrics, other
const q2Options = [
  "གླེང་མོལ་",
  "གསར་འགྱུར་",
  "སློབ་ཁྲིད་",
  "གློག་བརྙན་",
  "གཞས་ཚིག",
  "གཞན་དག",
];

//   options to read via tts,
// book, news, story, prayer, other
const q3Options = ["དཔེ་དེབ་", "གསར་འགྱུར", "གཏམ་རྒྱུད།", "ཞལ་འདོན་", "གཞན་དག"];

// options to ocr,
// wood block print, handwritten print, modern print, billboard, rock art, other
const q4Options = ["ཤིང་པར།", "ལག་བྲིས།", "ལྕགས་པར།", "གཞན་དག"];

export const feedback_options = (translation) => {
  return {
    q1: {
      label: translation.mt_question,
      option: q1Options,
    },
    q2: {
      label: translation.stt_question,
      option: q2Options,
    },
    q3: { label: translation.tts_question, option: q3Options },
    q4: {
      label: translation.ocr_question,
      option: q4Options,
    },
  };
};
