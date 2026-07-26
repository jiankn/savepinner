/**
 * Locale registry and UI dictionaries.
 *
 * English stays on the root path (no prefix) so existing indexed URLs never
 * move; every other locale is served under /{locale}/. Language targeting is
 * carried by hreflang annotations plus localized copy — see lib/seo.ts.
 *
 * Keep this file dependency-free: it is imported by Client Components.
 */

export const LOCALES = ["en", "es", "id", "pt"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Locales that live under a path prefix (everything except the default). */
export const PREFIXED_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE) as Exclude<Locale, "en">[];

/** hreflang values. Portuguese targets Brazil, the dominant Pinterest market. */
export const HREFLANG: Record<Locale, string> = {
  en: "en",
  es: "es",
  id: "id",
  pt: "pt-BR",
};

/** Endonyms — a language switcher must name each language in that language. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  id: "Bahasa Indonesia",
  pt: "Português",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export interface UiMessages {
  nav: { home: string; video: string; gif: string; story: string };
  form: {
    inputLabel: string;
    paste: string;
    download: string;
    working: string;
    supports: string;
    progress: [string, string, string];
    clipboardUnavailable: string;
    clipboardEmpty: string;
    clipboardDenied: string;
    pasted: string;
    emptyInput: string;
    invalidUrl: string;
    serviceUnavailable: string;
    networkError: string;
  };
  badges: { ssl: string; noLogin: string; noWatermark: string; free: string };
  howTo: { step: string; videoCrossLinkPrefix: string; videoCrossLinkText: string };
  faqHeading: string;
  relatedHeading: string;
  whyChoose: { heading: string; items: [Benefit, Benefit, Benefit] };
  result: {
    image: string;
    gif: string;
    video: string;
    download: string;
    open: string;
    thumbnail: string;
    original: string;
    another: string;
    cappedTitle: string;
    /**
     * Contains the literal placeholder `{eta}`. Dictionaries cross the RSC
     * boundary into Client Components, so these must stay serializable —
     * no functions.
     */
    cappedBody: string;
  };
  error: { tryAgain: string; checkAnother: string; hints: Record<string, string> };
  footer: {
    tagline: string;
    tools: string;
    legal: string;
    languages: string;
    privacy: string;
    terms: string;
    dmca: string;
    contact: string;
    disclaimer: string;
  };
}

interface Benefit {
  title: string;
  description: string;
}

