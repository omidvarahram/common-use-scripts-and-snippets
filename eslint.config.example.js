import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import airbnb from 'eslint-config-airbnb';
import airbnbTypescript from 'eslint-config-airbnb-typescript';
import airbnbHooks from 'eslint-config-airbnb/hooks';

export default [
  js.configs.recommended, // Load ESLint's recommended config
  airbnb,                // Airbnb base config
  airbnbTypescript,      // Airbnb TypeScript config
  airbnbHooks,           // Airbnb React hooks config
  {
    files: ['**/*.ts', '**/*.tsx'], // Apply to TypeScript files
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      // Rules from your old configuration
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'off',
      'max-len': ['error', { code: 150, ignoreComments: true }],
      'no-restricted-syntax': [
        'error',
        'ForInStatement',
        'LabeledStatement',
        'WithStatement',
      ],
      'operator-linebreak': [
        'warn',
        'after',
        {
          overrides: {
            '?': 'ignore',
            ':': 'ignore',
          },
        },
      ],
      'object-curly-newline': 'off',
      'implicit-arrow-linebreak': 'off',
      'react/function-component-definition': 'off',
      'function-paren-newline': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },
];
