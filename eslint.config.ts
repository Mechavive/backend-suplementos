// import js from '@eslint/js';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';
// import json from '@eslint/json';
// import prettier from 'eslint-plugin-prettier';
// import { defineConfig } from 'eslint/config';

// export default defineConfig([
//   // Reglas para JS/TS
//   {
//     files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
//     languageOptions: {
//       globals: globals.node,
//     },
//     plugins: {
//       js,
//       prettier,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       'prettier/prettier': 'error', // marca errores de formato como errores ESLint
//     },
//   },

//   // Reglas específicas de TypeScript
//   {
//     files: ['**/*.ts'],
//     languageOptions: {
//       parser: tseslint.parser,
//       parserOptions: {
//         project: './tsconfig.json',
//         sourceType: 'module',
//       },
//     },
//     plugins: {
//       '@typescript-eslint': tseslint.plugin,
//       prettier,
//     },
//     rules: {
//       ...tseslint.configs.recommendedTypeChecked[0].rules,
//       'prettier/prettier': 'error',
//     },
//   },

//   // Reglas para JSON
//   {
//     files: ['**/*.json'],
//     language: 'json/json',
//     plugins: {
//       json,
//     },
//     rules: {
//       ...json.configs.recommended.rules,
//     },
//   },
// ]);

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Ignorar dist, node_modules, coverage, etc.
  {
    ignores: ['node_modules', 'dist', 'coverage', 'eslint.config.ts', 'package-lock.json', 'tsconfig.json'],
  },

  // Reglas para JS/TS en general
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      js,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },

  // Reglas específicas de TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      'prettier/prettier': 'error',

      // Sobrescribir la regla de ESLint por la de TypeScript
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
    },
  },


  // Reglas para JSON
  {
    files: ['**/*.json'],
    language: 'json/json',
    plugins: {
      json,
    },
    rules: {
      ...json.configs.recommended.rules,
    },
  },

  // Reglas para archivos test
  {
    files: ['**/*.test.ts'],
    languageOptions: {
      globals: {
        ...globals.jest, // 👈 habilita los globals de Jest
      },
    },
  }
]);


