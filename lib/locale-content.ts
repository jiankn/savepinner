/**
 * Localized tool pages (es / id / pt).
 *
 * Keyword targets were measured with the KD tool in each local market; the
 * score in each comment is that market's difficulty, not the US one:
 *
 *   es home   descargar pines de pinterest ....... KD 12.0  (also: imágenes 17.5)
 *   es video  descargar videos de pinterest ...... KD 35.5  · 50,190/mo
 *   id home   download gambar pinterest .......... KD 14.0
 *   id video  pinterest video download ........... KD 22.7  · 323,990/mo
 *   pt home   baixar imagens do pinterest ........ KD 51.6
 *   pt video  baixar video do pinterest .......... KD 42.3  · 30,220/mo
 *
 * Slugs are written in the language people actually search in — including
 * Indonesian, where the English loanwords "download"/"video" outrank the
 * native "unduh" phrasings, so /id/ keeps the English word order.
 */

import type { Locale } from "@/lib/i18n";
import type { RelatedTool, ToolPageContent } from "@/lib/page-content";

export type PrefixedLocale = Exclude<Locale, "en">;
export type LocalePageKey = "home" | "video";

/** Locale-correct paths, also used to build hreflang alternates. */
export const LOCALE_PATHS: Record<PrefixedLocale, Record<LocalePageKey, string>> = {
  es: { home: "/es/", video: "/es/descargar-videos-de-pinterest/" },
  id: { home: "/id/", video: "/id/pinterest-video-download/" },
  pt: { home: "/pt/", video: "/pt/baixar-video-do-pinterest/" },
};

/** Second path segment of each locale's video page, for [locale]/[slug]. */
export const LOCALE_VIDEO_SLUGS: Record<PrefixedLocale, string> = {
  es: "descargar-videos-de-pinterest",
  id: "pinterest-video-download",
  pt: "baixar-video-do-pinterest",
};

function tools(locale: PrefixedLocale, self: LocalePageKey): RelatedTool[] {
  const home: RelatedTool = {
    kind: "home",
    href: LOCALE_PATHS[locale].home,
    title: {
      es: "Descargar imágenes de Pinterest",
      id: "Download Gambar Pinterest",
      pt: "Baixar imagens do Pinterest",
    }[locale],
    description: {
      es: "Guarda imágenes y miniaturas de Pinterest en HD",
      id: "Simpan gambar dan thumbnail Pinterest kualitas HD",
      pt: "Salve imagens e miniaturas do Pinterest em HD",
    }[locale],
  };
  const video: RelatedTool = {
    kind: "video",
    href: LOCALE_PATHS[locale].video,
    title: {
      es: "Descargar vídeos de Pinterest",
      id: "Pinterest Video Download",
      pt: "Baixar vídeos do Pinterest",
    }[locale],
    description: {
      es: "Descarga vídeos de Pinterest en calidad HD",
      id: "Download video Pinterest kualitas HD",
      pt: "Baixe vídeos do Pinterest em qualidade HD",
    }[locale],
  };
  // Cross-link to the English GIF tool so locale pages still feed the wider
  // internal-link matrix while those pages await translation.
  const gif: RelatedTool = {
    kind: "gif",
    href: "/pinterest-gif-downloader/",
    title: {
      es: "Descargar GIF de Pinterest",
      id: "Download GIF Pinterest",
      pt: "Baixar GIFs do Pinterest",
    }[locale],
    description: {
      es: "Guarda GIF animados de Pinterest (en inglés)",
      id: "Simpan GIF animasi dari Pinterest (bahasa Inggris)",
      pt: "Salve GIFs animados do Pinterest (em inglês)",
    }[locale],
  };
  return self === "home" ? [video, gif] : [home, gif];
}

