/** @type {import('@remix-run/dev').AppConfig} */
export default {
  serverModuleFormat: "esm",
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: ["react-typing-effect"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  tailwind: true,
};
