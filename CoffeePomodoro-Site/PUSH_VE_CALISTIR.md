# GitHub'a push edip siteyi çalıştırma

Bu dosyadaki adımları **kendi bilgisayarında Terminal**'de uygula. Cursor içinden push yapılamıyor (GitHub girişi gerekiyor).

---

## 1. GitHub'a push (bir kez)

Terminal'i aç ve şunları çalıştır:

```bash
cd ~/Desktop/CoffeePomodoro-Site
git push -u origin main
```

- **Şifre/token sorarsa:** GitHub artık şifre kabul etmiyor. **Personal Access Token** kullan:
  1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**
  2. `repo` kutusunu işaretle, token'ı kopyala
  3. `git push` çalıştırdığında **Username:** GitHub kullanıcı adın, **Password:** yapıştırdığın token

- **SSH kullanıyorsan:** Önce remote'u SSH yap:
  ```bash
  git remote set-url origin git@github.com:yusufkaan5561-arch/KAHVE-POMODORO.git
  git push -u origin main
  ```

Push başarılı olunca kod GitHub'da olur.

---

## 2. Siteyi yayına alma (çalıştırma)

İki seçenek:

### A) Vercel (en kolay, 2 dk)

1. [vercel.com](https://vercel.com) → GitHub ile giriş
2. **Add New** → **Project** → **KAHVE-POMODORO** reposunu seç
3. **Deploy** (Build: `npm run build`, Output: `dist` zaten ayarlı)
4. Bitti. Sana verilen linkte site localhost gibi çalışır.

### B) GitHub Pages

1. Repo sayfasında **Settings** → **Pages**
2. **Source:** **GitHub Actions** seç
3. Zaten push ettin; birkaç dakika içinde **Actions** sekmesinde workflow biter
4. Site: `https://yusufkaan5561-arch.github.io/KAHVE-POMODORO/`

---

## Özet

| Ne yapacaksın | Komut / adım |
|---------------|----------------|
| Push          | `cd ~/Desktop/CoffeePomodoro-Site` → `git push -u origin main` (token veya SSH gerekir) |
| Siteyi aç     | Vercel'de repo import et **veya** GitHub Pages → Source: GitHub Actions |

Detaylı deploy: **KESIN_COZUM.md**