const ES_HOME: ToolPageContent = {
  slug: "home",
  locale: "es",
  path: LOCALE_PATHS.es.home,
  lastModified: "2026-07-27",
  videoPath: LOCALE_PATHS.es.video,
  seoTitle: "Descargar Imágenes de Pinterest HD Gratis sin Marca de Agua",
  metaDescription:
    "Descarga imágenes y pines de Pinterest en calidad HD original, gratis y sin registro. Compatible con JPG, PNG, GIF y WebP. Sin marca de agua.",
  keywords: ["descargar pines de pinterest", "descargar imagenes de pinterest", "descargar fotos de pinterest"],
  h1: "Descargar imágenes de Pinterest gratis",
  subtitle:
    "Descarga cualquier pin de Pinterest —imagen, miniatura, GIF o vídeo— en su calidad HD original. Sin registro, sin marca de agua y 100 % gratis.",
  placeholder: "Pega aquí tu enlace de Pinterest...",
  howToTitle: "Cómo descargar imágenes de Pinterest en 3 pasos",
  steps: [
    {
      title: "Busca la imagen en Pinterest",
      description:
        "Abre Pinterest, busca el pin que quieras guardar y toca el botón Compartir para copiar su enlace.",
    },
    {
      title: "Pega el enlace en SavePinner",
      description: "Pega el enlace copiado en el campo de arriba y pulsa el botón Descargar.",
    },
    {
      title: "Descarga la imagen en calidad original",
      description:
        "Elige el tamaño que prefieras y descarga la imagen en calidad HD. Sin compresión y sin marca de agua.",
    },
  ],
  faq: [
    {
      question: "¿Cómo descargar imágenes de Pinterest sin marca de agua?",
      answer:
        "Todas las imágenes que descargas con SavePinner se obtienen directamente del CDN de Pinterest en su calidad original, sin que añadamos ninguna marca de agua.",
    },
    {
      question: "¿Puedo descargar pines de Pinterest en resolución completa?",
      answer:
        "Sí. Pinterest muestra miniaturas comprimidas por defecto, pero nosotros extraemos la URL de la imagen original del CDN, así que obtienes la versión en resolución completa.",
    },
    {
      question: "¿Funciona en iPhone y Android?",
      answer:
        "Sí, SavePinner funciona en cualquier dispositivo: iPhone, Android, iPad y ordenador. Solo pega el enlace del pin y descarga.",
    },
    {
      question: "¿Es gratis descargar vídeos de Pinterest?",
      answer:
        "Sí, nuestro descargador de vídeos de Pinterest es totalmente gratuito y llega hasta calidad HD, sin necesidad de iniciar sesión.",
      links: [{ text: "descargador de vídeos de Pinterest", href: LOCALE_PATHS.es.video }],
    },
    {
      question: "¿Qué formatos de enlace admite?",
      answer:
        "Admitimos enlaces de pinterest.com/pin/, enlaces cortos pin.it y los dominios de Pinterest de cada país (es, mx, com.ar, cl, etc.).",
    },
    {
      question: "¿Se pierde calidad al descargar?",
      answer:
        "No. Descargamos la imagen original desde el CDN de Pinterest (i.pinimg.com/originals/), así que obtienes exactamente la misma calidad con la que se subió.",
    },
  ],
  related: tools("es", "home"),
};

