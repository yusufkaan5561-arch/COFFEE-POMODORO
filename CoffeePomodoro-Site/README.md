# ☕ Coffee Pomodoro

Kahve temalı Pomodoro uygulaması. Çalışma ve mola sürelerini ayarlayabilir, 100 odak müziği seçeneği, süre bitince bildirim. Süre kahve bardağında azalarak gösterilir.

**Site:** [coffeepomodoroyukaancz.com](https://coffeepomodoroyukaancz.com)

## Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` (veya gösterilen port) açılır.

## Build

```bash
npm run build
npm run preview   # üretim önizlemesi
```

## Deploy (yayına alma) — localhost gibi çalışması için

Site sadece **derlenmiş (build) hali** ile çalışır. Sadece kodu push etmek yetmez; sunucunun `npm run build` yapıp **dist/** klasörünü yayınlaması gerekir.

### Seçenek 1: GitHub Pages (otomatik build)

1. Repo → **Settings** → **Pages** → **Source**: **GitHub Actions** seçin.
2. `main` branch'e push edin; workflow projeyi build edip yayınlar.
3. Adres: `https://yusufkaan5561-arch.github.io/KAHVE-POMODORO/`
4. **Özel domain** (coffeepomodoroyukaancz.com) kullanıyorsan: `.github/workflows/deploy.yml` içinde `VITE_BASE_PATH: "/KAHVE-POMODORO/"` satırını `VITE_BASE_PATH: "/"` yapın, tekrar push edin.

### Seçenek 2: Vercel veya Netlify

1. [vercel.com](https://vercel.com) veya [netlify.com](https://netlify.com) → GitHub repo'yu bağlayın.
2. Build command: `npm run build`, Output directory: `dist`.
3. Deploy'a basın; adres otomatik verilir (özel domain de eklenebilir).

## Teknolojiler

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
