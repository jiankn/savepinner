import { LOCALES, type Locale } from "@/lib/i18n";
import {
  ADDITIONAL_TRUST_PAGES,
  ADDITIONAL_TRUST_PATHS,
} from "@/lib/trust-content-additional";

export type TrustPageKey = "privacy" | "about";
export const TRUST_LOCALES = LOCALES;
export type TrustLocale = (typeof TRUST_LOCALES)[number];

export const TRUST_PATHS: Record<TrustLocale, Record<TrustPageKey, string>> = {
  en: { privacy: "/privacy/", about: "/about/" },
  es: { privacy: "/es/privacidad/", about: "/es/acerca-de/" },
  id: { privacy: "/id/privasi/", about: "/id/tentang/" },
  pt: { privacy: "/pt/privacidade/", about: "/pt/sobre/" },
  ...ADDITIONAL_TRUST_PATHS,
};

export function isTrustLocale(locale: Locale | string): locale is TrustLocale {
  return (TRUST_LOCALES as readonly string[]).includes(locale);
}

export interface TrustLink {
  text: string;
  href: string;
}

export type TrustText = Array<string | TrustLink>;

export interface TrustTable {
  headers: string[];
  rows: string[][];
}

export interface TrustSection {
  heading: string;
  paragraphs?: TrustText[];
  bullets?: TrustText[];
  table?: TrustTable;
}

export interface TrustPageContent {
  key: TrustPageKey;
  locale: Locale;
  path: string;
  seoTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  sections: TrustSection[];
  lastUpdatedLabel: string;
  lastUpdated: string;
  /** Machine-readable ISO date used by the sitemap. */
  lastModified: string;
}

const GOOGLE_PARTNER_SITES = "https://policies.google.com/technologies/partner-sites";
const GOOGLE_AD_SETTINGS = "https://adssettings.google.com/";

const EN_PRIVACY: TrustPageContent = {
  key: "privacy",
  locale: "en",
  path: TRUST_PATHS.en.privacy,
  seoTitle: "Privacy Policy — SavePinner",
  metaDescription:
    "How SavePinner processes links, media requests, technical data, advertising cookies and privacy choices.",
  title: "Privacy Policy",
  intro:
    "SavePinner is designed to process only the information needed to resolve a request, keep the service secure and, when enabled, support the service with advertising.",
  sections: [
    {
      heading: "Information we process",
      table: {
        headers: ["Information", "Why it is processed", "Retention"],
        rows: [
          [
            "The Pinterest URL you submit",
            "To validate and resolve that single request",
            "Not intentionally retained after the request; full submitted URLs are excluded from application logs",
          ],
          [
            "Requested media",
            "To return a direct link or stream the file to your device",
            "Not stored as a media library; network and hosting caches may hold temporary copies",
          ],
          [
            "IP address and request metadata",
            "Rate limiting, fraud prevention, security and service delivery",
            "Used briefly by the application; hosting providers may retain security and access records under their own policies",
          ],
          [
            "Technical diagnostics",
            "To investigate errors and reliability",
            "Application logs use coarse error, timing and file-size data and exclude full URLs, query strings and download tokens",
          ],
        ],
      },
    },
    {
      heading: "Accounts, uploads and contact",
      paragraphs: [
        [
          "You do not need an account and SavePinner does not ask for a Pinterest password. Media is requested on demand and is not uploaded into a permanent SavePinner library. If you email ",
          { text: "contact@savepinner.com", href: "mailto:contact@savepinner.com" },
          ", we process your email address and message to answer you and keep necessary correspondence.",
        ],
      ],
    },
    {
      heading: "Advertising, cookies and consent",
      paragraphs: [
        [
          "When advertising is enabled, third-party vendors, including Google, may use cookies, local storage, web beacons, IP addresses or other identifiers to serve, limit, personalize and measure ads. Google explains ",
          { text: "how it uses information from partner sites", href: GOOGLE_PARTNER_SITES },
          ".",
        ],
        [
          "Where required, a Google-certified consent management platform is used to request and record choices before personalized advertising. You can also review or change personalized advertising choices in ",
          { text: "Google Ads Settings", href: GOOGLE_AD_SETTINGS },
          ". Rejecting personalized ads does not necessarily remove all ads; non-personalized or contextual ads may still appear.",
        ],
      ],
    },
    {
      heading: "Service providers and international processing",
      paragraphs: [
        [
          "Hosting, security, email and advertising providers process limited data to provide their services. Resolving a Pin also requires a server request to the public Pinterest page supplied by you. These providers may process data in countries other than your own under their applicable terms and privacy safeguards.",
        ],
      ],
    },
    {
      heading: "Your privacy rights",
      paragraphs: [
        [
          "Depending on where you live, you may have rights to access, correct, delete, restrict or object to processing, and to withdraw consent. SavePinner does not sell personal information for money. To make a request, use the ",
          { text: "contact page", href: "/contact/" },
          ". We may need enough information to verify and answer the request.",
        ],
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        [
          "We may update this policy when the service, providers or legal requirements change. Material revisions will be published here with a new revision date.",
        ],
      ],
    },
  ],
  lastUpdatedLabel: "Last updated",
  lastUpdated: "July 27, 2026",
  lastModified: "2026-07-27",
};

