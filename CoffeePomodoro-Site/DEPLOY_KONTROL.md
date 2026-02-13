# Deploy sonrası site localhost gibi değilse

1. **GitHub repo → Settings → Pages**
   - **Source** mutlaka **"GitHub Actions"** olsun (Deploy from a branch değil).

2. **Actions sekmesi**
   - Son workflow (Deploy to GitHub Pages) yeşil tik ile bitti mi?
   - Kırmızıysa tıklayıp hata mesajına bakın.

3. **Adres**
   - Özel domain (coffeepomodoroyukaancz.com): VITE_BASE_PATH zaten `/` — doğru.
   - Sadece `username.github.io/KAHVE-POMODORO` kullanıyorsanız: `.github/workflows/deploy.yml` içinde `VITE_BASE_PATH: "/"` satırını `VITE_BASE_PATH: "/KAHVE-POMODORO/"` yapıp tekrar push edin.

4. **Önbellek**
   - Tarayıcıda Ctrl+Shift+R (sert yenile) veya farklı gizli pencerede deneyin.
