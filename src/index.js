/*
 * @Author: Clloz
 * @Date: 2020-11-08 20:18:16
 * @LastEditTime: 2020-11-16 17:09:13
 * @LastEditors: Clloz
 * @Description:
 * @FilePath: /todo/src/index.js
 * @symbol_custom_string_obkoro1: 博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
import Vue from 'vue';
import App from './app.vue';
import './assets/images/bg.jpg';
import './assets/styles/globel.less';

console.log(234);

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
    render: h => h(App),
}).$mount(root);