const ES_PRIVACY: TrustPageContent = {
  key: "privacy",
  locale: "es",
  path: TRUST_PATHS.es.privacy,
  seoTitle: "Política de Privacidad — SavePinner",
  metaDescription:
    "Cómo trata SavePinner los enlaces, archivos solicitados, datos técnicos, cookies publicitarias y opciones de privacidad.",
  title: "Política de privacidad",
  intro:
    "SavePinner trata únicamente la información necesaria para resolver cada solicitud, proteger el servicio y, cuando esté habilitada, financiarlo mediante publicidad.",
  sections: [
    {
      heading: "Información que tratamos",
      table: {
        headers: ["Información", "Finalidad", "Conservación"],
        rows: [
          [
            "La URL de Pinterest que envías",
            "Validar y resolver esa solicitud concreta",
            "No se conserva de forma intencionada al terminar; los registros de la aplicación excluyen las URL completas",
          ],
          [
            "El archivo solicitado",
            "Devolver un enlace directo o transmitir el archivo a tu dispositivo",
            "No se guarda en una biblioteca; las redes y el alojamiento pueden mantener copias temporales en caché",
          ],
          [
            "Dirección IP y metadatos de la solicitud",
            "Límites de uso, prevención del fraude, seguridad y entrega del servicio",
            "La aplicación los usa brevemente; el proveedor de alojamiento puede conservar registros de acceso y seguridad según su política",
          ],
          [
            "Diagnósticos técnicos",
            "Investigar errores y fiabilidad",
            "Los registros usan datos generales de error, tiempo y tamaño, sin URL completas, consultas ni tokens de descarga",
          ],
        ],
      },
    },
    {
      heading: "Cuentas, archivos y contacto",
      paragraphs: [
        [
          "No necesitas una cuenta y SavePinner nunca solicita tu contraseña de Pinterest. Los archivos se piden bajo demanda y no se suben a una biblioteca permanente. Si escribes a ",
          { text: "contact@savepinner.com", href: "mailto:contact@savepinner.com" },
          ", tratamos tu dirección y mensaje para responder y conservar la correspondencia necesaria.",
        ],
      ],
    },
    {
      heading: "Publicidad, cookies y consentimiento",
      paragraphs: [
        [
          "Cuando la publicidad esté habilitada, proveedores externos, incluido Google, podrán usar cookies, almacenamiento local, balizas web, direcciones IP u otros identificadores para mostrar, limitar, personalizar y medir anuncios. Google explica ",
          { text: "cómo utiliza la información de sitios asociados", href: GOOGLE_PARTNER_SITES },
          ".",
        ],
        [
          "Cuando sea obligatorio, utilizamos una plataforma de gestión del consentimiento certificada por Google antes de mostrar publicidad personalizada. También puedes revisar tus opciones en ",
          { text: "Configuración de anuncios de Google", href: GOOGLE_AD_SETTINGS },
          ". Rechazar anuncios personalizados no elimina necesariamente toda la publicidad; pueden mostrarse anuncios no personalizados o contextuales.",
        ],
      ],
    },
    {
      heading: "Proveedores y tratamiento internacional",
      paragraphs: [
        [
          "Los proveedores de alojamiento, seguridad, correo y publicidad tratan datos limitados para prestar sus servicios. Resolver un pin también requiere que nuestro servidor solicite la página pública de Pinterest indicada por ti. Estos proveedores pueden tratar datos fuera de tu país con las garantías aplicables.",
        ],
      ],
    },
    {
      heading: "Tus derechos",
      paragraphs: [
        [
          "Según tu lugar de residencia, puedes tener derechos de acceso, rectificación, supresión, limitación, oposición y retirada del consentimiento. SavePinner no vende información personal a cambio de dinero. Envía tu solicitud desde la ",
          { text: "página de contacto", href: "/contact/" },
          "; podremos pedir la información necesaria para verificarla y responder.",
        ],
      ],
    },
    {
      heading: "Cambios en esta política",
      paragraphs: [
        [
          "Podemos actualizar esta política cuando cambien el servicio, los proveedores o los requisitos legales. Las modificaciones relevantes se publicarán aquí con una nueva fecha de revisión.",
        ],
      ],
    },
  ],
  lastUpdatedLabel: "Última actualización",
  lastUpdated: "27 de julio de 2026",
  lastModified: "2026-07-27",
};

