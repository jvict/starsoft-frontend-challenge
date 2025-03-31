const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\.(css|scss|sass)$": "identity-obj-proxy",
    "\.(svg|png|jpg|jpeg|gif)$": "<rootDir>/__mocks__/fileMock.js"
  },
  transform: {
    "^.+\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ['next/babel'] }],
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  watchman: false,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json'
    }
  },
  rootDir: ".",
};

module.exports = createJestConfig(customJestConfig);