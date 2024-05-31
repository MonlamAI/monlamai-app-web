let webhook = require("webhook-discord");

let MT_SUCCESS_MESSAGE = "MT is working";
let STT_SUCCESS_MESSAGE = "STT is working";
let TTS_SUCCESS_MESSAGE = "TTS is working";

let MT_FAILED_MESSAGE = "MT is not working";
let STT_FAILED_MESSAGE = "STT is not working";
let TTS_FAILED_MESSAGE = "TTS is not working";
let OCR_FAILED_MESSAGE = "OCR is not working";

async function testAPI() {
  testMT();
  testTTS();
  testSTT();
  testOCR();
}

module.exports = { testAPI };

async function callApiWithPost(url, modelToken, text, model) {
  const controller = new AbortController();
  const { signal } = controller;
  const data = { inputs: text };
  const API_ERROR_MESSAGE = "API request failed";
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: modelToken,
    },
    body: JSON.stringify(data),
    signal,
  });
  if (!response.ok) {
    throw new Error(API_ERROR_MESSAGE);
  }

  if (model === "mt") {
    return await postRequestAndHandleResponse(response);
  }
  if (model === "tts") {
    let data = await response.json();
    const { audio_base64 } = data;
    return audio_base64;
  }
  if (model === "stt") {
  }
  return null;
}

async function postRequestAndHandleResponse(response) {
  try {
    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      // Handle JSON response
      let data = await response.json();
      return data[0].generated_text;
    } else if (contentType && contentType.includes("text")) {
      // Handle text stream
      const reader = response.body.getReader();
      let translation = "";

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunkText = new TextDecoder("utf-8")
          .decode(value)
          .replace(/^data:/, "");
        const chunkData = JSON.parse(chunkText);
        if (chunkData.generated_text !== null) {
          translation = chunkData.generated_text;
        }
      }

      return translation;
    } else {
      throw new Error("Unsupported content type");
    }
  } catch (error) {
    console.error("Error in postRequestAndHandleResponse:", error);
    throw error;
  }
}

async function testMT() {
  const url = process.env?.MT_API_URL;
  let modelToken = process.env?.MODEL_API_AUTH_TOKEN;
  let text = "<2fr>The quick brown fox jumps over the lazy dog.";
  try {
    const translation = await callApiWithPost(url, modelToken, text, "mt");
    if (translation) {
      console.log("mt success");
    }
  } catch (error) {
    announceToDiscord(MT_FAILED_MESSAGE, "reject");
  }
}

async function testTTS() {
  const url = process.env?.TTS_API_URL;
  let modelToken = process.env?.MODEL_API_AUTH_TOKEN;
  let text = "The quick brown fox jumps over the lazy dog.";
  try {
    const audio = await callApiWithPost(url, modelToken, text, "tts");
    if (audio) {
      console.log("tts success");
    }
  } catch (error) {
    announceToDiscord(TTS_FAILED_MESSAGE, "reject");
  }
}

async function testSTT() {
  try {
    const text = await callApiWithAudio(
      "https://playtht-website-assets.s3.amazonaws.com/voice-samples/pages/home/Play.ht+-+videos.wav"
    );
    if (text) {
      console.log(" ocr success");
    }
  } catch (error) {
    announceToDiscord(OCR_FAILED_MESSAGE, "reject");
  }
}
async function testOCR() {
  try {
    const text = await callApiWithImage(
      "https://s3.ap-south-1.amazonaws.com/monlam.ai.website/OCR/input/1715844187384-IMG-20240516-WA0002.jpg"
    );
    if (text) {
      console.log(" OCR success");
    }
  } catch (error) {
    announceToDiscord(STT_FAILED_MESSAGE, "reject");
  }
}
async function callApiWithAudio(audioUrl) {
  const apiUrl = process.env.STT_API_URL;
  const headers = {
    Authorization: process.env.MODEL_API_AUTH_TOKEN,
    "Content-Type": "audio/flac",
  };

  let response;
  const blob = await fetch(audioUrl).then((res) => res.blob());
  try {
    response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: blob,
    });
    return response.json(); // Assuming the API returns JSON
  } catch (error) {
    return { error: "API Error" }; // Use a constant or a meaningful error message
  }
}

async function callApiWithImage(imageURL) {
  let URL_File = process.env.FILE_SUBMIT_URL;

  if (imageURL) {
    let formData = new FormData();
    formData.append("imageUrl", imageURL);
    let data;
    try {
      let res = await fetch(URL_File + "/ocr/upload", {
        method: "POST",
        body: formData,
      });

      data = await res.json();
      if (data?.error) {
        throw new Error(data.error);
      }
    } catch (e) {
      return {
        error_message: "API not working.",
      };
    }
  }
}

function announceToDiscord(message, type) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  const Hook = new webhook.Webhook(url);
  const message_added = message + " at " + new Date().toLocaleString();
  const username = "BOT";
  if (type === "success") {
    Hook.success(username, message_added);
  }
  if (type === "reject") {
    Hook.warn(username, message_added);
  }
  return null;
}