const ID_PRIVACY: TrustPageContent = {
  key: "privacy",
  locale: "id",
  path: TRUST_PATHS.id.privacy,
  seoTitle: "Kebijakan Privasi — SavePinner",
  metaDescription:
    "Cara SavePinner memproses link, permintaan media, data teknis, cookie iklan, dan pilihan privasi.",
  title: "Kebijakan Privasi",
  intro:
    "SavePinner hanya memproses informasi yang diperlukan untuk menyelesaikan permintaan, menjaga keamanan layanan, dan—jika diaktifkan—mendukung layanan melalui iklan.",
  sections: [
    {
      heading: "Informasi yang kami proses",
      table: {
        headers: ["Informasi", "Tujuan", "Penyimpanan"],
        rows: [
          [
            "URL Pinterest yang kamu kirim",
            "Memvalidasi dan menyelesaikan satu permintaan tersebut",
            "Tidak sengaja disimpan setelah permintaan selesai; URL lengkap dikecualikan dari log aplikasi",
          ],
          [
            "Media yang diminta",
            "Memberikan link langsung atau mengalirkan file ke perangkatmu",
            "Tidak disimpan sebagai pustaka media; jaringan dan hosting dapat menyimpan salinan cache sementara",
          ],
          [
            "Alamat IP dan metadata permintaan",
            "Pembatasan penggunaan, pencegahan penyalahgunaan, keamanan, dan pengiriman layanan",
            "Digunakan singkat oleh aplikasi; penyedia hosting dapat menyimpan catatan akses dan keamanan sesuai kebijakannya",
          ],
          [
            "Diagnostik teknis",
            "Menyelidiki error dan keandalan",
            "Log memakai data umum tentang error, durasi, dan ukuran file tanpa URL lengkap, query, atau token download",
          ],
        ],
      },
    },
    {
      heading: "Akun, file, dan kontak",
      paragraphs: [
        [
          "Kamu tidak perlu membuat akun dan SavePinner tidak meminta kata sandi Pinterest. Media diminta saat diperlukan dan tidak diunggah ke pustaka permanen. Jika kamu mengirim email ke ",
          { text: "contact@savepinner.com", href: "mailto:contact@savepinner.com" },
          ", kami memproses alamat email dan pesanmu untuk menjawab serta menyimpan korespondensi yang diperlukan.",
        ],
      ],
    },
    {
      heading: "Iklan, cookie, dan persetujuan",
      paragraphs: [
        [
          "Saat iklan diaktifkan, vendor pihak ketiga, termasuk Google, dapat memakai cookie, penyimpanan lokal, web beacon, alamat IP, atau pengenal lain untuk menayangkan, membatasi, mempersonalisasi, dan mengukur iklan. Google menjelaskan ",
          { text: "cara menggunakan informasi dari situs partner", href: GOOGLE_PARTNER_SITES },
          ".",
        ],
        [
          "Jika diwajibkan, kami menggunakan platform pengelolaan persetujuan yang disertifikasi Google sebelum menayangkan iklan yang dipersonalisasi. Kamu juga dapat mengubah pilihan di ",
          { text: "Setelan Iklan Google", href: GOOGLE_AD_SETTINGS },
          ". Menolak iklan yang dipersonalisasi tidak selalu menghapus semua iklan; iklan nonpersonalisasi atau kontekstual masih dapat tampil.",
        ],
      ],
    },
    {
      heading: "Penyedia layanan dan pemrosesan internasional",
      paragraphs: [
        [
          "Penyedia hosting, keamanan, email, dan iklan memproses data terbatas untuk menjalankan layanannya. Menyelesaikan sebuah Pin juga memerlukan permintaan server ke halaman Pinterest publik yang kamu berikan. Data dapat diproses di negara lain berdasarkan ketentuan dan perlindungan privasi penyedia tersebut.",
        ],
      ],
    },
    {
      heading: "Hak privasimu",
      paragraphs: [
        [
          "Tergantung tempat tinggalmu, kamu mungkin berhak mengakses, memperbaiki, menghapus, membatasi, atau menolak pemrosesan, serta menarik persetujuan. SavePinner tidak menjual informasi pribadi untuk uang. Ajukan permintaan melalui ",
          { text: "halaman kontak", href: "/contact/" },
          "; kami mungkin memerlukan informasi yang cukup untuk memverifikasi dan menjawabnya.",
        ],
      ],
    },
    {
      heading: "Perubahan kebijakan",
      paragraphs: [
        [
          "Kami dapat memperbarui kebijakan ini jika layanan, penyedia, atau persyaratan hukum berubah. Perubahan penting akan diterbitkan di halaman ini dengan tanggal revisi baru.",
        ],
      ],
    },
  ],
  lastUpdatedLabel: "Terakhir diperbarui",
  lastUpdated: "27 Juli 2026",
  lastModified: "2026-07-27",
};

