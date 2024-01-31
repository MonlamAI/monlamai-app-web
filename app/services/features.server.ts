import Flagsmith from "flagsmith-nodejs";

const flagsmith_provider = new Flagsmith({
  environmentKey: process.env?.FEATURE_SDK_KEY,
});

export default flagsmith_provider;

export async function feature(flag: string) {
  let fetchdata = await flagsmith_provider.getEnvironmentFlags();
  let feature_data = fetchdata.flags[flag];
  return feature_data;
}
