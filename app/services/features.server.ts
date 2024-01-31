import Flagsmith from "flagsmith-nodejs";

const flagsmith_provider = new Flagsmith({
  environmentKey: process.env?.FEATURE_SDK_KEY,
});

export default flagsmith_provider;
