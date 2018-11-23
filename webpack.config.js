var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname, "app");
var DEST_PATH = path.resolve(__dirname, 'dist');

//生成version.json
function WebpackVersionHashPlugin(opts) {
    this.options = Object.assign({ filename: 'version.json', include_date: true }, opts)
}
WebpackVersionHashPlugin.prototype.apply = function apply(compiler) {
    const filename = this.options.filename;
    compiler.plugin('emit', (compilation, callback) => {
    const version = {
        hash: compilation.hash,
    }
    if (this.options.include_date) {
        version.date = new Date().toLocaleString()
    }
    const file = JSON.stringify(version, null, 2)
    compilation.assets[filename] = { /* eslint no-param-reassign: 0 */
        source: () => file,
        size: () => file.length,
    }
    callback()
    })
};

module.exports = {

    resolve: {
        alias: { 
        }
    },

    context: ROOT_PATH,

    entry: {
        'main' : './main.js'
    },
    output: {
        path: DEST_PATH,
        filename: './[name].js'
    },

    devServer:{
        contentBase: 'app/',
        hot: true,
        inline: true,
        port: 8080,
        disableHostCheck: true,
        proxy: {  
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            //title: "",
            template: "index.html",
            filename: "index.html",
            hash: true,
            inject: true,
            chunks:['main']
        }),
        new WebpackVersionHashPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets : ['es2015', 'react', 'stage-0']
                        }
                    }
                ]
            },

            {test : /\.(css|scss)$/, use : ['style-loader', 'css-loader', 'sass-loader']},
            
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                        loader: 'url-loader',
                        options: {
                            limit : 8192,
                            name : 'img/cssimg/[name].[ext]'
                        }
                    }

            }
        ]
    }
};
