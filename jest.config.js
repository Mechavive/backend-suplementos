/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  testMatch: ['**/dist/**/*.test.js'],
  modulePathIgnorePatterns: ['<rootDir>/src/'],
};