const PT_PRIVACY: TrustPageContent = {
  key: "privacy",
  locale: "pt",
  path: TRUST_PATHS.pt.privacy,
  seoTitle: "Política de Privacidade — SavePinner",
  metaDescription:
    "Como o SavePinner trata links, solicitações de mídia, dados técnicos, cookies de publicidade e escolhas de privacidade.",
  title: "Política de Privacidade",
  intro:
    "O SavePinner trata apenas as informações necessárias para concluir cada solicitação, proteger o serviço e, quando ativada, sustentá-lo por meio de publicidade.",
  sections: [
    {
      heading: "Informações que tratamos",
      table: {
        headers: ["Informação", "Finalidade", "Retenção"],
        rows: [
          [
            "A URL do Pinterest que você envia",
            "Validar e resolver aquela solicitação",
            "Não é mantida intencionalmente após a solicitação; URLs completas são excluídas dos logs do aplicativo",
          ],
          [
            "A mídia solicitada",
            "Fornecer um link direto ou transmitir o arquivo ao seu dispositivo",
            "Não é armazenada em uma biblioteca; a rede e a hospedagem podem manter cópias temporárias em cache",
          ],
          [
            "Endereço IP e metadados da solicitação",
            "Limites de uso, prevenção de abuso, segurança e entrega do serviço",
            "Usados brevemente pelo aplicativo; a hospedagem pode manter registros de acesso e segurança conforme sua política",
          ],
          [
            "Diagnósticos técnicos",
            "Investigar erros e confiabilidade",
            "Os logs usam dados gerais de erro, tempo e tamanho, sem URLs completas, consultas ou tokens de download",
          ],
        ],
      },
    },
    {
      heading: "Contas, arquivos e contato",
      paragraphs: [
        [
          "Você não precisa criar conta e o SavePinner não pede sua senha do Pinterest. A mídia é solicitada sob demanda e não vai para uma biblioteca permanente. Ao escrever para ",
          { text: "contact@savepinner.com", href: "mailto:contact@savepinner.com" },
          ", tratamos seu endereço e sua mensagem para responder e manter a correspondência necessária.",
        ],
      ],
    },
    {
      heading: "Publicidade, cookies e consentimento",
      paragraphs: [
        [
          "Quando a publicidade estiver ativada, fornecedores terceiros, incluindo o Google, poderão usar cookies, armazenamento local, web beacons, endereços IP ou outros identificadores para exibir, limitar, personalizar e medir anúncios. O Google explica ",
          { text: "como usa informações de sites parceiros", href: GOOGLE_PARTNER_SITES },
          ".",
        ],
        [
          "Quando exigido, usamos uma plataforma de gestão de consentimento certificada pelo Google antes de exibir publicidade personalizada. Você também pode alterar suas escolhas nas ",
          { text: "Configurações de anúncios do Google", href: GOOGLE_AD_SETTINGS },
          ". Recusar anúncios personalizados não elimina necessariamente toda publicidade; anúncios não personalizados ou contextuais ainda podem aparecer.",
        ],
      ],
    },
    {
      heading: "Fornecedores e tratamento internacional",
      paragraphs: [
        [
          "Fornecedores de hospedagem, segurança, e-mail e publicidade tratam dados limitados para prestar seus serviços. Resolver um Pin também exige uma solicitação do servidor à página pública do Pinterest informada por você. Esses fornecedores podem tratar dados em outros países com as proteções aplicáveis.",
        ],
      ],
    },
    {
      heading: "Seus direitos",
      paragraphs: [
        [
          "Conforme o local onde você mora, pode haver direitos de acesso, correção, exclusão, limitação, oposição e retirada do consentimento. O SavePinner não vende informações pessoais por dinheiro. Envie a solicitação pela ",
          { text: "página de contato", href: "/contact/" },
          "; poderemos pedir informações suficientes para verificar e responder.",
        ],
      ],
    },
    {
      heading: "Alterações nesta política",
      paragraphs: [
        [
          "Podemos atualizar esta política quando o serviço, os fornecedores ou os requisitos legais mudarem. Alterações relevantes serão publicadas aqui com uma nova data de revisão.",
        ],
      ],
    },
  ],
  lastUpdatedLabel: "Última atualização",
  lastUpdated: "27 de julho de 2026",
  lastModified: "2026-07-27",
};

