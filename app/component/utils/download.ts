import { saveAs } from "file-saver";
import { Document, Packer, Paragraph } from "docx";

const downloadTxtFile = (content: string) => {
  // Create a Blob from the content
  const blob = new Blob([content], { type: "text/plain" });
  saveAs(blob, "download.txt");
};

const downloadDocxFile = async (content: string) => {
  console.log("translation", content);
  const doc = new Document({
    creator: "User name",
    description: "My document",
    title: "My Document",
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: content,
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "download.docx");
  });
};

export { downloadTxtFile, downloadDocxFile };
