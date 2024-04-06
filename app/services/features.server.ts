import Flagsmith from "flagsmith-nodejs";
const flagsmith_provider = new Flagsmith({
  environmentKey: process.env?.FEATURE_SDK_KEY,
  apiUrl:"https://flagsmith-f55w.onrender.com/api/v1"
});

export default flagsmith_provider;
