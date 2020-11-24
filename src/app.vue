<!--
 * @Author: Clloz
 * @Date: 2020-11-08 19:28:53
 * @LastEditTime: 2020-11-16 16:58:45
 * @LastEditors: Clloz
 * @Description: 
 * @FilePath: /todo/src/app.vue
 * @symbol_custom_string_obkoro1: 博观而约取，厚积而薄发，日拱一卒，日进一寸。
-->
<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './layout/header.vue';
import Footer from './layout/footer.jsx';
import Todo from './views/todo/todo.vue';

export default {
    components: {
        Header,
        Footer,
        Todo,
    },
};
</script>
<style lang="less" scoped>
#text {
    color: red;
}
</style>
