var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './server.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },/*,
    resolve: {
        extensions: ['.js', '.marko', '.json'],
        modules: ["./", "node_modules"]
    },*/
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    'babel-loader',
                    'eslint-loader'
                ],
                exclude: /node_modules/,
                include: [path.join(__dirname, 'src')]
            },
            {
                test: /\.css$/,
                exclude: /bootstrap/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!postcss-loader'
                })
            },
            {
                test: /\.scss$/,
                exclude: /bootstrap/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!postcss-loader!sass-loader'
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000"
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: 'file-loader'
            },



            { test: /\.marko$/, loader: 'marko-loader', query: { target: 'server' } },
            {
                test: /\.(less|css)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader"
                })
            }
        ]
    },
    plugins: [
        // Write out CSS bundle to its own file:
        new ExtractTextPlugin({ filename: 'static/bundle.css', allChunks: true })
    ],
    target: 'node'
};