const ES_VIDEO: ToolPageContent = {
  slug: "video",
  locale: "es",
  path: LOCALE_PATHS.es.video,
  lastModified: "2026-07-27",
  videoPath: LOCALE_PATHS.es.video,
  seoTitle: "Descargar Vídeos de Pinterest Gratis — Calidad HD Online",
  metaDescription:
    "Descarga vídeos de Pinterest en calidad HD gratis y sin registro. Sin marca de agua, sin instalar programas. Compatible con móvil y ordenador.",
  keywords: ["descargar videos de pinterest", "descargar video de pinterest", "bajar videos de pinterest"],
  h1: "Descargar vídeos de Pinterest en HD",
  subtitle:
    "Pega el enlace de cualquier vídeo de Pinterest y descárgalo en calidad HD. Sin registro, sin marca de agua y 100 % gratis.",
  placeholder: "Pega aquí el enlace del vídeo de Pinterest...",
  howToTitle: "Cómo descargar vídeos de Pinterest en 3 pasos",
  steps: [
    {
      title: "Copia el enlace del vídeo",
      description:
        "Abre el vídeo en Pinterest, toca el botón Compartir y elige «Copiar enlace».",
    },
    {
      title: "Pega el enlace aquí",
      description: "Pega el enlace en el campo de arriba y pulsa Descargar para analizarlo.",
    },
    {
      title: "Guarda el vídeo en HD",
      description:
        "Elige la calidad disponible y guarda el archivo MP4 en tu móvil u ordenador. Sin marca de agua.",
    },
  ],
  faq: [
    {
      question: "¿Cómo descargar un vídeo de Pinterest en el móvil?",
      answer:
        "Copia el enlace del vídeo desde la app de Pinterest, vuelve aquí, pégalo y pulsa Descargar. Funciona igual en iPhone y en Android, sin instalar ninguna aplicación.",
    },
    {
      question: "¿En qué calidad se descargan los vídeos?",
      answer:
        "Descargamos el archivo MP4 con la mayor calidad que Pinterest publica para ese vídeo, normalmente 720p. Las demás versiones que ofrece Pinterest son streaming fragmentado y no se pueden guardar como un único archivo.",
    },
    {
      question: "¿Los vídeos llevan marca de agua?",
      answer:
        "No. El archivo se descarga tal cual está en el CDN de Pinterest, sin que añadamos ningún logotipo ni marca de agua.",
    },
    {
      question: "¿También puedo descargar imágenes?",
      answer:
        "Sí, usa nuestro descargador de imágenes de Pinterest para guardar fotos, pines y miniaturas en resolución original.",
      links: [{ text: "descargador de imágenes de Pinterest", href: LOCALE_PATHS.es.home }],
    },
    {
      question: "¿Hay que registrarse o pagar?",
      answer: "No. No hace falta cuenta, ni correo, ni pago. Pega el enlace y descarga.",
    },
    {
      question: "¿Qué pines de vídeo son compatibles?",
      answer:
        "Cualquier pin de vídeo público, incluidas las Idea Pins y Stories con vídeo. Los pines privados o eliminados no se pueden descargar.",
    },
  ],
  related: tools("es", "video"),
};