const EN_ABOUT: TrustPageContent = {
  key: "about",
  locale: "en",
  path: TRUST_PATHS.en.about,
  seoTitle: "About SavePinner",
  metaDescription:
    "Learn who operates SavePinner, how the service works, how it is funded and how to report errors or rights concerns.",
  title: "About SavePinner",
  intro:
    "SavePinner is an independent web utility maintained by the SavePinner team to help people handle public Pinterest media links they are authorized to use.",
  sections: [
    {
      heading: "What the service does",
      paragraphs: [
        [
          "A visitor submits a public Pin URL. SavePinner validates that URL, requests the public page on demand and returns media options that are technically available for that request. No Pinterest login is requested, and private or deleted Pins are not supported.",
        ],
      ],
    },
    {
      heading: "Who operates SavePinner",
      paragraphs: [
        [
          "The service is operated and maintained by the SavePinner team. Our public support and correction address is ",
          { text: "contact@savepinner.com", href: "mailto:contact@savepinner.com" },
          ". We normally reply within 3–5 business days.",
        ],
      ],
    },
    {
      heading: "Independence and funding",
      paragraphs: [
        [
          "SavePinner is not affiliated with, sponsored by or endorsed by Pinterest. The service may be funded by advertising. Advertising does not change the order or technical selection of download results, and ads are visually separated from product controls.",
        ],
      ],
    },
    {
      heading: "Responsible use and copyright",
      paragraphs: [
        [
          "A public URL does not remove copyright, privacy, publicity or contractual rights. Use SavePinner only for content you own, content you have permission to download, or uses otherwise permitted by applicable law. Rights holders can follow our ",
          { text: "DMCA process", href: "/dmca/" },
          ".",
        ],
      ],
    },
    {
      heading: "How we maintain the service",
      bullets: [
        ["Product claims are checked against current service behavior and relevant official documentation."],
        ["Reliability diagnostics avoid full submitted URLs, query strings and download tokens."],
        ["Material policy, privacy and product changes are reflected on the relevant public pages."],
      ],
    },
    {
      heading: "Corrections and feedback",
      paragraphs: [
        [
          "If a page is inaccurate, a download fails or you believe content should not be processed, send the URL, a short explanation and any supporting details through our ",
          { text: "contact page", href: "/contact/" },
          ". Do not send passwords or private account information.",
        ],
      ],
    },
  ],
  lastUpdatedLabel: "Last updated",
  lastUpdated: "July 27, 2026",
  lastModified: "2026-07-27",
};

