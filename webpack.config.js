module.exports = {
  entry: './main.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-transform-react-jsx", {
                "pragma": "Toy.createElement", // default pragma is React.createElement
              }]
            ],
          }
        }
      }
    ],
  }
};