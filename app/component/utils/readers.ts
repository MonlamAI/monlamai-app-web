export function readTextFile(file) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var contents = e.target.result;
    console.log(contents);
  };
  reader.onerror = function (e) {
    console.error("Error reading file:", e);
  };
  reader.readAsText(file);
}

export function readDocxFile(file) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var arrayBuffer = e.target.result;
    // Here you need to use a library like mammoth.js to parse the .docx content
    // Example (assuming mammoth.js is included):
  };
  reader.onerror = function (e) {
    console.error("Error reading file:", e);
  };
  reader.readAsArrayBuffer(file);
}
