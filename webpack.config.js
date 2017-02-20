var webpack = require('webpack');
var path = require('path');
module.exports = {
    devtool:'eval-source-map',
    entry:{
        main:'./src/main.js'
    },
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname, 'dist'),
        publicPath:'/'
    },
    resolve:{
        extensions:['*','.scss','.vue','.js'],
        alias:{
            vue:'vue/dist/vue.common.js'
        }
    },
    module:{
        rules:[{
            test:/\.js$/,
            loader:'babel-loader',
            exclude:/node_modules|dist/,
            options:{
                presets:['es2015']
            }
        },{
            test:/\.scss$/,
            exclude:/node_modules/,
            include:/src/,
            use:[{
                loader:'style-loader'
            },{
                loader:'css-loader'
            },{
                loader:'sass-loader'
            }]
        },{
            test:/\.vue$/,
            loader:'vue-loader'
        }]
    }
}