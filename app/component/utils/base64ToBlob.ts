// convert base64 to blob
export function base64ToBlob(base64: string, contentType: string) {
  // Decode the base64 string to binary data
  const byteCharacters = atob(base64.split(",")[1]);
  // Create an array buffer of the same size as the binary data length
  const arrayBuffer = new ArrayBuffer(byteCharacters.length);
  // Create a typed array view
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteCharacters.length; i++) {
    uint8Array[i] = byteCharacters.charCodeAt(i);
  }

  // Create a blob from the typed array
  const blob = new Blob([arrayBuffer], { type: contentType });
  return blob;
}
