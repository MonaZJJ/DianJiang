const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const webpack = require('webpack')
module.exports = {
    // 输出文件目录
    outputDir: 'dist',
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer({
                        browsers: ['Android >= 4.0', 'iOS >= 8']
                    }),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                'static': '../static',
                'views': '@/views',
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    }
};