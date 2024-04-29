import { initialize } from "unleash-client";

const unleash = () => {
  let init = null;
  try {
    init = initialize({
      url: process.env.UNLEASH_FLAG_URL!,
      appName: "Default",
      customHeaders: { Authorization: process.env.UNLEASH_FLAG_KEY! },
    });
  } catch (e) {
    console.log(e);
  }
  return init;
};
let unleashed = unleash();
export default unleashed;
