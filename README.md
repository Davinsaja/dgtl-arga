# 🕌 Undangan Digital Khitan Premium

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

**Website undangan digital khitan yang mewah, elegan, modern, dan bernuansa Islami premium.**  
Dibangun menggunakan arsitektur full-stack modern: React 19 + Vite (frontend) & Express.js (backend).

</div>

---

## ✨ Fitur Utama

| No | Fitur | Deskripsi |
|----|-------|-----------|
| 1 | 🌟 **Splash Screen Premium** | Animasi logo bintang khitan Islami berputar dengan loading bar dinamis |
| 2 | 💌 **Cover Amplop Personalisasi** | Nama penerima otomatis terbaca dari URL query (`?to=Nama+Tamu`) |
| 3 | 📖 **Ayat & Doa Islami** | Pembuka kalam ilahi QS. As-Saffat: 100 dengan terjemahan bahasa Indonesia |
| 4 | ⏱️ **Countdown Real-time** | Hitung mundur otomatis ke hari H, beralih ke teks syukuran setelah hari H lewat |
| 5 | 📅 **Detail Jadwal & Agenda** | Informasi lengkap rangkaian prosesi (Syukuran, Khitanan, Resepsi) |
| 6 | 🗺️ **Peta & QR Code** | Integrasi Google Maps responsif + QR Code dinamis yang bisa dipindai |
| 7 | 🖼️ **Galeri Foto** | Susunan foto responsif dengan efek Lightbox premium |
| 8 | 🎁 **Kado Digital** | Papan rekening & e-wallet dengan tombol Salin + notifikasi Toast instan |
| 9 | 📝 **RSVP & Buku Tamu** | Konfirmasi kehadiran real-time tersimpan di backend (file JSON / Firebase) |
| 10 | 🎵 **Pemutar Musik Floating** | Musik pengiring otomatis + kontrol play/pause, seek bar, dan volume |
| 11 | 🎊 **Efek Confetti** | Animasi konfeti perayaan saat tamu membuka undangan |

---

## 🛠️ Teknologi yang Digunakan

