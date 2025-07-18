module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-native/all', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off', // React 17+ JSX transform
    'no-console': ['warn', { allow: ['warn', 'error'] }], // console.log 금지, warn/error만 허용
    'no-unused-vars': 'warn', // 미사용 변수 경고
    eqeqeq: ['error', 'always'], // 항상 === 사용
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ], // import 순서
    semi: ['error', 'never'], // 세미콜론 금지
    '@typescript-eslint/semi': ['error', 'never'], // 타입스크립트에서도 세미콜론 금지
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['node_modules/', 'package/', 'mobile/node_modules/', 'web/**/node_modules/', 'web/**/dist/', 'web/**/build/', 'mobile/.expo/', 'mobile/.expo-shared/'],
}
