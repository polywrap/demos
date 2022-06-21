module.exports = {
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/tests/**/?(*.)+(spec|test).[jt]s?(x)"],
  globals: {
    'ts-jest': {
      tsconfig: "tsconfig.ts.json",
      diagnostics: false
    }
  }
};