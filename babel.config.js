module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@": "./src",
          },
        },
      ],
      "react-native-reanimated/plugin", // ✅ Agora sim, separado e por último!
    ],
  };
};
