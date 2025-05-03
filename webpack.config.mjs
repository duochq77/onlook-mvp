import path from 'path';
import { fileURLToPath } from 'url';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: './src/main.tsx',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'public'), // ⬅ CHUYỂN VỀ public/
    filename: 'bundle.js',
    publicPath: '/', // phục vụ từ root /
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  devServer: {
    static: './public',
    historyApiFallback: true,
    port: 8080,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ],
};
