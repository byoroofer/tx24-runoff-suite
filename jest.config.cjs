module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests/jest"],
  moduleNameMapper: {
    "^@tx24/shared$": "<rootDir>/packages/shared/src/index.ts",
    "^@tx24/shared/(.*)$": "<rootDir>/packages/shared/src/$1"
  }
};
