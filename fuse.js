const {
  FuseBox,
  QuantumPlugin,
} = require("fuse-box");

const fuse = FuseBox.init({
  homeDir: "src",
  sourceMaps: false,
  target: "browser",
  plugins: [
    QuantumPlugin({
      target: "browser",
      bakeApiIntoBundle: "ssb.highlight",
      uglify: {
        warnings: true
      }
    }),
  ],
  output: "dist/$name.js",
});

fuse.bundle("ssb.highlight")
  .instructions("!> index.ts [index.ts]");

fuse.run();