const ES_ABOUT: TrustPageContent = {
  key: "about",
  locale: "es",
  path: TRUST_PATHS.es.about,
  seoTitle: "Acerca de SavePinner",
  metaDescription:
    "Quién gestiona SavePinner, cómo funciona el servicio, cómo se financia y cómo informar de errores o problemas de derechos.",
  title: "Acerca de SavePinner",
  intro:
    "SavePinner es una herramienta web independiente mantenida por el equipo de SavePinner para gestionar enlaces públicos de Pinterest que el usuario esté autorizado a utilizar.",
  sections: [
    {
      heading: "Qué hace el servicio",
      paragraphs: [
        [
          "El visitante envía la URL de un pin público. SavePinner la valida, solicita la página pública en ese momento y muestra las opciones de archivo técnicamente disponibles. No pedimos credenciales de Pinterest y no admitimos pines privados ni eliminados.",
        ],
      ],
    },
    {
      heading: "Quién gestiona SavePinner",
      paragraphs: [
        [
          "El servicio está gestionado y mantenido por el equipo de SavePinner. Nuestro correo público de soporte y correcciones es ",
          { text: "contact@savepinner.com", href: "mailto:contact@savepinner.com" },
          ". Normalmente respondemos en 3–5 días laborables.",
        ],
      ],
    },
    {
      heading: "Independencia y financiación",
      paragraphs: [
        [
          "SavePinner no está afiliado, patrocinado ni respaldado por Pinterest. El servicio puede financiarse mediante publicidad. Los anuncios no cambian el orden ni la selección técnica de los resultados y se separan visualmente de los controles del producto.",
        ],
      ],
    },
    {
      heading: "Uso responsable y derechos de autor",
      paragraphs: [
        [
          "Que una URL sea pública no elimina los derechos de autor, privacidad, imagen o contrato. Usa SavePinner solo con contenido propio, autorizado o permitido por la legislación aplicable. Los titulares de derechos pueden seguir nuestro ",
          { text: "procedimiento DMCA", href: "/dmca/" },
          ".",
        ],
      ],
    },
    {
      heading: "Cómo mantenemos el servicio",
      bullets: [
        ["Contrastamos las afirmaciones del producto con su funcionamiento actual y la documentación oficial pertinente."],
        ["Los diagnósticos evitan las URL completas enviadas, las consultas y los tokens de descarga."],
        ["Los cambios relevantes de producto, privacidad y políticas se reflejan en las páginas públicas correspondientes."],
      ],
    },
    {
      heading: "Correcciones y comentarios",
      paragraphs: [
        [
          "Si una página contiene un error, una descarga falla o crees que un contenido no debe procesarse, envía la URL, una explicación breve y los datos de apoyo desde la ",
          { text: "página de contacto", href: "/contact/" },
          ". No envíes contraseñas ni información privada de cuentas.",
        ],
      ],
    },
  ],
  lastUpdatedLabel: "Última actualización",
  lastUpdated: "27 de julio de 2026",
  lastModified: "2026-07-27",
};

