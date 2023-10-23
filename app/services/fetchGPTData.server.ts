import OpenAI from "openai";

export const fetchGPTData = async (sentence: string) => {
  let prompt = sentence;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
    // defaults to process.env["OPENAI_API_KEY"]
  });
  try {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);

    return chatCompletion.choices[0].message?.content;
  } catch (e) {
    console.log("error", e.response.data);
  }
  return "";
};
