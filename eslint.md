'''
# Install required packages
npm install --save-dev \
  eslint@^9.15.0 \
  typescript \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-plugin-react \
  eslint-plugin-react-native \
  eslint-plugin-react-hooks \
  eslint-plugin-jest \
  eslint-plugin-import
'''

'''
// eslint.config.mjs
import eslint from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactNativePlugin from 'eslint-plugin-react-native';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jestPlugin from 'eslint-plugin-jest';
import importPlugin from 'eslint-plugin-import';

export default [
  // Ignore patterns
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/*.config.*',
      '**/.eslintrc.*',
      '**/babel.config.*',
      '**/jest.config.*'
    ]
  },

  // Base ESLint configuration
  eslint.configs.recommended,

  // TypeScript configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...typescriptPlugin.configs.recommended,
    languageOptions: {
      parser: typescriptPlugin.parser,
      parserOptions: {
        project: true,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },

  // React configuration
  {
    files: ['**/*.tsx', '**/*.jsx'],
    ...reactPlugin.configs.recommended,
    ...reactPlugin.configs['jsx-runtime'],
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off'
    }
  },

  // React Native configuration
  {
    files: ['**/*.native.tsx', '**/*.mobile.tsx'],
    plugins: {
      'react-native': reactNativePlugin
    },
    rules: {
      ...reactNativePlugin.configs.recommended.rules,
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': 'warn',
      'react-native/split-platform-components': 'error'
    }
  },

  // React Hooks configuration
  {
    plugins: {
      'react-hooks': reactHooksPlugin
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },

  // Jest configuration
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    ...jestPlugin.configs.recommended,
    env: {
      'jest/globals': true
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
  },

  // Import configuration
  {
    plugins: {
      import: importPlugin
    },
    rules: {
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      'import/no-unresolved': 'off' // TypeScript already handles this
    }
  }
];

'''

'''
# Additional packages to install
npm install --save-dev \
  eslint-config-airbnb-typescript \
  @eslint/compat
'''

'''
// eslint.config.mjs
import eslint from '@eslint/js';
import compat from '@eslint/compat';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import airbnbConfig from 'eslint-config-airbnb-typescript';

export default [
  // Ignore patterns (keep this first)
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/*.config.*',
      '**/.eslintrc.*',
      '**/babel.config.*',
      '**/jest.config.*'
    ]
  },

  // Base ESLint recommended
  eslint.configs.recommended,

  // Extended external configs (Airbnb example)
  ...compat.config(airbnbConfig),

  // TypeScript configuration (override Airbnb where needed)
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...typescriptPlugin.configs.recommended,
    languageOptions: {
      parser: typescriptPlugin.parser,
      parserOptions: {
        project: true,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      // Override Airbnb's member delimiter style
      '@typescript-eslint/member-delimiter-style': ['error', {
        multiline: { delimiter: 'semi', requireLast: true },
        singleline: { delimiter: 'semi', requireLast: false }
      }]
    }
  },

  // Rest of your configurations (React, Jest, etc.)...
  // Keep other configurations from previous answer here
];
'''

'''
// For multiple extended configs
import otherConfig from 'eslint-config-other';

export default [
  eslint.configs.recommended,
  ...compat.config(airbnbConfig),
  ...compat.config(otherConfig),
  // Your custom configs here
];
'''

'''
npm install eslint-config-airbnb-typescript@^13.0.0
'''

'''
rules: {
  // Airbnb conflicts with TypeScript
  'react/require-default-props': 'off', // TypeScript makes this redundant
  'import/extensions': 'off', // Conflicts with TypeScript's module resolution
  'react/jsx-filename-extension': ['error', {
    extensions: ['.tsx'] // Allow TSX files
  }],
}
'''