const ID_ABOUT: TrustPageContent = {
  key: "about",
  locale: "id",
  path: TRUST_PATHS.id.about,
  seoTitle: "Tentang SavePinner",
  metaDescription:
    "Siapa yang mengelola SavePinner, cara kerja layanan, sumber pendanaan, serta cara melaporkan kesalahan atau masalah hak.",
  title: "Tentang SavePinner",
  intro:
    "SavePinner adalah utilitas web independen yang dikelola tim SavePinner untuk membantu pengguna menangani link media Pinterest publik yang memang boleh mereka gunakan.",
  sections: [
    {
      heading: "Apa yang dilakukan layanan ini",
      paragraphs: [
        [
          "Pengunjung mengirim URL Pin publik. SavePinner memvalidasi URL tersebut, meminta halaman publik saat itu juga, lalu menampilkan pilihan media yang secara teknis tersedia. Kami tidak meminta login Pinterest dan tidak mendukung Pin privat atau yang sudah dihapus.",
        ],
      ],
    },
    {
      heading: "Siapa yang mengelola SavePinner",
      paragraphs: [
        [
          "Layanan ini dioperasikan dan dipelihara oleh tim SavePinner. Alamat publik untuk dukungan dan koreksi adalah ",
          { text: "contact@savepinner.com", href: "mailto:contact@savepinner.com" },
          ". Kami biasanya membalas dalam 3–5 hari kerja.",
        ],
      ],
    },
    {
      heading: "Independensi dan pendanaan",
      paragraphs: [
        [
          "SavePinner tidak berafiliasi, disponsori, atau didukung oleh Pinterest. Layanan ini dapat didanai melalui iklan. Iklan tidak mengubah urutan atau pemilihan teknis hasil download dan dipisahkan secara visual dari kontrol produk.",
        ],
      ],
    },
    {
      heading: "Penggunaan yang bertanggung jawab dan hak cipta",
      paragraphs: [
        [
          "URL publik tidak menghapus hak cipta, privasi, hak publisitas, atau hak kontraktual. Gunakan SavePinner hanya untuk konten milikmu, konten yang sudah diizinkan, atau penggunaan yang dibolehkan hukum. Pemegang hak dapat mengikuti ",
          { text: "proses DMCA", href: "/dmca/" },
          ".",
        ],
      ],
    },
    {
      heading: "Cara kami memelihara layanan",
      bullets: [
        ["Klaim produk diperiksa berdasarkan perilaku layanan saat ini dan dokumentasi resmi yang relevan."],
        ["Diagnostik keandalan menghindari URL lengkap, query string, dan token download."],
        ["Perubahan penting pada produk, privasi, dan kebijakan dicantumkan di halaman publik yang sesuai."],
      ],
    },
    {
      heading: "Koreksi dan masukan",
      paragraphs: [
        [
          "Jika ada informasi yang tidak akurat, download gagal, atau kamu yakin suatu konten tidak boleh diproses, kirim URL, penjelasan singkat, dan bukti pendukung melalui ",
          { text: "halaman kontak", href: "/contact/" },
          ". Jangan mengirim kata sandi atau informasi akun pribadi.",
        ],
      ],
    },
  ],
  lastUpdatedLabel: "Terakhir diperbarui",
  lastUpdated: "27 Juli 2026",
  lastModified: "2026-07-27",
};

