export type PaketId = "paket-1" | "paket-2" | "paket-3";

export type StatusPembayaran =
  | "menunggu"
  | "diproses"
  | "lunas"
  | "ditolak";

export interface PaketOption {
  id: PaketId;
  nama: string;
  deskripsi: string;
  biayaPendaftaran: number;
  biayaBulanan: number;
  pertemuanPerMinggu?: number;
}

export interface UserRecord {
  id: string;
  nama: string;
  email: string;
  no_hp: string;
  nik: string;
  email_verified: boolean;
  created_at: string;
}

export interface RegistrationRecord {
  id: string;
  user_id: string;
  paket_id: PaketId;
  status_pembayaran: StatusPembayaran;
  created_at: string;
}
