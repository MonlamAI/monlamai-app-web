import mammoth from "mammoth";

const MAX_TEXT_LIMIT = 2000;

export function readTextFile(file, setSourceText) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var contents = e.target.result;
    if (contents?.length < MAX_TEXT_LIMIT) setSourceText(contents);
  };
  reader.onerror = function (e) {
    console.error("Error reading file:", e);
  };
  reader.readAsText(file);
}

export async function readDocxFile(file, setSourceText) {
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      var arrayBuffer = e.target?.result;
      console.log("arrayBuffer", arrayBuffer);
      // Here you need to use a library like mammoth.js to parse the .docx content
      // Example (assuming mammoth.js is included):
      mammoth.extractRawText({ arrayBuffer }).then(function (resultObject) {
        var text = resultObject.value; // The raw text
        console.log("text", text);
        if (text?.length < MAX_TEXT_LIMIT) setSourceText(text);
      });
    };
    reader.onerror = function (e) {
      console.error("Error reading file:", e);
    };
    reader.readAsArrayBuffer(file);
  }
}