const ID_HOME: ToolPageContent = {
  slug: "home",
  locale: "id",
  path: LOCALE_PATHS.id.home,
  lastModified: "2026-07-27",
  videoPath: LOCALE_PATHS.id.video,
  seoTitle: "Download Gambar Pinterest Gratis HD Tanpa Watermark",
  metaDescription:
    "Download gambar Pinterest kualitas HD asli, gratis dan tanpa login. Mendukung JPG, PNG, GIF, dan WebP. Tanpa watermark, tanpa install aplikasi.",
  keywords: ["download gambar pinterest", "download foto pinterest", "cara download gambar pinterest"],
  h1: "Download Gambar Pinterest Gratis",
  subtitle:
    "Download gambar, thumbnail, GIF, atau video Pinterest apa pun dengan kualitas HD asli. Tanpa login, tanpa watermark, 100% gratis.",
  placeholder: "Tempel link Pinterest kamu di sini...",
  howToTitle: "Cara Download Gambar Pinterest dalam 3 Langkah",
  steps: [
    {
      title: "Cari gambarnya di Pinterest",
      description:
        "Buka Pinterest, cari gambar yang mau kamu simpan, lalu ketuk tombol Bagikan untuk menyalin link-nya.",
    },
    {
      title: "Tempel link ke SavePinner",
      description: "Tempel link yang sudah disalin ke kolom di atas, lalu klik tombol Download.",
    },
    {
      title: "Download dengan kualitas asli",
      description:
        "Pilih ukuran yang kamu mau, lalu download gambarnya dengan kualitas HD. Tanpa kompresi, tanpa watermark.",
    },
  ],
  faq: [
    {
      question: "Bagaimana cara download gambar Pinterest tanpa watermark?",
      answer:
        "Semua gambar yang kamu download lewat SavePinner diambil langsung dari CDN Pinterest dengan kualitas aslinya, dan kami tidak menambahkan watermark apa pun.",
    },
    {
      question: "Bisakah download gambar Pinterest dengan resolusi penuh?",
      answer:
        "Bisa. Pinterest secara default menampilkan thumbnail yang sudah dikompres, tapi kami mengambil URL gambar asli dari CDN-nya sehingga kamu dapat versi resolusi penuh.",
    },
    {
      question: "Apakah bisa dipakai di HP Android dan iPhone?",
      answer:
        "Bisa. SavePinner jalan di semua perangkat — Android, iPhone, iPad, maupun laptop. Cukup tempel link pin lalu download, tanpa install aplikasi.",
    },
    {
      question: "Apakah download video Pinterest juga gratis?",
      answer:
        "Gratis. Tool download video Pinterest kami sepenuhnya gratis dengan kualitas HD dan tanpa perlu login.",
      links: [{ text: "Tool download video Pinterest", href: LOCALE_PATHS.id.video }],
    },
    {
      question: "Format link apa saja yang didukung?",
      answer:
        "Kami mendukung link pinterest.com/pin/, link pendek pin.it, dan domain Pinterest dari berbagai negara termasuk pinterest.id.",
    },
    {
      question: "Apakah kualitas gambarnya turun setelah didownload?",
      answer:
        "Tidak. Kami mengambil gambar asli dari CDN Pinterest (i.pinimg.com/originals/), jadi kualitasnya persis sama dengan saat diunggah.",
    },
  ],
  related: tools("id", "home"),
};

const ID_VIDEO: ToolPageContent = {
  slug: "video",
  locale: "id",
  path: LOCALE_PATHS.id.video,
  lastModified: "2026-07-27",
  videoPath: LOCALE_PATHS.id.video,
  seoTitle: "Pinterest Video Download — Simpan Video Pinterest HD Gratis",
  metaDescription:
    "Pinterest video download gratis dengan kualitas HD. Tanpa login, tanpa watermark, tanpa install aplikasi. Bisa di HP Android, iPhone, dan laptop.",
  keywords: ["pinterest video download", "download video pinterest", "cara download video pinterest"],
  h1: "Pinterest Video Download — Simpan Video HD Gratis",
  subtitle:
    "Tempel link video Pinterest mana pun dan download dengan kualitas HD. Tanpa login, tanpa watermark, 100% gratis.",
  placeholder: "Tempel link video Pinterest di sini...",
  howToTitle: "Cara Download Video Pinterest dalam 3 Langkah",
  steps: [
    {
      title: "Salin link videonya",
      description: "Buka video di Pinterest, ketuk tombol Bagikan, lalu pilih “Salin link”.",
    },
    {
      title: "Tempel link di sini",
      description: "Tempel link tadi ke kolom di atas lalu klik Download untuk memprosesnya.",
    },
    {
      title: "Simpan videonya",
      description:
        "Pilih kualitas yang tersedia, lalu simpan file MP4-nya ke HP atau laptop kamu. Tanpa watermark.",
    },
  ],
  faq: [
    {
      question: "Bagaimana cara download video Pinterest di HP?",
      answer:
        "Salin link video dari aplikasi Pinterest, buka halaman ini, tempel link-nya, lalu ketuk Download. Caranya sama di Android maupun iPhone dan tidak perlu install aplikasi apa pun.",
    },
    {
      question: "Kualitas video apa yang bisa didownload?",
      answer:
        "Kami mengambil file MP4 dengan kualitas tertinggi yang disediakan Pinterest untuk video tersebut, biasanya 720p. Versi lain yang disediakan Pinterest berupa streaming terpotong sehingga tidak bisa disimpan sebagai satu file utuh.",
    },
    {
      question: "Apakah videonya ada watermark?",
      answer:
        "Tidak ada. File diambil apa adanya dari CDN Pinterest, kami tidak menambahkan logo atau watermark apa pun.",
    },
    {
      question: "Bisa download gambar juga?",
      answer:
        "Bisa. Pakai tool download gambar Pinterest kami untuk menyimpan foto, pin, dan thumbnail dengan resolusi asli.",
      links: [{ text: "tool download gambar Pinterest", href: LOCALE_PATHS.id.home }],
    },
    {
      question: "Perlu daftar atau bayar?",
      answer: "Tidak perlu. Tanpa akun, tanpa email, tanpa biaya. Tinggal tempel link lalu download.",
    },
    {
      question: "Jenis video pin apa saja yang didukung?",
      answer:
        "Semua pin video publik, termasuk Idea Pin dan Story yang berisi video. Pin privat atau yang sudah dihapus tidak bisa didownload.",
    },
  ],
  related: tools("id", "video"),
};