const PT_ABOUT: TrustPageContent = {
  key: "about",
  locale: "pt",
  path: TRUST_PATHS.pt.about,
  seoTitle: "Sobre o SavePinner",
  metaDescription:
    "Quem opera o SavePinner, como o serviço funciona, como é financiado e como relatar erros ou questões de direitos.",
  title: "Sobre o SavePinner",
  intro:
    "O SavePinner é uma ferramenta web independente mantida pela equipe SavePinner para ajudar usuários a lidar com links públicos de mídia do Pinterest que estejam autorizados a usar.",
  sections: [
    {
      heading: "O que o serviço faz",
      paragraphs: [
        [
          "O visitante envia a URL de um Pin público. O SavePinner valida a URL, solicita a página pública naquele momento e mostra as opções de mídia tecnicamente disponíveis. Não pedimos login do Pinterest e não aceitamos Pins privados ou excluídos.",
        ],
      ],
    },
    {
      heading: "Quem opera o SavePinner",
      paragraphs: [
        [
          "O serviço é operado e mantido pela equipe SavePinner. Nosso endereço público para suporte e correções é ",
          { text: "contact@savepinner.com", href: "mailto:contact@savepinner.com" },
          ". Normalmente respondemos em 3–5 dias úteis.",
        ],
      ],
    },
    {
      heading: "Independência e financiamento",
      paragraphs: [
        [
          "O SavePinner não é afiliado, patrocinado nem endossado pelo Pinterest. O serviço pode ser financiado por publicidade. Os anúncios não alteram a ordem nem a seleção técnica dos resultados e ficam visualmente separados dos controles do produto.",
        ],
      ],
    },
    {
      heading: "Uso responsável e direitos autorais",
      paragraphs: [
        [
          "Uma URL pública não elimina direitos autorais, de privacidade, de imagem ou contratuais. Use o SavePinner somente com conteúdo próprio, autorizado ou permitido pela legislação aplicável. Titulares de direitos podem seguir nosso ",
          { text: "processo de DMCA", href: "/dmca/" },
          ".",
        ],
      ],
    },
    {
      heading: "Como mantemos o serviço",
      bullets: [
        ["As afirmações do produto são verificadas com o comportamento atual do serviço e a documentação oficial relevante."],
        ["Os diagnósticos evitam URLs completas enviadas, consultas e tokens de download."],
        ["Mudanças relevantes de produto, privacidade e políticas são refletidas nas páginas públicas correspondentes."],
      ],
    },
    {
      heading: "Correções e comentários",
      paragraphs: [
        [
          "Se uma página estiver incorreta, um download falhar ou você acreditar que um conteúdo não deve ser processado, envie a URL, uma explicação curta e os dados de apoio pela ",
          { text: "página de contato", href: "/contact/" },
          ". Não envie senhas nem informações privadas de contas.",
        ],
      ],
    },
  ],
  lastUpdatedLabel: "Última atualização",
  lastUpdated: "27 de julho de 2026",
  lastModified: "2026-07-27",
};

export const TRUST_PAGES: Record<
  TrustLocale,
  Record<TrustPageKey, TrustPageContent>
> = {
  en: { privacy: EN_PRIVACY, about: EN_ABOUT },
  es: { privacy: ES_PRIVACY, about: ES_ABOUT },
  id: { privacy: ID_PRIVACY, about: ID_ABOUT },
  pt: { privacy: PT_PRIVACY, about: PT_ABOUT },
  ...ADDITIONAL_TRUST_PAGES,
};
