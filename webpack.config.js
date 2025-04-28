import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack'; // ✅ Thêm dòng này

export default {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv(), // ✅ Thêm plugin này để webpack đọc biến môi trường
  ],
  devServer: {
    historyApiFallback: true,
    port: 8080,
  },
  mode: 'development',
};