const PT_HOME: ToolPageContent = {
  slug: "home",
  locale: "pt",
  path: LOCALE_PATHS.pt.home,
  lastModified: "2026-07-27",
  videoPath: LOCALE_PATHS.pt.video,
  seoTitle: "Baixar Imagens do Pinterest Grátis em HD sem Marca d'Água",
  metaDescription:
    "Baixe imagens do Pinterest em qualidade HD original, grátis e sem login. Compatível com JPG, PNG, GIF e WebP. Sem marca d'água e sem instalar nada.",
  keywords: ["baixar imagens do pinterest", "baixar fotos do pinterest", "download de imagens do pinterest"],
  h1: "Baixar imagens do Pinterest grátis",
  subtitle:
    "Baixe qualquer pin do Pinterest — imagem, miniatura, GIF ou vídeo — na qualidade HD original. Sem login, sem marca d'água e 100% grátis.",
  placeholder: "Cole aqui o seu link do Pinterest...",
  howToTitle: "Como baixar imagens do Pinterest em 3 passos",
  steps: [
    {
      title: "Encontre a imagem no Pinterest",
      description:
        "Abra o Pinterest, encontre o pin que você quer salvar e toque no botão Compartilhar para copiar o link.",
    },
    {
      title: "Cole o link no SavePinner",
      description: "Cole o link copiado no campo acima e clique no botão Baixar.",
    },
    {
      title: "Baixe na qualidade original",
      description:
        "Escolha o tamanho que preferir e baixe a imagem em qualidade HD. Sem compressão e sem marca d'água.",
    },
  ],
  faq: [
    {
      question: "Como baixar imagens do Pinterest sem marca d'água?",
      answer:
        "Todas as imagens baixadas pelo SavePinner vêm direto do CDN do Pinterest na qualidade original, sem nenhuma marca d'água adicionada por nós.",
    },
    {
      question: "Dá para baixar imagens do Pinterest em resolução total?",
      answer:
        "Sim. O Pinterest mostra miniaturas comprimidas por padrão, mas nós extraímos a URL da imagem original no CDN, então você recebe a versão em resolução total.",
    },
    {
      question: "Funciona no celular Android e no iPhone?",
      answer:
        "Sim. O SavePinner funciona em qualquer aparelho — Android, iPhone, iPad e computador. É só colar o link do pin e baixar, sem instalar aplicativo.",
    },
    {
      question: "Baixar vídeos do Pinterest também é grátis?",
      answer:
        "Sim, nosso baixador de vídeos do Pinterest é totalmente gratuito, em qualidade HD e sem precisar fazer login.",
      links: [{ text: "baixador de vídeos do Pinterest", href: LOCALE_PATHS.pt.video }],
    },
    {
      question: "Quais formatos de link são aceitos?",
      answer:
        "Aceitamos links pinterest.com/pin/, links curtos pin.it e os domínios do Pinterest de cada país, incluindo pinterest.com.br.",
    },
    {
      question: "A imagem perde qualidade ao baixar?",
      answer:
        "Não. Buscamos a imagem original no CDN do Pinterest (i.pinimg.com/originals/), então a qualidade é exatamente a mesma do envio.",
    },
  ],
  related: tools("pt", "home"),
};

