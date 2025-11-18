// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

// ⬇ Prettier 関連
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      eslintConfigPrettier, // ← ESLint のフォーマット系ルールをオフにする
    ],
    plugins: {
      prettier: prettierPlugin, // ← Prettier を ESLint から実行
    },
    rules: {
      'prettier/prettier': 'error', // ← Prettier の指摘を ESLint エラーとして扱う
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
