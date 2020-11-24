/*
 * @Author: Clloz
 * @Date: 2020-11-15 15:07:21
 * @LastEditTime: 2020-11-15 16:48:29
 * @LastEditors: Clloz
 * @Description:
 * @FilePath: /todo/babel.config.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
module.exports = function (api) {
    api.cache(true);
    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
                modules: false, // for tree shaking
            },
        ],
    ];
    const plugins = [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        'transform-vue-jsx',
    ];
    return {
        presets,
        plugins,
    };
};
