QBO Frontend v10 Improved - Deploy to Vercel
-------------------------------------------

Contents:
- package.json
- vite.config.js
- vercel.json
- index.html
- src/...
- public/

Install & test locally:
npm install
npm run dev
Build:
npm run build
Deploy to Vercel: Build command 'npm run build', output directory 'dist'.

Environment variables:
VITE_API_BASE - e.g. https://<your-backend>.onrender.com
VITE_RECEIPTS_API_KEY - secret key
VITE_USE_MOCK - 'true' to use included mock data for testing
