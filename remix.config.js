/** @type {import('@remix-run/dev').AppConfig} */
// export default {
//   serverModuleFormat: "esm",
//   ignoredRouteFiles: ["**/.*"],
//   serverDependenciesToBundle: [
//     "react-typing-effect",
//     "react-audio-visualize",
//     "react-icons",
//   ],
//   // appDirectory: "app",
//   // assetsBuildDirectory: "public/build",
//   // publicPath: "/build/",
//   // serverBuildPath: "build/index.js",
//   tailwind: true,
// };

module.exports = {
  serverModuleFormat: "cjs",
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [
    "react-typing-effect",
    "react-audio-visualize",
    "react-icons",
    "react-form-wizard-component",
  ],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  tailwind: true,
  browserNodeBuiltinsPolyfill: {
    modules: {
      path: true,
      util: true,
    },
  },
};
