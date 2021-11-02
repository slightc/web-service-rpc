// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */

module.exports = {
    outputDir: '../../out/web/vue-hello', // 将内容输出到vscode文件夹
    devServer: {
        hot: false,  // 避免生成 hot-update.js
        writeToDisk: true, // run start 时候也将文件输出
    },
    css: {
        extract: true, // 需要独立将css输入，不能内嵌js中
    }
}