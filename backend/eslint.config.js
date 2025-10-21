// eslint.config.js

import globals from 'globals';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // Configuración recomendada por ESLint
  js.configs.recommended,

  // Configuración para desactivar reglas que chocan con Prettier
  eslintConfigPrettier,

  // Tu configuración personalizada
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node, // Define que las variables globales de Node.js están disponibles
      },
    },
    rules: {
      'no-unused-vars': 'warn', // Marca las variables no usadas como una advertencia
    },
    ignores: [
      'node_modules/', // Ignora la carpeta de dependencias
    ],
  },
];