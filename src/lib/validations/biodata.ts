import { z } from "zod";

export const biodataSchema = z.object({
  nik: z.string().regex(/^[0-9]{16}$/, "NIK harus 16 digit angka"),
  namaLengkap: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(120, "Nama terlalu panjang"),
  tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  riwayatPenyakit: z
    .string()
    .min(1, "Riwayat penyakit wajib diisi")
    .max(500, "Terlalu panjang"),
  namaOrangTua: z
    .string()
    .min(2, "Nama orang tua minimal 2 karakter")
    .max(120, "Terlalu panjang"),
  alamat: z
    .string()
    .min(5, "Alamat minimal 5 karakter")
    .max(500, "Alamat terlalu panjang"),
});

export type BiodataInput = z.infer<typeof biodataSchema>;
