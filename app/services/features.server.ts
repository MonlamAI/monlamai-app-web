import Flagsmith from "flagsmith-nodejs";
const flagsmith_provider = new Flagsmith({
  environmentKey: process.env?.FEATURE_SDK_KEY,
  apiUrl:process.env?.FEATURE_FLAG_URL
});

export default flagsmith_provider;