const EN: UiMessages = {
  nav: { home: "Home", video: "Video Downloader", gif: "GIF Downloader", story: "Story Downloader" },
  form: {
    inputLabel: "Pinterest link",
    paste: "Paste",
    download: "Download",
    working: "Working...",
    supports: "Supports: pinterest.com/pin/ · pin.it short links · All country domains",
    progress: ["Parsing link...", "Extracting media...", "Preparing download..."],
    clipboardUnavailable: "Clipboard access is unavailable — paste the link manually.",
    clipboardEmpty: "Your clipboard is empty — copy a Pin link first.",
    clipboardDenied: "Clipboard permission was denied — paste the link manually.",
    pasted: "Pasted from clipboard.",
    emptyInput: "Please paste a Pinterest link.",
    invalidUrl: "Please enter a valid Pinterest Pin link.",
    serviceUnavailable: "The service is temporarily unavailable.",
    networkError: "Network error — check your connection and try again.",
  },
  badges: { ssl: "SSL Secured", noLogin: "No Login Required", noWatermark: "No Watermark", free: "100% Free" },
  howTo: {
    step: "Step",
    videoCrossLinkPrefix: "Want to download Pinterest videos? Use our ",
    videoCrossLinkText: "Pinterest video downloader",
  },
  faqHeading: "Frequently Asked Questions",
  relatedHeading: "More Free Pinterest Tools",
  whyChoose: {
    heading: "Why Choose Our Pinterest Image Downloader?",
    items: [
      { title: "Fast & Simple", description: "Download any Pinterest image in under 3 seconds. No complicated steps." },
      { title: "HD Original Quality", description: "We fetch the original resolution image, not the compressed thumbnail." },
      { title: "No Registration", description: "No email, no account, no login. Just paste and download." },
    ],
  },
  result: {
    image: "Image · Original Quality",
    gif: "GIF · Original Quality · Animated",
    video: "Video · HD Quality",
    download: "Download",
    open: "Open",
    thumbnail: "Thumbnail (236x)",
    original: "Original",
    another: "Download another Pin",
    cappedTitle: "Today's one-click downloads are used up",
    cappedBody:
      'SavePinner is busier than our free servers can handle today. One-click downloads reset in {eta}. You can still save your file right now — open it below, then right-click (desktop) or long-press (mobile) and choose "Save".',
  },
  error: {
    tryAgain: "Try again",
    checkAnother: "Check another link",
    hints: {
      INVALID_URL: "Make sure the link looks like https://www.pinterest.com/pin/123456789/ or https://pin.it/abc123.",
      UNSUPPORTED_URL: "Only single public Pins are supported — profiles, boards and search pages are not.",
      REDIRECT_REJECTED: "The short link did not lead to a public Pinterest Pin.",
      PIN_NOT_PUBLIC: "Sign-in-only, private or deleted Pins cannot be accessed.",
      MEDIA_NOT_FOUND: "The Pin may be deleted, or it has no downloadable image or video.",
      UNSUPPORTED_MEDIA: "This media format is not supported yet.",
      RATE_LIMITED: "Please wait a few seconds before trying again.",
      DAILY_CAP_REACHED: "One-click downloads reset at midnight UTC — direct links keep working meanwhile.",
      UPSTREAM_BLOCKED: "Pinterest may be temporarily unreachable — retry in a moment.",
      RESOLVE_TIMEOUT: "The request took too long — retry in a moment.",
      NETWORK: "Check your internet connection.",
    },
  },
  footer: {
    tagline: "A free tool for downloading Pinterest images, videos, GIFs and thumbnails in HD quality.",
    tools: "Tools",
    legal: "Legal",
    languages: "Languages",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    dmca: "DMCA",
    contact: "Contact",
    disclaimer:
      "SavePinner © 2026. SavePinner is independent and is not affiliated with or endorsed by Pinterest. Only download content you own or have permission to use.",
  },
};

