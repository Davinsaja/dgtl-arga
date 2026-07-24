# Folder Foto & Gambar (Images)

Folder ini digunakan untuk menyimpan file foto dan gambar digital invitation.

## Cara Menggunakan Foto Lokal:
1. Simpan file foto Anda di dalam folder ini (`public/images/`), contohnya:
   - `public/images/profil.jpg`
   - `public/images/foto1.jpg`
   - `public/images/foto2.jpg`

2. Panggil foto di dalam kode React / config (`src/config/site.ts`) dengan path relatif dari root:
   - `photo: "/images/profil.jpg"`
   - `photo: "/images/foto1.jpg"`

Contoh pada `src/config/site.ts`:
```ts
child: {
  fullName: "Arganta Humayun",
  shortName: "Arga",
  photo: "/images/profil.jpg"
}
```
