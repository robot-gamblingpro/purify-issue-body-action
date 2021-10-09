module.exports = (api) => {
  api.cache(false);

  return {
    presets: [
      ["@babel/preset-env", { targets: { node: "12" } }],
      "@babel/preset-typescript",
    ],
  };
};
