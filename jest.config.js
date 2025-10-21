/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/dist/**/*.test.js'], // 👈 solo busca en dist
  modulePathIgnorePatterns: ['<rootDir>/src/'], // ignora src
};
