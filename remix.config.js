/** @type {import('@remix-run/dev').AppConfig} */

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
};
