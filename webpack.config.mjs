import path from 'path'
import { fileURLToPath } from 'url'
import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  entry: './src/main.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true, // ✅ xoá sạch dist trước mỗi lần build
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: './public',
    historyApiFallback: true, // ✅ hỗ trợ react-router-dom
    port: 8080,
    open: true,
  },
  plugins: [
    new Dotenv(), // ✅ hỗ trợ .env
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico', // ✅ nếu có
    }),
  ],
  experiments: {
    topLevelAwait: true, // ✅ hỗ trợ nếu bạn dùng await ngoài async fn
  },
}
