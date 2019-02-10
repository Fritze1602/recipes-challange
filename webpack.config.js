const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'
    return {
        entry: {
            index: ['@babel/polyfill', './src/scripts/index.js'],
            edit: ['@babel/polyfill', './src/scripts/edit.js'],
        },
        output: {
            path: path.resolve(__dirname, 'public/scripts'),
            filename: '[name]-bundle.js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 2 } },
                    'resolve-url-loader',
                    'sass-loader',
                ],
            }
            ]
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'public'),
            publicPath: '/scripts/'
        },
        devtool: 'source-map',
        plugins: [
            new MiniCssExtractPlugin({
                filename: '../styles/[name].css',
                chunkFilename: '../styles/[id].css'
            })
        ]
    }
}