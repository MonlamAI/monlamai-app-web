/** @type {import('@remix-run/dev').AppConfig} */
const { createRoutesFromFolders } = require("@remix-run/v1-route-convention");
module.exports = {
  serverModuleFormat: "cjs",
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [
    "react-typing-effect",
    "react-audio-visualize",
    "react-icons",
    "react-form-wizard-component",
  ],
  tailwind: true,
  browserNodeBuiltinsPolyfill: {
    modules: {
      path: true,
      util: true,
    },
  },
  routes(defineRoutes) {
    // uses the v1 convention, works in v1.15+ and v2
    return createRoutesFromFolders(defineRoutes);
  },
};
