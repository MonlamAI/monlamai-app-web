export const base64ToBuffer = (base64: string) => {
  // Remove base64 prefix and convert to Buffer
  const base64Data = base64.replace(/^data:audio\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  return buffer;
};
