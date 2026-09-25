import js from '@eslint/js';
import ts from 'typescript-eslint';
export default ts.config({ignores:['dist/**','node_modules/**','src/content/generated/**','.agents/**','.specify/**','gravatexto-base-v0.1/**','test-results/**','playwright-report/**']},js.configs.recommended,...ts.configs.recommended,{languageOptions:{globals:{console:'readonly',process:'readonly',URL:'readonly',Buffer:'readonly',structuredClone:'readonly'}},rules:{'@typescript-eslint/no-unused-vars':['error',{argsIgnorePattern:'^_'}]}});
