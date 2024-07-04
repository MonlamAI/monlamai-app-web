/** @type {import('@remix-run/dev').AppConfig} */
// const { createRoutesFromFolders } = require("@remix-run/v1-route-convention");
module.exports = {
  serverModuleFormat: "cjs",
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [
    /^remix-utils.*/,
    "react-typing-effect",
    "react-audio-visualize",
    "react-icons",
    "react-form-wizard-component",
    "docx",
    "file-saver",
    "franc-min",
    "react-leaflet",
    "leaflet",
  ],
  tailwind: true,
  browserNodeBuiltinsPolyfill: {
    modules: {
      path: true,
      util: true,
      querystring: true,
      net: true,
      buffer: true,
      events: true,
      stream: true,
      crypto: true,
      http: true,
      os: true,
      assert: true,
      tls: true,
      url: true,
      https: true,
      fs: true,
      child_process: true,
    },
  },
};
