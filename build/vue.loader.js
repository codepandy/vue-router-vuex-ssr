module.exports = (isDev) => {
    return {
        preserveWhitespace: true, // 去掉template模板中元素之间的空格
        extractCSS: isDev, // 提取样式，把vue文件中的css单独打包到文件中
        /*
         * 是否开启热加载，当修改内容时，无需刷新，页面就会显示最新的内容，
         * 但是如果使用了vue-styl-loader,即使关闭这个功能，修改样式，
         * 样式仍会是热更新，这是vue-style-loader的功能;
         * 可修改内容进行测试，这个功能关闭，还是需要手动刷新才会系那是最新内容
         */
        hotReload: false,
        cssModules: {
            // 定义的样式类名编译时会按下面的格式生成名字，这个是编译后生成的静态文件中使用的规则
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            /* 编译时，会把横岗连接的命名方式转换成骆驼命名法，方便在js中调用
             * 在项目通过module的方式使用css，需要在style标签上书架上module关键字，然后通过$style.className的方式调用
             * 如：.main-header{}  调用时：<div :style="$style.mainHeader"></div>
             * 这个配置的是，在vue开发中编译的结果。
             */
            camelCase: true,
        },
    }
};
