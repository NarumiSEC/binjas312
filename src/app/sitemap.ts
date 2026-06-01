import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://pendaftaran-binjas-312.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // Jika nanti Anda punya halaman lain, contohnya halaman /jadwal, tambahkan di bawah ini:
    // {
    //   url: 'https://vercel.app/jadwal',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}