const PT_VIDEO: ToolPageContent = {
  slug: "video",
  locale: "pt",
  path: LOCALE_PATHS.pt.video,
  lastModified: "2026-07-27",
  videoPath: LOCALE_PATHS.pt.video,
  seoTitle: "Baixar Vídeo do Pinterest Grátis — Qualidade HD Online",
  metaDescription:
    "Baixe vídeos do Pinterest em qualidade HD, grátis e sem login. Sem marca d'água e sem instalar programas. Funciona no celular e no computador.",
  keywords: ["baixar video do pinterest", "baixar videos do pinterest", "download de video do pinterest"],
  h1: "Baixar vídeo do Pinterest em HD",
  subtitle:
    "Cole o link de qualquer vídeo do Pinterest e baixe em qualidade HD. Sem login, sem marca d'água e 100% grátis.",
  placeholder: "Cole aqui o link do vídeo do Pinterest...",
  howToTitle: "Como baixar vídeo do Pinterest em 3 passos",
  steps: [
    {
      title: "Copie o link do vídeo",
      description: "Abra o vídeo no Pinterest, toque em Compartilhar e escolha “Copiar link”.",
    },
    {
      title: "Cole o link aqui",
      description: "Cole o link no campo acima e clique em Baixar para processar.",
    },
    {
      title: "Salve o vídeo em HD",
      description:
        "Escolha a qualidade disponível e salve o arquivo MP4 no celular ou no computador. Sem marca d'água.",
    },
  ],
  faq: [
    {
      question: "Como baixar vídeo do Pinterest no celular?",
      answer:
        "Copie o link do vídeo no aplicativo do Pinterest, volte aqui, cole o link e toque em Baixar. Funciona igual no Android e no iPhone, sem instalar nenhum aplicativo.",
    },
    {
      question: "Em qual qualidade os vídeos são baixados?",
      answer:
        "Baixamos o arquivo MP4 na maior qualidade que o Pinterest publica para aquele vídeo, normalmente 720p. As outras versões que o Pinterest oferece são streaming fragmentado e não podem ser salvas como um arquivo único.",
    },
    {
      question: "Os vídeos vêm com marca d'água?",
      answer:
        "Não. O arquivo é baixado exatamente como está no CDN do Pinterest, sem nenhum logo ou marca d'água adicionada por nós.",
    },
    {
      question: "Também dá para baixar imagens?",
      answer:
        "Sim, use nosso baixador de imagens do Pinterest para salvar fotos, pins e miniaturas na resolução original.",
      links: [{ text: "baixador de imagens do Pinterest", href: LOCALE_PATHS.pt.home }],
    },
    {
      question: "Precisa se cadastrar ou pagar?",
      answer: "Não. Sem conta, sem e-mail e sem custo. É só colar o link e baixar.",
    },
    {
      question: "Quais pins de vídeo são compatíveis?",
      answer:
        "Qualquer pin de vídeo público, incluindo Idea Pins e Stories com vídeo. Pins privados ou excluídos não podem ser baixados.",
    },
  ],
  related: tools("pt", "video"),
};

export const LOCALE_PAGES: Record<PrefixedLocale, Record<LocalePageKey, ToolPageContent>> = {
  es: { home: ES_HOME, video: ES_VIDEO },
  id: { home: ID_HOME, video: ID_VIDEO },
  pt: { home: PT_HOME, video: PT_VIDEO },
};
