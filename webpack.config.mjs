import path from 'path';
import { fileURLToPath } from 'url';
import Dotenv from 'dotenv-webpack'; // 🧩 Load biến môi trường từ .env

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: './src/main.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // 🔁 Quan trọng để SPA hoạt động đúng
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
    historyApiFallback: true, // 🧭 Cho phép React Router hoạt động
    port: 8080,
  },
  plugins: [
    new Dotenv() // ✅ Tự động inject biến từ file .env vào process.env
  ],
};
