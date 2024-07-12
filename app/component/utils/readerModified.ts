import mammoth from "mammoth";

export const MAX_TEXT_LIMIT = 10000; // Define your text limit

export function readTextFile(file: File, setSourceText: (text: string | ArrayBuffer | null) => void) {
  const reader = new FileReader();
  reader.onload = function (e: ProgressEvent<FileReader>) {
    const contents = e.target?.result;
    if (typeof contents === 'string' && contents.length < MAX_TEXT_LIMIT) {
      setSourceText(contents);
    }
  };
  reader.onerror = function (e: ProgressEvent<FileReader>) {
    console.error("Error reading file:", e);
  };
  reader.readAsText(file);
}

export async function readDocxFile(file: File, setSourceText: (text: string | ArrayBuffer | null) => void): Promise<void> {
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e: ProgressEvent<FileReader>) {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      // console.log("arrayBuffer", arrayBuffer);

      // Use mammoth.js to parse the .docx content
      mammoth.extractRawText({ arrayBuffer }).then(function (resultObject) {
        const text = resultObject.value; // The raw text
        // console.log("text", text);
        if (text?.length < MAX_TEXT_LIMIT) {
          setSourceText(text);
        }
      }).catch(error => {
        console.error("Error extracting text from docx:", error);
      });
    };

    reader.onerror = function (e: ProgressEvent<FileReader>) {
      console.error("Error reading file:", e);
    };

    reader.readAsArrayBuffer(file);
  }
}