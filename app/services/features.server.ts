import { initialize } from "unleash-client";

const unleash = initialize({
  url: process.env.UNLEASH_FLAG_URL!,
  appName: "*",
  customHeaders: { Authorization: process.env.UNLEASH_FLAG_KEY! },
});

const isJobEnabled = unleash?.isEnabled("isJobEnabled");
const enable_replacement_mt = unleash?.isEnabled("enable_replacement_mt");

const useDharmaMitraAPI = unleash?.isEnabled("useDharmaMitraAPI");
const file_upload_enable = process.env.enableFileUpload === "true";

export {
  isJobEnabled,
  enable_replacement_mt,
  file_upload_enable,
  useDharmaMitraAPI,
};

export default unleash;
