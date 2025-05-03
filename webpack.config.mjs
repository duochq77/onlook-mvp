import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';

// Sử dụng fileURLToPath để thay thế __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: './src/main.tsx',  // Tệp entry chính của ứng dụng
  mode: 'development',  // Hoặc 'production' tùy thuộc vào môi trường
  output: {
    path: path.resolve(__dirname, 'public'),  // Đầu ra sẽ nằm trong thư mục public
    filename: 'bundle.js',  // Tên của tệp bundle
    publicPath: '/',  // Đường dẫn mặc định
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],  // Hỗ trợ các tệp .tsx, .ts, .js
  },
  module: {
    rules: [
      // Cấu hình loader cho TypeScript
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Cấu hình loader cho CSS
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // Sử dụng HtmlWebpackPlugin để tạo tệp index.html
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // Sử dụng dotenv-webpack để hỗ trợ đọc các biến môi trường từ tệp .env
    new Dotenv(),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),  // Chỉ định thư mục chứa tệp tĩnh
    historyApiFallback: true,  // Đảm bảo các yêu cầu URL không tồn tại đều dẫn đến index.html (hỗ trợ React Router)
    port: 8080,  // Cổng server mặc định
  },
};
