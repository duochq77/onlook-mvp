/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'], // nếu bạn dùng ảnh thumbnail giả lập
  },
}

module.exports = nextConfig