### Frontend
- **[React 19](https://react.dev/)** — Library UI modern
- **[TypeScript 5.8](https://www.typescriptlang.org/)** — Static typing untuk kode yang aman
- **[Vite 6](https://vitejs.dev/)** — Build tool super cepat dengan HMR
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first CSS framework
- **[Motion (Framer Motion)](https://motion.dev/)** — Library animasi premium
- **[Lucide React](https://lucide.dev/)** — Ikon modern yang ringan
- **[canvas-confetti](https://www.npmjs.com/package/canvas-confetti)** — Efek konfeti
- **[react-qr-code](https://www.npmjs.com/package/react-qr-code)** — Generator QR Code dinamis

### Backend
- **[Express.js 4](https://expressjs.com/)** — Server web minimalis untuk Node.js
- **[Firebase 12](https://firebase.google.com/)** — Realtime database & backend services
- **[tsx](https://github.com/privatenumber/tsx)** — TypeScript executor untuk Node.js
- **[esbuild](https://esbuild.github.io/)** — Bundler production ultra-cepat
- **[dotenv](https://www.npmjs.com/package/dotenv)** — Manajemen environment variables

---

## 📁 Struktur Proyek

```
undangan-digital/
├── 📄 index.html              # Entry point HTML
├── 📄 server.ts               # Server Express.js (backend + API RSVP)
├── 📄 vite.config.ts          # Konfigurasi Vite
├── 📄 tsconfig.json           # Konfigurasi TypeScript
├── 📄 package.json            # Dependencies & scripts
├── 📄 .env.example            # Template environment variables
├── 📁 src/
│   ├── 📄 App.tsx             # Komponen utama & routing halaman
│   ├── 📄 main.tsx            # Entry point React
│   ├── 📄 index.css           # Global styles & tema warna (Tailwind v4)
│   ├── 📄 types.ts            # TypeScript type definitions
│   ├── 📁 config/
│   │   └── 📄 site.ts         # ⭐ FILE KONFIGURASI UTAMA (ubah di sini!)
│   ├── 📁 components/
│   │   ├── 📄 SplashScreen.tsx    # Layar loading animasi
│   │   ├── 📄 Cover.tsx           # Halaman cover amplop
│   │   ├── 📄 Hero.tsx            # Halaman utama dengan info anak
│   │   ├── 📄 Countdown.tsx       # Hitung mundur acara
│   │   ├── 📄 AcaraHighlight.tsx  # Highlight rangkaian acara
│   │   ├── 📄 DetailAcara.tsx     # Detail jadwal & lokasi
│   │   ├── 📄 GoogleMaps.tsx      # Peta lokasi & QR Code
│   │   ├── 📄 Gallery.tsx         # Galeri foto dengan Lightbox
│   │   ├── 📄 Gift.tsx            # Kado digital / rekening
│   │   ├── 📄 RSVPForm.tsx        # Form konfirmasi kehadiran
│   │   ├── 📄 BukuTamu.tsx        # Buku tamu & komentar
│   │   ├── 📄 AudioPlayer.tsx     # Pemutar musik floating
│   │   ├── 📄 ConfettiEffect.tsx  # Efek konfeti
│   │   ├── 📄 BookDecoration.tsx  # Dekorasi ornamen buku
│   │   └── 📄 PremiumOrnaments.tsx # Ornamen Islami dekoratif
│   └── 📁 lib/                # Utility & helper functions
├── 📁 public/
│   ├── 📁 music/              # Simpan file audio MP3 lokal di sini
│   └── 📁 gallery/            # Simpan foto galeri lokal di sini
└── 📁 data/
    └── 📄 rsvps.json          # Database RSVP (auto-generated)
```

---

## 🚀 Cara Menjalankan Secara Lokal

### Prasyarat

Pastikan sudah terinstall:
- **[Node.js](https://nodejs.org/)** versi **18 atau lebih baru**
- **npm** (sudah termasuk saat install Node.js)

Cek versi Node.js Anda:
```bash
node --version
```

### Langkah Instalasi

**1. Clone atau download repositori ini**
```bash
git clone https://github.com/username/undangan-digital.git
cd undangan-digital
```

Atau ekstrak file ZIP ke folder pilihan Anda, lalu buka terminal di folder tersebut.

**2. Install semua dependency**
```bash
npm install
```

**3. Salin file environment variables**
```bash
# Windows (Command Prompt)
copy .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env

# Linux / macOS
cp .env.example .env
```

**4. Isi konfigurasi Firebase** di file `.env` (lihat bagian [Konfigurasi Firebase](#-konfigurasi-firebase))

**5. Jalankan server development**
```bash
npm run dev
```

**6. Buka browser dan kunjungi:**
```
http://localhost:3000
```

> 💡 **Tips**: Tambahkan `?to=Nama+Tamu` di URL untuk melihat fitur personalisasi nama tamu.  
> Contoh: `http://localhost:3000?to=Keluarga+Budi+Santoso`

---

## ⚙️ Panduan Kustomisasi

> **Semua konfigurasi terpusat di satu file:** `/src/config/site.ts`  
> Anda **tidak perlu menyentuh file komponen lainnya** untuk mengubah konten undangan.

### 1. 👶 Mengubah Data Anak & Keluarga

```typescript
// src/config/site.ts
child: {
  fullName: "Arganta Humayun",         // Nama lengkap anak
  nickName: "Arga",                    // Nama panggilan
  grade: "Kelas 5 SD",                // Kelas / tingkatan
  fatherName: "Sarif Imron Wakhidin", // Nama ayah
  motherName: "Riawati",               // Nama ibu
  photo: "/gallery/foto-anak.jpg",     // URL atau path foto profil anak
  objectPosition: "center top"         // Posisi fokus foto (CSS object-position)
}
```

### 2. 📅 Mengubah Data Acara

```typescript
event: {
  days: ["Rabu", "Kamis", "Jumat"],              // Hari-hari acara
  datesString: "5 - 7 Agustus 2026",             // Teks tanggal untuk tampilan
  countdownDate: "2026-08-05T00:00:00+07:00",    // Tanggal target countdown (ISO)
  timeString: "08.00 WIB - Selesai",              // Waktu acara (opsional)
  address: {
    rtRw: "RT 002 RW 003",
    dusun: "Dusun II Pegandekan",
    desa: "Pegandekan",
    kecamatan: "Kemangkon",
    kabupaten: "Purbalingga",
    provinsi: "Jawa Tengah",
    fullText: "Alamat lengkap satu baris..."
  },
  googleMapsLink: "https://maps.app.goo.gl/xxxxx",  // Link share Google Maps
  googleMapsEmbedSrc: "https://www.google.com/maps/embed?...", // Embed iframe Maps
  whatsappRsvp: "08123456789",           // No. WhatsApp untuk konfirmasi
  invitingFamily: "Bapak X dan Keluarga", // Nama keluarga pengundang
  turutMengundang: ["Nama Kakek/Nenek"]  // Daftar turut mengundang (opsional)
}
```

> **Cara mendapatkan Google Maps Embed URL:**
> 1. Buka [Google Maps](https://maps.google.com) dan cari lokasi Anda
> 2. Klik **Share** → pilih tab **Embed a map**
> 3. Salin URL yang ada di dalam atribut `src="..."` dari kode iframe

### 3. 📖 Mengubah Ayat / Doa Islami

```typescript
ayat: {
  arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
  translation: "Ya Rabbku, anugerahkanlah kepadaku (seorang anak) yang termasuk orang-orang yang sholeh.",
  source: "QS. As-Saffat: 100"
}
```

### 4. 🎁 Mengubah Rekening & Kado Digital

```typescript
gifts: [
  {
    id: "bank-1",            // ID unik (bebas diisi apa saja)
    type: "bank",            // "bank" atau "wallet" (e-wallet)
    name: "Bank BRI",        // Nama bank / e-wallet (DANA, OVO, GoPay, dll)
    number: "1234567890",    // Nomor rekening / nomor HP e-wallet
    holder: "NAMA PEMILIK"   // Nama pemilik rekening
  },
  {
    id: "wallet-1",
    type: "wallet",
    name: "DANA",
    number: "08123456789",
    holder: "NAMA PEMILIK"
  }
  // Tambahkan lebih banyak entri sesuai kebutuhan
]
```

### 5. 🎵 Mengubah Musik Latar

```typescript
music: {
  url: "https://link-ke-file-audio.mp3",          // URL utama musik
  fallbackUrl: "https://link-backup-audio.mp3",   // URL cadangan
  title: "Judul Lagu"                             // Judul yang ditampilkan
}
```

**Menggunakan file lokal:**
1. Taruh file MP3 di folder `/public/music/` (misal: `bgm.mp3`)
2. Ubah `url` menjadi `"/music/bgm.mp3"`

### 6. 🖼️ Mengubah Galeri Foto

```typescript
gallery: {
  images: [
    // Dengan posisi foto custom:
    { url: "/gallery/foto1.jpg", position: "center top" },
    { url: "/gallery/foto2.jpg", position: "center center" },

    // Atau hanya URL (posisi default = center):
    "https://link-foto-eksternal.com/foto.jpg"
  ]
}
```

**Menggunakan file lokal:**
1. Taruh foto di folder `/public/gallery/`
2. Daftarkan dengan path `/gallery/foto1.jpg`

### 7. 🎨 Mengubah Tema Warna

Warna dikonfigurasi melalui variabel CSS di `/src/index.css`:

```css
@theme {
  --color-primary: #0F766E;   /* Warna utama (Emerald) */
  --color-secondary: #D4AF37; /* Warna aksen (Champagne Gold) */
  --color-ivory: #FAFAF7;     /* Warna latar utama */
  --color-cream: #F5F1E8;     /* Warna latar sekunder */
}
```

Cukup ganti nilai hex tersebut, dan seluruh tampilan website akan berubah secara otomatis.

---

## 🔥 Konfigurasi Firebase

Firebase digunakan untuk fitur buku tamu real-time dan penyimpanan data RSVP.

### Langkah Setup Firebase:

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Buat project baru atau gunakan project yang sudah ada
3. Masuk ke **Project Settings** → **General** → scroll ke bagian **Your apps**
4. Klik ikon Web (`</>`) untuk menambahkan Web App
5. Salin kredensial yang muncul ke file `.env` Anda:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=nama-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=nama-project
VITE_FIREBASE_STORAGE_BUCKET=nama-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

> ⚠️ **Penting**: Jangan pernah commit file `.env` ke GitHub! File ini sudah ada di `.gitignore`.

---

## 📡 API Endpoints (Backend)

Server Express.js menyediakan REST API berikut untuk fitur Buku Tamu & RSVP:

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/rsvps` | Ambil semua data RSVP (diurutkan terbaru) |
| `POST` | `/api/rsvps` | Tambah RSVP baru |
| `PUT` | `/api/rsvps/:id` | Edit data RSVP (hanya pemilik) |
| `DELETE` | `/api/rsvps/:id` | Hapus RSVP (hanya pemilik) |
| `POST` | `/api/rsvps/:id/like` | Like / unlike ucapan |
| `POST` | `/api/rsvps/:id/reply` | Tambah balasan komentar |
| `PUT` | `/api/rsvps/:rsvpId/reply/:replyId` | Edit balasan komentar |
| `DELETE` | `/api/rsvps/:rsvpId/reply/:replyId` | Hapus balasan komentar |

**Contoh request POST `/api/rsvps`:**
```json
{
  "name": "Keluarga Budi",
  "presence": "hadir",
  "wish": "Selamat ya, semoga acaranya berjalan lancar!"
}
```

---

## 📜 Scripts NPM

```bash
# Menjalankan server development (frontend + backend sekaligus)
npm run dev

# Build untuk production
npm run build

# Menjalankan server production (setelah build)
npm run start

# Type-check TypeScript tanpa kompilasi
npm run lint

# Hapus folder dist
npm run clean
```

---

## 🌐 Panduan Deploy

### ☁️ Pilihan 1: Deploy ke Railway / Render / Fly.io (Rekomendasi)

Platform ini mendukung Node.js server secara langsung:

1. Push kode ke GitHub
2. Buat akun di [Railway](https://railway.app) / [Render](https://render.com)
3. Hubungkan ke repositori GitHub Anda
4. Tambahkan environment variables dari file `.env`
5. Set **Start Command** ke: `npm run start`
6. Set **Build Command** ke: `npm run build`

### ☁️ Pilihan 2: Deploy ke Vercel

Buat file `vercel.json` di root folder:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server.ts" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

Kemudian deploy:
```bash
npx vercel --prod
```

### 🐳 Pilihan 3: Docker / Cloud Run

**1. Build production bundle:**
```bash
npm run build
```

**2. Jalankan production server:**
```bash
npm run start
```

Server berjalan di `http://0.0.0.0:3000`

**Contoh Dockerfile:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
```

---

## 🔗 URL Personalisasi Tamu

Website mendukung **personalisasi nama tamu** melalui URL query parameter `?to=`:

```
https://undangan-anda.com?to=Keluarga+Budi+Santoso
https://undangan-anda.com?to=Bapak+dan+Ibu+Rahmat
```

Nama tamu akan otomatis tampil di halaman cover amplop.  
Sangat cocok untuk dikirim via **WhatsApp, pesan singkat, atau QR Code unik per tamu**.

---

## 📋 Checklist Sebelum Upload ke GitHub

- [ ] Isi file `.env` dari `.env.example` dan pastikan **tidak ikut di-commit**
- [ ] Pastikan `.gitignore` sudah include `.env` dan `node_modules/`
- [ ] Ganti konten di `src/config/site.ts` sesuai data acara Anda
- [ ] Ganti foto profil, cover, dan galeri
- [ ] Ganti musik latar sesuai keinginan
- [ ] Test fitur RSVP dan buku tamu
- [ ] Test di mobile / perangkat lain
- [ ] Build production dan test: `npm run build && npm run start`

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan undangan digital pribadi.  
Silakan fork dan kustomisasi sesuai kebutuhan Anda.

---

<div align="center">

**Dibuat dengan ❤️ menggunakan React + TypeScript + Express**

*Selamat berbahagia dan semoga acara khitanan ananda berjalan lancar penuh keberkahan!* 🌙

</div>
