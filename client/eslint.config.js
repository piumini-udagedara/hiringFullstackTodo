import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import stylelint from 'eslint-plugin-stylelint'

export default defineConfig([
  globalIgnores(['dist', '**/*.css']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.css'],
    plugins: {
      stylelint,
    },
    rules: {
      'stylelint/report-needless-disables': 'warn',
      'stylelint/declaration-block-no-duplicate-properties': 'error',
      'at-rule-no-unknown': 'off', // Disable this rule for Tailwind CSS at-rules
    },
  },
])
