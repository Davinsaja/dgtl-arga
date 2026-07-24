# Folder Musik (`public/music`)

Folder ini digunakan untuk menyimpan file lagu latar instrumen Islami berformat `.mp3`.

## Cara Mengganti Musik:
1. Masukkan file MP3 Anda ke dalam folder ini (`public/music/`), contohnya:
   - `public/music/instrumental-islami.mp3`

2. Buka file `src/config/site.ts` dan ubah pada bagian `music`:
   ```ts
   music: {
     url: "/music/instrumental-islami.mp3",
     title: "Instrumen Sholawat & Gambus Islami"
   }
   ```
