/*
 * @Author: Clloz
 * @Date: 2020-11-15 22:19:02
 * @LastEditTime: 2020-11-15 22:45:49
 * @LastEditors: Clloz
 * @Description:
 * @FilePath: /todo/stylelint.config.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
module.exports = {
    defaultSeverity: 'error',
    extends: ['stylelint-config-standard'],
    rules: {
        'declaration-block-semicolon-newline-after': 'always',
        indentation: [4],
        'declaration-no-important': true, // 强制不可以写 important 规则
    },
};
