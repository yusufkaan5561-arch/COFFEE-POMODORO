# Kesin çalışan deploy — localhost ile aynı site

## Yöntem 1: Vercel (en garantisi, 2 dakika)

1. **https://vercel.com** → Giriş yap → **Add New** → **Project**
2. **Import Git Repository** → `yusufkaan5561-arch/KAHVE-POMODORO` seç (GitHub’dan)
3. **Configure:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - **Deploy**’a bas
4. Birkaç dakika sonra site canlı olur (örn. `kahve-pomodoro-xxx.vercel.app`)
5. Özel domain: Project → **Settings** → **Domains** → `coffeepomodoroyukaancz.com` ekle, DNS’te Vercel’in verdiği kaydı kullan

Bu yöntemle site localhost’taki gibi çalışır.

---

## Yöntem 2: Netlify

1. **https://netlify.com** → **Add new site** → **Import an existing project**
2. GitHub → `KAHVE-POMODORO` seç
3. Build command: `npm run build`, Publish directory: `dist` (netlify.toml zaten var)
4. **Deploy** → Özel domain: Site settings → Domain management

---

## Yöntem 3: GitHub Pages (Actions)

1. Repo → **Settings** → **Pages**
2. **Build and deployment** → **Source**: **GitHub Actions** seçin (branch değil)
3. **main** branch’e push edin; Actions’ta “Deploy to GitHub Pages” workflow’u çalışsın
4. Adres: **https://yusufkaan5561-arch.github.io/KAHVE-POMODORO/**  
   Özel domain bağlıysa: **https://coffeepomodoroyukaancz.com**

Eğer site hâlâ boş/bozuksa:
- **Actions** sekmesinde workflow’a tıklayıp **Build** adımının yeşil olduğundan emin olun
- Pages → Source’un **GitHub Actions** olduğunu bir daha kontrol edin
- Tarayıcıda **Ctrl+Shift+R** (sert yenile) veya gizli pencerede deneyin
