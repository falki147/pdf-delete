const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    context: __dirname,
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'assets' }
            ]
        })
    ],
    entry: {
        "main": "./src/index.js"
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [ "style-loader", "css-loader", "sass-loader" ]
            },
        ],
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js",
    }
};