const ES: UiMessages = {
  nav: { home: "Inicio", video: "Descargar vídeos", gif: "Descargar GIF", story: "Descargar Stories" },
  form: {
    inputLabel: "Enlace de Pinterest",
    paste: "Pegar",
    download: "Descargar",
    working: "Procesando...",
    supports: "Compatible con: pinterest.com/pin/ · enlaces cortos pin.it · Dominios de todos los países",
    progress: ["Analizando el enlace...", "Extrayendo el archivo...", "Preparando la descarga..."],
    clipboardUnavailable: "No se puede acceder al portapapeles: pega el enlace manualmente.",
    clipboardEmpty: "Tu portapapeles está vacío: copia primero el enlace de un pin.",
    clipboardDenied: "Se denegó el permiso del portapapeles: pega el enlace manualmente.",
    pasted: "Pegado desde el portapapeles.",
    emptyInput: "Pega un enlace de Pinterest.",
    invalidUrl: "Introduce un enlace válido de un pin de Pinterest.",
    serviceUnavailable: "El servicio no está disponible temporalmente.",
    networkError: "Error de red: comprueba tu conexión e inténtalo de nuevo.",
  },
  badges: { ssl: "Conexión segura SSL", noLogin: "Sin iniciar sesión", noWatermark: "Sin marca de agua", free: "100 % gratis" },
  howTo: {
    step: "Paso",
    videoCrossLinkPrefix: "¿Quieres descargar vídeos de Pinterest? Usa nuestro ",
    videoCrossLinkText: "descargador de vídeos de Pinterest",
  },
  faqHeading: "Preguntas frecuentes",
  relatedHeading: "Más herramientas gratuitas para Pinterest",
  whyChoose: {
    heading: "¿Por qué usar nuestro descargador de imágenes de Pinterest?",
    items: [
      { title: "Rápido y sencillo", description: "Descarga cualquier imagen de Pinterest en menos de 3 segundos. Sin pasos complicados." },
      { title: "Calidad original HD", description: "Obtenemos la imagen en su resolución original, no la miniatura comprimida." },
      { title: "Sin registro", description: "Sin correo, sin cuenta, sin iniciar sesión. Solo pega y descarga." },
    ],
  },
  result: {
    image: "Imagen · Calidad original",
    gif: "GIF · Calidad original · Animado",
    video: "Vídeo · Calidad HD",
    download: "Descargar",
    open: "Abrir",
    thumbnail: "miniatura (236x)",
    original: "original",
    another: "Descargar otro pin",
    cappedTitle: "Las descargas directas de hoy se han agotado",
    cappedBody:
      'Hoy SavePinner tiene más tráfico del que pueden gestionar nuestros servidores gratuitos. Las descargas con un clic se restablecen en {eta}. Aún puedes guardar tu archivo ahora mismo: ábrelo abajo y haz clic derecho (ordenador) o mantén pulsado (móvil) y elige "Guardar".',
  },
  error: {
    tryAgain: "Reintentar",
    checkAnother: "Probar otro enlace",
    hints: {
      INVALID_URL: "El enlace debe tener este formato: https://www.pinterest.com/pin/123456789/ o https://pin.it/abc123.",
      UNSUPPORTED_URL: "Solo admitimos pines públicos individuales, no perfiles, tableros ni páginas de búsqueda.",
      REDIRECT_REJECTED: "El enlace corto no lleva a un pin público de Pinterest.",
      PIN_NOT_PUBLIC: "No se puede acceder a pines privados, eliminados o que requieren iniciar sesión.",
      MEDIA_NOT_FOUND: "Puede que el pin se haya eliminado o que no tenga imagen ni vídeo descargable.",
      UNSUPPORTED_MEDIA: "Este formato todavía no es compatible.",
      RATE_LIMITED: "Espera unos segundos antes de volver a intentarlo.",
      DAILY_CAP_REACHED: "Las descargas con un clic se restablecen a medianoche (UTC); mientras tanto los enlaces directos siguen funcionando.",
      UPSTREAM_BLOCKED: "Puede que Pinterest no esté disponible temporalmente: inténtalo en un momento.",
      RESOLVE_TIMEOUT: "La solicitud tardó demasiado: inténtalo de nuevo en un momento.",
      NETWORK: "Comprueba tu conexión a internet.",
    },
  },
  footer: {
    tagline: "Una herramienta gratuita para descargar imágenes, vídeos, GIF y miniaturas de Pinterest en calidad HD.",
    tools: "Herramientas",
    legal: "Legal",
    languages: "Idiomas",
    privacy: "Política de privacidad",
    terms: "Términos del servicio",
    dmca: "DMCA",
    contact: "Contacto",
    disclaimer:
      "SavePinner © 2026. SavePinner es independiente y no está afiliado ni respaldado por Pinterest. Descarga únicamente contenido que te pertenezca o para el que tengas permiso.",
  },
};

