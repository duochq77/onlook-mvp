# Onlook Token Server

🔐 Backend dùng để cấp token JWT cho người bán và người xem livestream thông qua [LiveKit](https://livekit.io/).  
Được dùng bởi frontend của dự án Onlook tại: [https://onlookmarket.live](https://onlookmarket.live)

---

## 📦 Công nghệ sử dụng

- Node.js + ExpressJS
- `livekit-server-sdk` để sinh token JWT
- Triển khai tại [Render.com](https://render.com)

---

## 📁 Cấu trúc

```bash
onlook-token-server/
├── server.mjs           # File chính
├── .env                 # Biến môi trường (KHÔNG commit lên Git)
├── package.json
└── README.md            # (file này)
npm install
LIVEKIT_API_KEY=APILXA75pngcAFT
LIVEKIT_API_SECRET=pJecuBclk2mPiWFVu8JFI6vk2ZEcRr1bUplZI67ZHSJ
LIVEKIT_URL=wss://onlook-dev-zvm78p9y.livekit.cloud
node server.mjs
http://localhost:3001
GET /api/seller-token?room=a
GET /api/viewer-token?room=a
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
☁️ Triển khai tại Render
Link: https://onlook-token-server.onrender.com

Render tự động restart nếu có commit mới

fetch("https://onlook-token-server.onrender.com/api/seller-token?room=a")

---

## 📍 Cách dùng

1. Lưu file này thành `README.md` trong thư mục backend (chứa `server.mjs`)
2. Khi bạn push backend lên GitHub, nội dung sẽ hiển thị rõ ràng

---

Bạn có muốn mình gộp 2 file `README.md` frontend và backend vào repo chính và tổ chức lại thư mục theo dạng `apps/frontend`, `apps/backend` để dễ quản lý sau này không?
onlook/
├── apps/
│   ├── frontend/            # React Web (Webpack + LiveKit)
│   │   ├── src/
│   │   ├── public/
│   │   ├── .env             # chỉ chứa VITE_...
│   │   ├── package.json
│   │   ├── webpack.config.mjs
│   │   └── README.md        ✅ Hướng dẫn frontend
│   └── backend/             # Token Server (Express)
│       ├── server.mjs
│       ├── .env             # chứa API_KEY, SECRET
│       ├── package.json
│       └── README.md        ✅ Hướng dẫn backend
├── README.md                ✅ Tổng quan toàn hệ thống
├── .gitignore
└── docs/                    (tuỳ chọn – sơ đồ, media, tài liệu khác)
# Onlook – Hệ thống thương mại livestream có định vị thật

📦 Dự án gồm 2 phần:
- `apps/frontend`: giao diện người dùng (React + LiveKit)
- `apps/backend`: token server dùng để cấp quyền truy cập LiveKit (Express)

---

## 🧭 Hướng dẫn chạy local

```bash
# 1. Cài frontend
cd apps/frontend
npm install
npm run start

# 2. Cài backend
cd ../backend
npm install
node server.mjs

---

## ✅ `apps/frontend/README.md`

```markdown
# Onlook Frontend (React + Webpack)

---

## ⚙️ Công nghệ

- React + TypeScript
- Webpack 5
- LiveKit Components
- Triển khai trên Vercel

---

## 🔧 Cài đặt

```bash
npm install
npm run start

---

## ✅ `apps/backend/README.md`

```markdown
# Onlook Token Server (Express)

Cấp token JWT cho người dùng thông qua LiveKit Cloud.

---

## 🔧 Cài đặt & chạy local

```bash
npm install
node server.mjs

---

## ✅ .gitignore (đặt ở gốc)

```gitignore
.env
node_modules/
dist/
