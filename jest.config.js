const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  // Run setup scripts after the test environment has been set up
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Resolve module aliases like @/ properly
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Define module directories for Jest to search
  moduleDirectories: ["node_modules", "<rootDir>/"],

  // Set test environment for Next.js (jsdom for client-side behavior)
  testEnvironment: "jest-environment-jsdom",

  // Transform JavaScript files using Babel for ES modules support
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest",
  },

  // Clear mocks between tests
  clearMocks: true,
};

// Export the Jest config, ensuring Next.js config is properly loaded
module.exports = createJestConfig(customJestConfig);
