# Setup Tabel Database (Wajib — Sekali)

Jika pendaftaran gagal dan di terminal ada `Could not find the table 'public.users'`, artinya **tabel belum dibuat** di Supabase.

## Langkah

1. Buka [Supabase Dashboard](https://supabase.com/dashboard) → pilih project Anda  
2. Menu **SQL Editor** → **New query**  
3. Salin **seluruh isi** file `supabase/migrations/001_initial_schema.sql`  
4. Klik **Run**  
5. Pastikan muncul pesan sukses (tanpa error merah)  
6. Restart `npm run dev` dan coba daftar lagi  

## Cek cepat

Di SQL Editor, jalankan:

```sql
SELECT COUNT(*) FROM users;
```

Jika tidak error, tabel sudah ada.
