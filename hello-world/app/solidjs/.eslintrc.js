module.exports = {
  ignorePatterns: [
    "**/wrap/**/*.*",
    "**/dist/**/*.*",
    "**/node_modules/**/*.*",
    "**/coverage/**/*.*"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["solid"],
  extends: ["eslint:recommended", "plugin:solid/typescript"]
};
