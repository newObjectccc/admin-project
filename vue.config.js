
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
// const BASE_URL = process.env.NODE_ENV === 'production'
//   ? '/admin/'
//   : '/'
//   const path = require('path')


module.exports = {
    // publicPath: '/adminweb/',
	lintOnSave: false,
    devServer: {
        host: "0.0.0.0",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://www.ectlife.com/' // 配置跨域处理,只有一个代理

        // 配置多个代理
        // proxy: {
        //     "/api": {
        //         target: "https://www.ectlife.com/admin", // 要访问的接口域名
        //         // ws: true, // 是否启用websockets
        //         changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        //         pathRewrite: {
        //             "^/api": "" //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        //         }
        //     }
        // }
    }
}
