import { z } from "zod";

export const registerSchema = z.object({
  nama: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(120, "Nama terlalu panjang"),
  email: z.string().email("Format email tidak valid").max(255),
  no_hp: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Nomor HP harus 10–15 digit angka"),
  nik: z.string().regex(/^[0-9]{16}$/, "NIK harus 16 digit angka"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(128, "Password terlalu panjang")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password harus mengandung huruf besar, huruf kecil, dan angka",
    ),
});

export const loginSchema = z.object({
  nik: z.string().regex(/^[0-9]{16}$/, "NIK harus 16 digit angka"),
  password: z.string().min(1, "Password wajib diisi").max(128),
});

export const paketSelectionSchema = z.object({
  paketId: z.enum(["paket-1", "paket-2"]),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