const ID: UiMessages = {
  // Indonesian search behaviour keeps the English loanwords "download" and
  // "video" — the KD data ranks those far above native "unduh" phrasings.
  nav: { home: "Beranda", video: "Download Video", gif: "Download GIF", story: "Download Story" },
  form: {
    inputLabel: "Link Pinterest",
    paste: "Tempel",
    download: "Download",
    working: "Memproses...",
    supports: "Mendukung: pinterest.com/pin/ · link pendek pin.it · Semua domain negara",
    progress: ["Membaca link...", "Mengambil file...", "Menyiapkan download..."],
    clipboardUnavailable: "Tidak bisa mengakses clipboard — tempel link secara manual.",
    clipboardEmpty: "Clipboard kamu kosong — salin dulu link pin-nya.",
    clipboardDenied: "Izin clipboard ditolak — tempel link secara manual.",
    pasted: "Ditempel dari clipboard.",
    emptyInput: "Tempel link Pinterest dulu.",
    invalidUrl: "Masukkan link pin Pinterest yang valid.",
    serviceUnavailable: "Layanan sedang tidak tersedia.",
    networkError: "Koneksi bermasalah — periksa jaringan lalu coba lagi.",
  },
  badges: { ssl: "Aman dengan SSL", noLogin: "Tanpa login", noWatermark: "Tanpa watermark", free: "100% gratis" },
  howTo: {
    step: "Langkah",
    videoCrossLinkPrefix: "Mau download video Pinterest? Pakai ",
    videoCrossLinkText: "tool download video Pinterest kami",
  },
  faqHeading: "Pertanyaan yang sering diajukan",
  relatedHeading: "Tool Pinterest gratis lainnya",
  whyChoose: {
    heading: "Kenapa pakai tool download gambar Pinterest ini?",
    items: [
      { title: "Cepat dan simpel", description: "Download gambar Pinterest apa pun dalam waktu kurang dari 3 detik. Tanpa langkah ribet." },
      { title: "Kualitas asli HD", description: "Kami mengambil gambar resolusi asli, bukan thumbnail yang sudah dikompres." },
      { title: "Tanpa daftar", description: "Tanpa email, tanpa akun, tanpa login. Tinggal tempel dan download." },
    ],
  },
  result: {
    image: "Gambar · Kualitas asli",
    gif: "GIF · Kualitas asli · Animasi",
    video: "Video · Kualitas HD",
    download: "Download",
    open: "Buka",
    thumbnail: "Thumbnail (236x)",
    original: "Asli",
    another: "Download pin lain",
    cappedTitle: "Kuota download sekali klik hari ini sudah habis",
    cappedBody:
      'Hari ini SavePinner lebih ramai dari kapasitas server gratis kami. Download sekali klik aktif lagi dalam {eta}. Kamu tetap bisa menyimpan file sekarang — buka lewat tombol di bawah, lalu klik kanan (desktop) atau tekan lama (HP) dan pilih "Simpan".',
  },
  error: {
    tryAgain: "Coba lagi",
    checkAnother: "Coba link lain",
    hints: {
      INVALID_URL: "Pastikan formatnya seperti https://www.pinterest.com/pin/123456789/ atau https://pin.it/abc123.",
      UNSUPPORTED_URL: "Hanya mendukung satu pin publik — bukan profil, board, atau halaman pencarian.",
      REDIRECT_REJECTED: "Link pendek ini tidak mengarah ke pin Pinterest publik.",
      PIN_NOT_PUBLIC: "Pin privat, sudah dihapus, atau yang butuh login tidak bisa diakses.",
      MEDIA_NOT_FOUND: "Pin mungkin sudah dihapus, atau tidak punya gambar/video yang bisa didownload.",
      UNSUPPORTED_MEDIA: "Format ini belum didukung.",
      RATE_LIMITED: "Tunggu beberapa detik sebelum mencoba lagi.",
      DAILY_CAP_REACHED: "Download sekali klik direset tengah malam UTC — sementara itu link langsung tetap berfungsi.",
      UPSTREAM_BLOCKED: "Pinterest mungkin sedang tidak bisa diakses — coba sebentar lagi.",
      RESOLVE_TIMEOUT: "Permintaan terlalu lama — coba lagi sebentar.",
      NETWORK: "Periksa koneksi internet kamu.",
    },
  },
  footer: {
    tagline: "Tool gratis untuk download gambar, video, GIF, dan thumbnail Pinterest dengan kualitas HD.",
    tools: "Tool",
    legal: "Legal",
    languages: "Bahasa",
    privacy: "Kebijakan Privasi",
    terms: "Ketentuan Layanan",
    dmca: "DMCA",
    contact: "Kontak",
    disclaimer:
      "SavePinner © 2026. SavePinner independen dan tidak berafiliasi dengan atau didukung oleh Pinterest. Hanya download konten yang kamu miliki atau yang sudah kamu dapat izinnya.",
  },
};

