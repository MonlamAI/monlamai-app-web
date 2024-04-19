import { initialize } from "unleash-client";

const unleash = initialize({
  url: process.env.UNLEASH_FLAG_URL!,
  appName: "Default",
  customHeaders: { Authorization: process.env.UNLEASH_FLAG_KEY! },
});

export default unleash;
