# 📖 Library Management API — Praktikum PPL I

![Build Status](https://img.shields.io/badge/CI-Success-green?style=flat-square&logo=github-actions)
![Security Scan](https://img.shields.io/badge/Security-Protected-blue?style=flat-square&logo=github-actions)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)

API Backend untuk manajemen data buku perpustakaan yang modern dan tangguh. Dibangun dengan **Node.js & Express**, serta didukung oleh **PostgreSQL** sebagai database utama. Proyek ini mengedepankan standar industri dengan implementasi **CI/CD/CS** melalui GitHub Actions.

---

## 📑 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Persiapan & Instalasi](#-persiapan--instalasi)
- [Arsitektur Proyek](#-arsitektur-proyek)
- [Dokumentasi API](#-dokumentasi-api)
- [Panduan Kontribusi (Git Workflow)](#-panduan-kontribusi-git-workflow)
- [Automasi & Keamanan (CI/CD/CS)](#-automasi--keamanan-cicdcs)

---

## ✨ Fitur Utama

- ✅ **Full CRUD**: Manajemen buku (Tambah, Lihat, Edit, Hapus).
- ✅ **Auto-Schema**: Inisialisasi tabel database otomatis saat aplikasi jalan.
- ✅ **Data Integrity**: Validasi input (ISBN unik, judul wajib, dll).
- ✅ **Search Engine**: Pencarian buku berdasarkan judul, penulis, atau ISBN.
- ✅ **Containerized**: Siap dijalankan di mana saja menggunakan Docker.

---

## 🚀 Persiapan & Instalasi

### Prasyarat

- Node.js (v18 ke atas)
- PostgreSQL (v14 ke atas) atau Docker Desktop

### Opsi 1: Menggunakan Docker (Paling Cepat)

Cukup jalankan satu perintah ini, aplikasi dan database akan otomatis terhubung:
```bash
docker-compose up --build
```

Akses di: `http://localhost:3000`

### Opsi 2: Instalasi Manual (Local)

1. Clone repositori & masuk ke folder:
```bash
git clone https://github.com/Hafizh220705/library-api-ppl.git
cd library-api-ppl
```

2. Instal dependensi & setup `.env`:
```bash
npm install
cp .env.example .env  # Sesuaikan DATABASE_URL di sini
```

3. Jalankan aplikasi atau test:
```bash
npm start   # Menjalankan server
npm test    # Menjalankan unit testing
```

---

## 🏗️ Arsitektur Proyek
```
.
├── .github/workflows   # Otomasi GitHub Actions
├── src/
│   ├── controllers/    # Logika bisnis & pengolahan request
│   ├── routes/         # Definisi jalur endpoint API
│   └── index.js        # Konfigurasi server & Database init
├── tests/              # Skrip integrasi testing (Jest)
├── Dockerfile          # Instruksi build image
└── docker-compose.yml  # Konfigurasi orkestrasi kontainer
```

---

## 📡 Dokumentasi API

### Endpoint Utama

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/books` | Mengambil seluruh daftar buku |
| GET | `/api/books/:id` | Detail spesifik satu buku |
| POST | `/api/books` | Menambah koleksi buku baru |
| PUT | `/api/books/:id` | Memperbarui data buku |
| DELETE | `/api/books/:id` | Menghapus buku dari sistem |

### Contoh Request Body (POST/PUT)
```json
{
  "title": "Laskar Pelangi",
  "author": "Andrea Hirata",
  "isbn": "978-979-3062-79-1",
  "published_year": 2005
}
```

---

## 🔄 Panduan Kontribusi (Git Workflow)

Kami menggunakan **Conventional Commits** untuk menjaga histori project tetap rapi.

| Type | Keterangan |
|------|------------|
| `feat` | Fitur baru (misal: tambah endpoint search) |
| `fix` | Perbaikan bug (misal: fix error 500 database) |
| `docs` | Perubahan dokumentasi (misal: update README) |
| `ci` | Perubahan file GitHub Actions |

### Alur Kerja:

1. Buat branch fitur baru dari `develop`.
2. Commit perubahan dengan pesan yang deskriptif.
3. Push ke origin dan buat Pull Request ke branch `develop`.
4. Setelah lulus CI/CD, merge ke `main` untuk rilis.

---

## 🛡️ Automasi & Keamanan (CI/CD/CS)

Proyek ini diproteksi oleh tiga lapis sistem otomatisasi:

### 1. CI (Continuous Integration)

Setiap ada kode baru, sistem akan otomatis menjalankan pengujian unit menggunakan **Jest** untuk memastikan fitur lama tidak rusak oleh kode baru.

### 2. CS (Continuous Security)

- **njsscan**: Melakukan audit statis pada kode untuk mencari celah keamanan Node.js.
- **npm audit**: Memastikan semua library (dependencies) yang digunakan bebas dari kerentanan keamanan (Vulnerabilities).

### 3. CD (Continuous Deployment)

Automasi build Docker Image setiap kali ada perubahan pada branch utama, memastikan aplikasi siap dipindahkan ke lingkungan server.

---

> Maintained by: **Hafizh Fadhl Muhammad** — `140810230070`
