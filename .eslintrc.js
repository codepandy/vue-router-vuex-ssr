
module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb-base',
        'prettier',
        'plugin:vue/essential',
        '@vue/prettier',
    ],
    parserOptions: {
        ecmaVersion: 11,
        ecmaFeatures: {
            jsx: true,
        },
        parser: 'babel-eslint',
        sourceType: 'module',
        allowImportExportEverywhere: true,
    },
    plugins: ['prettier', 'html'],
    rules: {
        'prettier/prettier': [
            'warn',
            {
                printWidth: 100,
                tabWidth: 4,
                useTabs: false,
                semi: true,
                singleQuote: true,
                jsxSingleQuote: false,
                trailingComma: 'all',
                quoteProps: 'as-needed',
                bracketSpacing: true,
                jsxBracketSameLine: false,
                arrowParens: 'avoid',
                requirePragma: false,
                insertPragma: false,
                proseWrap: 'preserve',
                htmlWhitespaceSensitivity: 'ignore',
                vueIndentScriptAndStyle: false,
                endOfLine: 'auto',
            },
        ],
        'no-console': ['error', { allow: ['warn', 'error', 'log', 'time'] }],
        'import/no-extraneous-dependencies': 'off',
    },
};
