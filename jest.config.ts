export default {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "ts"],
  roots: ["<rootDir>/spec"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)"],
  transform: { "^.+\\.(ts)$": "ts-jest" },
};
