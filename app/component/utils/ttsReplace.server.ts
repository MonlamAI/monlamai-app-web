function inputReplace(input: string) {
  let result = input.replace(/\u0F38/g, "");
  return result;
}

export default inputReplace;