const PT: UiMessages = {
  nav: { home: "Início", video: "Baixar vídeos", gif: "Baixar GIF", story: "Baixar Stories" },
  form: {
    inputLabel: "Link do Pinterest",
    paste: "Colar",
    download: "Baixar",
    working: "Processando...",
    supports: "Compatível com: pinterest.com/pin/ · links curtos pin.it · Domínios de todos os países",
    progress: ["Lendo o link...", "Extraindo o arquivo...", "Preparando o download..."],
    clipboardUnavailable: "Não foi possível acessar a área de transferência — cole o link manualmente.",
    clipboardEmpty: "Sua área de transferência está vazia — copie o link do pin primeiro.",
    clipboardDenied: "Permissão da área de transferência negada — cole o link manualmente.",
    pasted: "Colado da área de transferência.",
    emptyInput: "Cole um link do Pinterest.",
    invalidUrl: "Digite um link válido de um pin do Pinterest.",
    serviceUnavailable: "O serviço está temporariamente indisponível.",
    networkError: "Erro de rede — verifique sua conexão e tente de novo.",
  },
  badges: { ssl: "Conexão segura (SSL)", noLogin: "Sem login", noWatermark: "Sem marca d'água", free: "100% grátis" },
  howTo: {
    step: "Passo",
    videoCrossLinkPrefix: "Quer baixar vídeos do Pinterest? Use nosso ",
    videoCrossLinkText: "baixador de vídeos do Pinterest",
  },
  faqHeading: "Perguntas frequentes",
  relatedHeading: "Mais ferramentas gratuitas do Pinterest",
  whyChoose: {
    heading: "Por que usar nosso baixador de imagens do Pinterest?",
    items: [
      { title: "Rápido e simples", description: "Baixe qualquer imagem do Pinterest em menos de 3 segundos. Sem etapas complicadas." },
      { title: "Qualidade original HD", description: "Buscamos a imagem na resolução original, não a miniatura comprimida." },
      { title: "Sem cadastro", description: "Sem e-mail, sem conta, sem login. É só colar e baixar." },
    ],
  },
  result: {
    image: "Imagem · Qualidade original",
    gif: "GIF · Qualidade original · Animado",
    video: "Vídeo · Qualidade HD",
    download: "Baixar",
    open: "Abrir",
    thumbnail: "miniatura (236x)",
    original: "original",
    another: "Baixar outro pin",
    cappedTitle: "Os downloads diretos de hoje acabaram",
    cappedBody:
      'Hoje o SavePinner está com mais tráfego do que nossos servidores gratuitos aguentam. Os downloads em um clique voltam em {eta}. Você ainda pode salvar seu arquivo agora: abra pelo botão abaixo e clique com o botão direito (computador) ou pressione e segure (celular) e escolha "Salvar".',
  },
  error: {
    tryAgain: "Tentar de novo",
    checkAnother: "Testar outro link",
    hints: {
      INVALID_URL: "O link deve ser assim: https://www.pinterest.com/pin/123456789/ ou https://pin.it/abc123.",
      UNSUPPORTED_URL: "Só aceitamos pins públicos individuais — não perfis, pastas ou páginas de busca.",
      REDIRECT_REJECTED: "O link curto não leva a um pin público do Pinterest.",
      PIN_NOT_PUBLIC: "Pins privados, excluídos ou que exigem login não podem ser acessados.",
      MEDIA_NOT_FOUND: "O pin pode ter sido excluído ou não tem imagem nem vídeo para baixar.",
      UNSUPPORTED_MEDIA: "Este formato ainda não é compatível.",
      RATE_LIMITED: "Espere alguns segundos antes de tentar de novo.",
      DAILY_CAP_REACHED: "Os downloads em um clique são reiniciados à meia-noite (UTC) — enquanto isso, os links diretos continuam funcionando.",
      UPSTREAM_BLOCKED: "O Pinterest pode estar temporariamente fora do ar — tente daqui a pouco.",
      RESOLVE_TIMEOUT: "A solicitação demorou demais — tente de novo em instantes.",
      NETWORK: "Verifique sua conexão com a internet.",
    },
  },
  footer: {
    tagline: "Uma ferramenta gratuita para baixar imagens, vídeos, GIFs e miniaturas do Pinterest em qualidade HD.",
    tools: "Ferramentas",
    legal: "Jurídico",
    languages: "Idiomas",
    privacy: "Política de Privacidade",
    terms: "Termos de Uso",
    dmca: "DMCA",
    contact: "Contato",
    disclaimer:
      "SavePinner © 2026. O SavePinner é independente e não tem afiliação com o Pinterest nem é endossado por ele. Baixe apenas conteúdo que seja seu ou que você tenha permissão para usar.",
  },
};

export const MESSAGES: Record<Locale, UiMessages> = { en: EN, es: ES, id: ID, pt: PT };

export function getMessages(locale: Locale): UiMessages {
  return MESSAGES[locale];
}
