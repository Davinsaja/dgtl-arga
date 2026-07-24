# Undangan Digital Khitan Premium - Arganta Humayun (Arga)

Website undangan digital khitan mewah, elegan, modern, dan bernuansa Islami premium yang dirancang menggunakan **React 19, Vite, Express (Full-stack), Tailwind CSS v4, dan Framer Motion (`motion/react`)**.

---

## 🌟 Fitur Utama

1. **Splash Screen Premium**: Animasi logo bintang khitan Islami berputar mewah dengan bar pemuatan dinamis.
2. **Cover Envelope personalized**: Fitur pembuka amplop dengan nama penerima otomatis dibaca aman dari URL query parameter (misal: `?to=Keluarga%20Budi%20Santoso`).
3. **Pemberitahuan & Doa Islami**: Pembuka kalam ilahi surah As-Saffat ayat 100 dengan terjemahan bahasa Indonesia yang anggun.
4. **Countdown Real-time**: Hitung mundur otomatis menuju Rabu, 5 Agustus 2026. Transisi otomatis ke teks *"Alhamdulillah seluruh rangkaian acara khitan telah berlangsung"* saat hari H terlewati.
5. **Detail Jadwal & Agenda**: Informasi lengkap rangkaian prosesi (Syukuran, Khitanan, Resepsi) lengkap dengan waktu dan alamat kediaman.
6. **Timeline Rangkaian Kegiatan**: Tata urutan jam acara per-hari terstruktur rapi.
7. **Peta Navigasi & QR Code**: Integrasi Google Maps responsif beserta QR Code dinamis yang dapat langsung dipindai menggunakan smartphone.
8. **Galeri Momen Bahagia**: Susunan foto responsif dilengkapi efek Lightbox premium saat foto diperbesar.
9. **Kado Digital (Digital Gifting)**: Papan rekening & e-wallet aman (disembunyikan dari source code langsung) dilengkapi dengan tombol **Salin** dan notifikasi Toast instan.
10. **RSVP & Buku Tamu Real-time**: Kolom konfirmasi kehadiran yang terhubung langsung dengan backend server Express, menyimpan data ke database file (`data/rsvps.json`) dan ter-update secara real-time saat tamu mengirimkan ucapan.
11. **Sistem Pengendali Musik (Floating Backsound)**: Musik pengiring soft instrumental lute (Oud & Flute) yang berputar otomatis sesaat setelah amplop dibuka, dilengkapi tombol kontrol play/pause, seek progress bar, dan volume penggeser.

---

## 🛠️ Cara Menjalankan Aplikasi Secara Lokal

### Prasyarat
- Node.js versi 18 ke atas
- NPM atau Yarn

### Langkah Instalasi
1. Ekstrak file ZIP atau clone repositori ini ke komputer Anda.
2. Buka terminal atau Command Prompt pada folder root project.
3. Jalankan perintah instalasi dependency:
   ```bash
   npm install
   ```
4. Jalankan aplikasi dalam mode development:
   ```bash
   npm run dev
   ```
5. Buka browser Anda dan kunjungi:
   `http://localhost:3000`

---

## ⚙️ Panduan Kustomisasi Admin

Sesuai standar clean architecture, seluruh data undangan dapat diubah melalui **satu file konfigurasi utama** di `/src/config/site.ts`.

### 1. Mengubah Data Acara & Anak
Buka `/src/config/site.ts` dan ubah objek `child` dan `event`:
```ts
export const siteConfig = {
  child: {
    fullName: "Arganta Humayun",
    nickName: "Arga",
    grade: "Kelas 5 SD",
    fatherName: "Sarif Imron Wakhidin",
    motherName: "Riawati"
  },
  // ...
}
```

### 2. Mengubah Tanggal & Google Maps
- **Countdown**: Ubah nilai `countdownDate` ke waktu ISO (misal: `"2026-08-05T17:00:00+07:00"`).
- **Google Maps Link**: Ganti URL `googleMapsLink` dengan link maps Anda.
- **Maps Embed Iframe**: Ganti atribut URL `googleMapsEmbedSrc` dari menu "Share > Embed a map" pada Google Maps.

### 3. Mengubah Rekening Gift
Ubah array pada objek `gifts` di file site.ts:
```ts
gifts: [
  {
    id: "bank-1",
    type: "bank",
    name: "Bank Mandiri",
    number: "1390024829304",
    holder: "Sarif Imron Wakhidin"
  },
  // ...
]
```

### 4. Mengubah Tema Warna (Tailwind CSS v4)
Warna utama dikonfigurasi menggunakan variabel CSS modern di `/src/index.css` dalam blok `@theme`:
```css
@theme {
  --color-primary: #0F766E;   /* Warna Emerald utama */
  --color-secondary: #D4AF37; /* Warna Champagne Gold */
  --color-ivory: #FAFAF7;     /* Warna Latar Ivory */
  --color-cream: #F5F1E8;     /* Warna Latar Cream */
}
```
Anda tinggal mengganti hex code tersebut dengan warna pilihan Anda dan website akan langsung berubah secara global.

### 5. Mengubah Musik Latar
Lagu tersimpan di konfigurasi `music` dalam file `/src/config/site.ts`.
- Jika ingin menggunakan link eksternal, ganti `url` ke alamat MP3 (misal: `"https://alamat-web.com/lagu.mp3"`).
- Jika ingin memutar file lokal, taruh file MP3 Anda di dalam folder `/public/music/` (misal bernama `bgm.mp3`), lalu ganti `url` di site.ts menjadi `"/music/bgm.mp3"`.

### 6. Mengubah Gambar Galeri
Daftar gambar tersimpan pada objek `gallery.images` di file `/src/config/site.ts`.
- Anda bisa menaruh foto-foto ananda di folder `/public/gallery/` (misal: `foto1.jpg`, `foto2.jpg`), lalu daftarkan jalurnya di site.ts:
  ```ts
  images: [
    "/gallery/foto1.jpg",
    "/gallery/foto2.jpg"
  ]
  ```

---

## 🌐 Panduan Deploy ke Vercel atau Cloud Run

Aplikasi ini menggunakan arsitektur full-stack (Express + Vite) untuk menangani database RSVP Buku Tamu. Oleh karena itu, deploy disarankan mengikuti cara penanganan server dinamis.

### Pilihan 1: Deploy ke Vercel (Menggunakan Serverless Functions)
Untuk mendeploy server Node Express di Vercel, buat file `vercel.json` di root folder:
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
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Pilihan 2: Deploy Container (Cloud Run / Docker)
Project ini sudah diatur siap digunakan dalam container di Cloud Run dengan meluncurkan build bundle production yang efisien menggunakan esbuild:
1. Build aplikasi:
   ```bash
   npm run build
   ```
2. Jalankan server production:
   ```bash
   npm run start
   ```

---

*Selamat berbahagia dan semoga acara khitanan ananda berjalan lancar penuh keberkahan!*
