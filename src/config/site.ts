export interface GiftAccount {
  id: string;
  type: 'bank' | 'wallet';
  name: string; // e.g. "BCA", "DANA"
  number: string;
  holder: string;
}

export interface EventDetail {
  day: string;
  date: string;
  time: string;
  title: string;
  description: string;
}

export interface SiteConfig {
  child: {
    fullName: string;
    nickName: string;
    grade: string;
    fatherName: string;
    motherName: string;
  };
  event: {
    days: string[];
    datesString: string;
    countdownDate: string; // ISO format or string readable by Date
    timeString: string;
    address: {
      rtRw: string;
      dusun: string;
      desa: string;
      kecamatan: string;
      kabupaten: string;
      provinsi: string;
      fullText: string;
    };
    googleMapsLink: string;
    googleMapsEmbedSrc: string;
    whatsappRsvp: string;
    invitingFamily: string;
  };
  ayat: {
    arabic: string;
    translation: string;
    source: string;
  };
  gifts: GiftAccount[];
  music: {
    url: string;
    title: string;
  };
  gallery: {
    images: string[];
  };
  cover: {
    label: string;
    title: string;
    buttonText: string;
    photo: string;
  };
  theme: {
    primary: string; // emerald
    secondary: string; // champagne gold
    background: string; // ivory
    cream: string; // cream
    text: string; // dark gray
  };
}

export const siteConfig: SiteConfig = {
  child: {
    fullName: "Arganta Humayun",
    nickName: "Arga",
    grade: "Kelas 5 SD",
    fatherName: "Sarif Imron Wakhidin",
    motherName: "Riawati"
  },
  event: {
    days: ["Rabu", "Kamis", "Jumat"],
    datesString: "5 - 7 Agustus 2026",
    countdownDate: "2026-08-05T00:00:00+07:00", // Rabu, 5 Agustus 2026
    timeString: "",
    address: {
      rtRw: "RT 002 RW 003",
      dusun: "Dusun II Pegandekan",
      desa: "Pegandekan",
      kecamatan: "Kemangkon",
      kabupaten: "Purbalingga",
      provinsi: "Jawa Tengah",
      fullText: "RT 002 RW 003, Dusun II Pegandekan, Kecamatan Kemangkon, Kabupaten Purbalingga, Jawa Tengah"
    },
    googleMapsLink: "https://maps.app.goo.gl/DdkiFyYbsbJhFfPt7",
    // Premium custom Google Maps embed src tailored to the coordinate for Dusun II Pegandekan, Purbalingga
    googleMapsEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.124614217112!2d109.3887556!3d-7.451458999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6559d80dffeb4d%3A0xe7f920202ba4df7f!2sDusun%20II%20Pegandekan%2C%20Kemangkon%2C%20Purbalingga!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
    whatsappRsvp: "081944090188",
    invitingFamily: "Bapak Sarif Imron Wakhidin dan Keluarga"
  },
  ayat: {
    arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
    translation: "Ya Rabbku, anugerahkanlah kepadaku (seorang anak) yang termasuk orang-orang yang sholeh.",
    source: "QS. As-Saffat: 100"
  },
  gifts: [
    {
      id: "bank-1",
      type: "bank",
      name: "Bank BRI",
      number: "6821-01-033381-53-2",
      holder: "RIAWATI"
    }
  ],
  music: {
    // Direct streaming URL for soft Islamic Instrumental Oud & Flute
    url: "public/music/oud-seruling-islami.mp3",
    fallbackUrl: "public/music/oud-seruling-islami.mp3",
    title: "Instrumen Oud & Seruling Islami - Keindahan Syurga"
  },
  gallery: {
    // Array of mock elegant pictures. Since images are in public/gallery, we will serve highly stunning Unsplash photos of Islamic motifs, happy families, and children to ensure a premium look.
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800", // Mosques & lanterns
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800", // Golden dome
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=800", // Islamic art ornament
      "https://images.unsplash.com/photo-1609599006353-e629f1d29718?auto=format&fit=crop&q=80&w=800", // Quran book
      "https://images.unsplash.com/photo-1590075865003-e48277faa558?auto=format&fit=crop&q=80&w=800", // Moroccan aesthetic archway
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800"  // Soft light ray
    ]
  },
  cover: {
    label: "Undangan",
    title: "TASYAKURAN KHITAN",
    buttonText: "Buka Undangan",
    photo: "/img/dpn111.png",
  },
  theme: {
    primary: "#0F766E",      // Emerald
    secondary: "#D4AF37",    // Champagne Gold
    background: "#FAFAF7",   // Ivory
    cream: "#F5F1E8",        // Cream
    text: "#374151"          // Dark Gray
  }
};
