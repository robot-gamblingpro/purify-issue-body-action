module.exports = {
  clearMocks: true,
  moduleFileExtensions: ["js", "ts"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.(ts|js)x?$": "babel-jest",
  },
  transformIgnorePatterns: [`/node_modules/1234`],
  verbose: true,
};
