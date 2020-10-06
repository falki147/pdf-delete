const path = require("path");

module.exports = {
    mode: "development",
    context: __dirname,
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
