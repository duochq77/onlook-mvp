# Onlook MVP – Livestream Marketplace

🚀 **Onlook** là nền tảng mua bán livestream theo vị trí thực tế. Mỗi người bán là một "phòng Zoom" riêng (dùng LiveKit), người xem có thể vuốt để lướt qua các phiên livestream thực, giống TikTok nhưng có giỏ hàng và xác thực địa điểm.

---

## 🧠 Tính năng chính

- Mỗi seller tạo một phiên livestream độc lập với định vị GPS
- Viewer vuốt giữa các phòng giống TikTok, xem và đặt hàng trực tiếp
- Viewer có thể trở thành seller nếu ví đủ tiền
- Giỏ hàng, đơn hàng xử lý real-time
- Tích hợp Supabase (auth + DB) và LiveKit (livestream)
- Video có thể phát trực tiếp hoặc phát lại từ file

---

## ⚙️ Cài đặt & chạy dự án

```bash
git clone https://github.com/your-username/onlook-mvp.git
cd onlook-mvp
npm install

LIVEKIT_URL=wss://your.livekit.server
LIVEKIT_API_KEY=your-api-key
LIVEKIT_API_SECRET=your-secret

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

npm run start
# hoặc nếu dùng Webpack
npx webpack serve --mode development --open
├── api/
│   ├── viewer-token.ts
│   └── seller-token.ts
├── src/
│   ├── pages/
│   │   ├── ViewerPage.tsx
│   │   ├── SellerPage.tsx
│   │   └── LoginPage.tsx
│   ├── components/
│   │   ├── Cart.tsx
│   │   ├── ProductList.tsx
│   │   ├── LivestreamDirect.tsx
│   │   ├── VideoUploadRelay.tsx
│   │   └── LivestreamTypeSelector.tsx
│   └── utils/
│       ├── authUtils.ts
│       ├── saveTransaction.ts
│       └── useGPSUpdater.ts


Supabase – Auth + Database (PostgreSQL)

LiveKit – Livestream real-time (WebRTC)

React + TypeScript + TailwindCSS

Webpack / Vite tùy môi trường

Vercel (hoặc Render) để deploy

