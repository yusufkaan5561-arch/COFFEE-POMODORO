# ☕ Coffee Pomodoro

Kahve temalı Pomodoro uygulaması. Çalışma ve mola sürelerini ayarlayabilir, 100 odak müziği seçeneği, süre bitince bildirim. Süre kahve bardağında azalarak gösterilir.

**Site:** [coffeepomodoroyukaancz.com](https://coffeepomodoroyukaancz.com)

---

## Ne yapmam gerekiyor? (Push + siteyi çalıştır)

1. **GitHub'a push:** Kendi Terminal'inde: `cd ~/Desktop/CoffeePomodoro-Site` → `git push -u origin main` (şifre yerine [Personal Access Token](https://github.com/settings/tokens) kullan).
2. **Siteyi yayınla:** [Vercel](https://vercel.com) → Import **KAHVE-POMODORO** repo → Deploy (2 dk).  
   Adım adım: proje kökündeki **`PUSH_VE_CALISTIR.md`** dosyasını aç.

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

## Deploy — site localhost gibi çalışsın

**Kesin çalışan adımlar:** Proje kökündeki **`KESIN_COZUM.md`** dosyasını okuyun. En garantisi **Vercel** (2 dakika, aynen localhost gibi).

Site sadece **derlenmiş (build) hali** ile çalışır; sunucunun `npm run build` yapıp **dist/** yayınlaması gerekir.

### Seçenek 1: Vercel (önerilen)
- vercel.com → Import repo → Build: `npm run build`, Output: `dist` → Deploy. Bitti.

### Seçenek 2: GitHub Pages (otomatik build)

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
