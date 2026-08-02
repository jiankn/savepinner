import type { UiMessages } from "@/lib/i18n";

export type AdditionalLocale = "fr" | "de" | "it" | "nl" | "ja" | "tr" | "pl";

const FR: UiMessages = {
  nav: { home: "Accueil", video: "Télécharger une vidéo", gif: "Télécharger un GIF", story: "Télécharger une Story" },
  form: {
    inputLabel: "Lien Pinterest", paste: "Coller", download: "Télécharger", working: "Traitement...",
    supports: "Compatible avec : pinterest.com/pin/ · liens courts pin.it · Tous les domaines nationaux",
    progress: ["Analyse du lien...", "Extraction du média...", "Préparation du téléchargement..."],
    clipboardUnavailable: "L’accès au presse-papiers est indisponible — collez le lien manuellement.",
    clipboardEmpty: "Votre presse-papiers est vide — copiez d’abord le lien d’une épingle.",
    clipboardDenied: "L’accès au presse-papiers a été refusé — collez le lien manuellement.",
    pasted: "Lien collé depuis le presse-papiers.", emptyInput: "Collez un lien Pinterest.",
    invalidUrl: "Saisissez un lien d’épingle Pinterest valide.", serviceUnavailable: "Le service est temporairement indisponible.",
    networkError: "Erreur réseau — vérifiez votre connexion et réessayez.",
  },
  badges: { ssl: "Sécurisé par SSL", noLogin: "Sans connexion", noWatermark: "Sans filigrane", free: "100 % gratuit" },
  howTo: { step: "Étape", videoCrossLinkPrefix: "Vous souhaitez enregistrer une vidéo ? Utilisez notre ", videoCrossLinkText: "outil de téléchargement de vidéos Pinterest" },
  faqHeading: "Questions fréquentes", relatedHeading: "Autres outils Pinterest gratuits",
  whyChoose: { heading: "Pourquoi choisir notre outil Pinterest ?", items: [
    { title: "Rapide et simple", description: "Enregistrez une image Pinterest en quelques secondes, sans étape compliquée." },
    { title: "Qualité HD originale", description: "Nous récupérons l’image en pleine résolution, pas une miniature compressée." },
    { title: "Sans inscription", description: "Aucun e-mail, compte ou identifiant. Collez le lien et téléchargez." },
  ] },
  result: {
    image: "Image · Qualité originale", gif: "GIF · Qualité originale · Animé", video: "Vidéo · Qualité HD", download: "Télécharger", open: "Ouvrir",
    thumbnail: "Miniature (236 px)", original: "Original", another: "Télécharger une autre épingle",
    cappedTitle: "Les téléchargements directs du jour sont épuisés",
    cappedBody: "SavePinner reçoit aujourd’hui plus de demandes que nos serveurs gratuits ne peuvent en traiter. Les téléchargements en un clic seront rétablis dans {eta}. Vous pouvez toujours ouvrir le fichier ci-dessous, puis faire un clic droit sur ordinateur ou un appui long sur mobile pour l’enregistrer.",
    pagesTitle: "Toutes les pages de cette Idea Pin", pagesHint: "Cette épingle est un diaporama. Enregistrez chaque page séparément :",
    pageLabel: "Page {n}", pageImage: "Image", pageVideo: "Vidéo",
  },
  error: { tryAgain: "Réessayer", checkAnother: "Vérifier un autre lien", hints: {
    INVALID_URL: "Le lien doit ressembler à https://www.pinterest.com/pin/123456789/ ou https://pin.it/abc123.",
    UNSUPPORTED_URL: "Seules les épingles publiques individuelles sont prises en charge — pas les profils, tableaux ou recherches.",
    REDIRECT_REJECTED: "Le lien court ne mène pas à une épingle Pinterest publique.", PIN_NOT_PUBLIC: "Les épingles privées, supprimées ou nécessitant une connexion sont inaccessibles.",
    MEDIA_NOT_FOUND: "L’épingle a peut-être été supprimée ou ne contient aucun média téléchargeable.", UNSUPPORTED_MEDIA: "Ce format n’est pas encore pris en charge.",
    RATE_LIMITED: "Attendez quelques secondes avant de réessayer.", DAILY_CAP_REACHED: "Les téléchargements en un clic sont réinitialisés à minuit UTC ; les liens directs restent disponibles.",
    UPSTREAM_BLOCKED: "Pinterest est peut-être temporairement inaccessible — réessayez dans un instant.", RESOLVE_TIMEOUT: "La demande a pris trop de temps — réessayez dans un instant.", NETWORK: "Vérifiez votre connexion Internet.",
  } },
  footer: { tagline: "Un outil gratuit pour télécharger des images, vidéos, GIF et miniatures Pinterest en qualité HD.", tools: "Outils", legal: "Informations légales", languages: "Langues", about: "À propos", privacy: "Confidentialité", terms: "Conditions d’utilisation", dmca: "DMCA", contact: "Contact",
    disclaimer: "SavePinner © 2026. SavePinner est indépendant et n’est ni affilié à Pinterest ni approuvé par Pinterest. Téléchargez uniquement les contenus que vous possédez ou êtes autorisé à utiliser." },
};

const DE: UiMessages = {
  nav: { home: "Startseite", video: "Video-Downloader", gif: "GIF-Downloader", story: "Story-Downloader" },
  form: {
    inputLabel: "Pinterest-Link", paste: "Einfügen", download: "Herunterladen", working: "Wird verarbeitet...",
    supports: "Unterstützt: pinterest.com/pin/ · pin.it-Kurzlinks · Alle Länderdomains",
    progress: ["Link wird geprüft...", "Medium wird extrahiert...", "Download wird vorbereitet..."],
    clipboardUnavailable: "Kein Zugriff auf die Zwischenablage — füge den Link manuell ein.", clipboardEmpty: "Die Zwischenablage ist leer — kopiere zuerst einen Pin-Link.",
    clipboardDenied: "Zugriff auf die Zwischenablage verweigert — füge den Link manuell ein.", pasted: "Aus der Zwischenablage eingefügt.",
    emptyInput: "Füge einen Pinterest-Link ein.", invalidUrl: "Gib einen gültigen Pinterest-Pin-Link ein.",
    serviceUnavailable: "Der Dienst ist vorübergehend nicht verfügbar.", networkError: "Netzwerkfehler — prüfe deine Verbindung und versuche es erneut.",
  },
  badges: { ssl: "SSL-gesichert", noLogin: "Ohne Anmeldung", noWatermark: "Ohne Wasserzeichen", free: "100 % kostenlos" },
  howTo: { step: "Schritt", videoCrossLinkPrefix: "Du möchtest Pinterest-Videos speichern? Nutze unseren ", videoCrossLinkText: "Pinterest-Video-Downloader" },
  faqHeading: "Häufig gestellte Fragen", relatedHeading: "Weitere kostenlose Pinterest-Tools",
  whyChoose: { heading: "Warum unseren Pinterest-Downloader verwenden?", items: [
    { title: "Schnell und einfach", description: "Lade Pinterest-Bilder in wenigen Sekunden ohne komplizierte Schritte herunter." },
    { title: "Originale HD-Qualität", description: "Wir laden die Originalauflösung statt einer komprimierten Vorschau." },
    { title: "Keine Registrierung", description: "Keine E-Mail, kein Konto, keine Anmeldung. Link einfügen und herunterladen." },
  ] },
  result: {
    image: "Bild · Originalqualität", gif: "GIF · Originalqualität · Animiert", video: "Video · HD-Qualität", download: "Herunterladen", open: "Öffnen",
    thumbnail: "Vorschaubild (236 px)", original: "Original", another: "Weiteren Pin herunterladen",
    cappedTitle: "Die direkten Downloads für heute sind aufgebraucht",
    cappedBody: "SavePinner erhält heute mehr Anfragen, als unsere kostenlosen Server verarbeiten können. Ein-Klick-Downloads sind in {eta} wieder verfügbar. Du kannst die Datei weiterhin unten öffnen und per Rechtsklick am Computer oder langem Drücken auf dem Handy speichern.",
    pagesTitle: "Alle Seiten dieses Idea Pins", pagesHint: "Dieser Pin ist eine Slideshow. Speichere jede Seite einzeln:",
    pageLabel: "Seite {n}", pageImage: "Bild", pageVideo: "Video",
  },
  error: { tryAgain: "Erneut versuchen", checkAnother: "Anderen Link prüfen", hints: {
    INVALID_URL: "Der Link sollte wie https://www.pinterest.com/pin/123456789/ oder https://pin.it/abc123 aussehen.",
    UNSUPPORTED_URL: "Es werden nur einzelne öffentliche Pins unterstützt — keine Profile, Pinnwände oder Suchseiten.",
    REDIRECT_REJECTED: "Der Kurzlink führt nicht zu einem öffentlichen Pinterest-Pin.", PIN_NOT_PUBLIC: "Private, gelöschte oder anmeldepflichtige Pins sind nicht zugänglich.",
    MEDIA_NOT_FOUND: "Der Pin wurde möglicherweise gelöscht oder enthält keine herunterladbaren Medien.", UNSUPPORTED_MEDIA: "Dieses Medienformat wird noch nicht unterstützt.",
    RATE_LIMITED: "Warte einige Sekunden und versuche es erneut.", DAILY_CAP_REACHED: "Ein-Klick-Downloads werden um Mitternacht UTC zurückgesetzt; direkte Links funktionieren weiterhin.",
    UPSTREAM_BLOCKED: "Pinterest ist möglicherweise vorübergehend nicht erreichbar — versuche es gleich noch einmal.", RESOLVE_TIMEOUT: "Die Anfrage dauerte zu lange — versuche es erneut.", NETWORK: "Prüfe deine Internetverbindung.",
  } },
  footer: { tagline: "Kostenloser Download von Pinterest-Bildern, Videos, GIFs und Vorschaubildern in HD.", tools: "Tools", legal: "Rechtliches", languages: "Sprachen", about: "Über uns", privacy: "Datenschutz", terms: "Nutzungsbedingungen", dmca: "DMCA", contact: "Kontakt",
    disclaimer: "SavePinner © 2026. SavePinner ist unabhängig und weder mit Pinterest verbunden noch von Pinterest unterstützt. Lade nur Inhalte herunter, die dir gehören oder für die du eine Erlaubnis hast." },
};

const IT: UiMessages = {
  nav: { home: "Home", video: "Scarica video", gif: "Scarica GIF", story: "Scarica Story" },
  form: {
    inputLabel: "Link Pinterest", paste: "Incolla", download: "Scarica", working: "Elaborazione...",
    supports: "Supporta: pinterest.com/pin/ · link brevi pin.it · Tutti i domini nazionali",
    progress: ["Analisi del link...", "Estrazione del contenuto...", "Preparazione del download..."],
    clipboardUnavailable: "Accesso agli appunti non disponibile — incolla il link manualmente.", clipboardEmpty: "Gli appunti sono vuoti — copia prima il link di un Pin.",
    clipboardDenied: "Accesso agli appunti negato — incolla il link manualmente.", pasted: "Link incollato dagli appunti.", emptyInput: "Incolla un link Pinterest.",
    invalidUrl: "Inserisci un link valido a un Pin Pinterest.", serviceUnavailable: "Il servizio è temporaneamente non disponibile.", networkError: "Errore di rete — controlla la connessione e riprova.",
  },
  badges: { ssl: "Protetto da SSL", noLogin: "Senza accesso", noWatermark: "Senza filigrana", free: "100% gratis" },
  howTo: { step: "Passaggio", videoCrossLinkPrefix: "Vuoi scaricare video da Pinterest? Usa il nostro ", videoCrossLinkText: "downloader di video Pinterest" },
  faqHeading: "Domande frequenti", relatedHeading: "Altri strumenti Pinterest gratuiti",
  whyChoose: { heading: "Perché scegliere il nostro downloader Pinterest?", items: [
    { title: "Veloce e semplice", description: "Scarica qualsiasi immagine Pinterest in pochi secondi, senza passaggi complicati." },
    { title: "Qualità HD originale", description: "Recuperiamo l’immagine a piena risoluzione, non la miniatura compressa." },
    { title: "Senza registrazione", description: "Nessuna e-mail, account o accesso. Incolla il link e scarica." },
  ] },
  result: {
    image: "Immagine · Qualità originale", gif: "GIF · Qualità originale · Animata", video: "Video · Qualità HD", download: "Scarica", open: "Apri",
    thumbnail: "Miniatura (236 px)", original: "Originale", another: "Scarica un altro Pin", cappedTitle: "I download diretti di oggi sono terminati",
    cappedBody: "Oggi SavePinner riceve più richieste di quante i nostri server gratuiti possano gestire. I download con un clic torneranno disponibili tra {eta}. Puoi comunque aprire il file qui sotto e salvarlo con il tasto destro sul computer o con una pressione prolungata sul telefono.",
    pagesTitle: "Tutte le pagine di questo Idea Pin", pagesHint: "Questo Pin è una presentazione. Salva ogni pagina separatamente:", pageLabel: "Pagina {n}", pageImage: "Immagine", pageVideo: "Video",
  },
  error: { tryAgain: "Riprova", checkAnother: "Controlla un altro link", hints: {
    INVALID_URL: "Il link deve essere simile a https://www.pinterest.com/pin/123456789/ o https://pin.it/abc123.", UNSUPPORTED_URL: "Sono supportati solo singoli Pin pubblici, non profili, bacheche o pagine di ricerca.",
    REDIRECT_REJECTED: "Il link breve non porta a un Pin Pinterest pubblico.", PIN_NOT_PUBLIC: "I Pin privati, eliminati o che richiedono l’accesso non sono disponibili.",
    MEDIA_NOT_FOUND: "Il Pin potrebbe essere stato eliminato o non contenere file scaricabili.", UNSUPPORTED_MEDIA: "Questo formato non è ancora supportato.",
    RATE_LIMITED: "Attendi qualche secondo prima di riprovare.", DAILY_CAP_REACHED: "I download con un clic si azzerano a mezzanotte UTC; i link diretti restano disponibili.",
    UPSTREAM_BLOCKED: "Pinterest potrebbe essere temporaneamente irraggiungibile — riprova tra poco.", RESOLVE_TIMEOUT: "La richiesta ha impiegato troppo tempo — riprova.", NETWORK: "Controlla la connessione Internet.",
  } },
  footer: { tagline: "Uno strumento gratuito per scaricare immagini, video, GIF e miniature Pinterest in HD.", tools: "Strumenti", legal: "Note legali", languages: "Lingue", about: "Chi siamo", privacy: "Privacy", terms: "Termini di servizio", dmca: "DMCA", contact: "Contatti",
    disclaimer: "SavePinner © 2026. SavePinner è indipendente e non è affiliato né approvato da Pinterest. Scarica solo contenuti di tua proprietà o che sei autorizzato a utilizzare." },
};

const NL: UiMessages = {
  nav: { home: "Home", video: "Video downloaden", gif: "GIF downloaden", story: "Story downloaden" },
  form: {
    inputLabel: "Pinterest-link", paste: "Plakken", download: "Downloaden", working: "Bezig...",
    supports: "Ondersteunt: pinterest.com/pin/ · korte pin.it-links · Alle landdomeinen",
    progress: ["Link controleren...", "Media ophalen...", "Download voorbereiden..."],
    clipboardUnavailable: "Klembordtoegang is niet beschikbaar — plak de link handmatig.", clipboardEmpty: "Je klembord is leeg — kopieer eerst een Pin-link.",
    clipboardDenied: "Klembordtoegang is geweigerd — plak de link handmatig.", pasted: "Geplakt vanaf het klembord.", emptyInput: "Plak een Pinterest-link.",
    invalidUrl: "Voer een geldige link naar een Pinterest-Pin in.", serviceUnavailable: "De dienst is tijdelijk niet beschikbaar.", networkError: "Netwerkfout — controleer je verbinding en probeer opnieuw.",
  },
  badges: { ssl: "SSL-beveiligd", noLogin: "Geen account nodig", noWatermark: "Zonder watermerk", free: "100% gratis" },
  howTo: { step: "Stap", videoCrossLinkPrefix: "Wil je Pinterest-video’s opslaan? Gebruik onze ", videoCrossLinkText: "Pinterest-videodownloader" },
  faqHeading: "Veelgestelde vragen", relatedHeading: "Meer gratis Pinterest-tools",
  whyChoose: { heading: "Waarom onze Pinterest-downloader gebruiken?", items: [
    { title: "Snel en eenvoudig", description: "Download Pinterest-afbeeldingen binnen enkele seconden zonder ingewikkelde stappen." },
    { title: "Originele HD-kwaliteit", description: "We halen de volledige resolutie op, niet de gecomprimeerde miniatuur." },
    { title: "Geen registratie", description: "Geen e-mail, account of login. Plak de link en download." },
  ] },
  result: {
    image: "Afbeelding · Originele kwaliteit", gif: "GIF · Originele kwaliteit · Bewegend", video: "Video · HD-kwaliteit", download: "Downloaden", open: "Openen",
    thumbnail: "Miniatuur (236 px)", original: "Origineel", another: "Nog een Pin downloaden", cappedTitle: "De directe downloads voor vandaag zijn op",
    cappedBody: "SavePinner krijgt vandaag meer aanvragen dan onze gratis servers aankunnen. Downloads met één klik zijn over {eta} weer beschikbaar. Je kunt het bestand hieronder nog steeds openen en opslaan met de rechtermuisknop op een computer of door lang te drukken op een telefoon.",
    pagesTitle: "Alle pagina’s van deze Idea Pin", pagesHint: "Deze Pin is een diavoorstelling. Sla elke pagina afzonderlijk op:", pageLabel: "Pagina {n}", pageImage: "Afbeelding", pageVideo: "Video",
  },
  error: { tryAgain: "Opnieuw proberen", checkAnother: "Andere link controleren", hints: {
    INVALID_URL: "De link moet lijken op https://www.pinterest.com/pin/123456789/ of https://pin.it/abc123.", UNSUPPORTED_URL: "Alleen afzonderlijke openbare Pins worden ondersteund — geen profielen, borden of zoekpagina’s.",
    REDIRECT_REJECTED: "De korte link verwijst niet naar een openbare Pinterest-Pin.", PIN_NOT_PUBLIC: "Privé-Pins, verwijderde Pins en Pins waarvoor inloggen nodig is, zijn niet toegankelijk.",
    MEDIA_NOT_FOUND: "De Pin is mogelijk verwijderd of bevat geen downloadbare media.", UNSUPPORTED_MEDIA: "Dit mediaformaat wordt nog niet ondersteund.",
    RATE_LIMITED: "Wacht een paar seconden en probeer opnieuw.", DAILY_CAP_REACHED: "Downloads met één klik worden om middernacht UTC hersteld; directe links blijven beschikbaar.",
    UPSTREAM_BLOCKED: "Pinterest is mogelijk tijdelijk onbereikbaar — probeer het zo opnieuw.", RESOLVE_TIMEOUT: "De aanvraag duurde te lang — probeer opnieuw.", NETWORK: "Controleer je internetverbinding.",
  } },
  footer: { tagline: "Een gratis tool om Pinterest-afbeeldingen, video’s, GIF’s en miniaturen in HD te downloaden.", tools: "Tools", legal: "Juridisch", languages: "Talen", about: "Over ons", privacy: "Privacy", terms: "Gebruiksvoorwaarden", dmca: "DMCA", contact: "Contact",
    disclaimer: "SavePinner © 2026. SavePinner is onafhankelijk en is niet verbonden met of goedgekeurd door Pinterest. Download alleen inhoud waarvan je eigenaar bent of waarvoor je toestemming hebt." },
};

const JA: UiMessages = {
  nav: { home: "ホーム", video: "動画ダウンロード", gif: "GIFダウンロード", story: "ストーリーダウンロード" },
  form: {
    inputLabel: "Pinterestリンク", paste: "貼り付け", download: "ダウンロード", working: "処理中...",
    supports: "対応リンク：pinterest.com/pin/・pin.it短縮リンク・各国のPinterestドメイン",
    progress: ["リンクを確認中...", "メディアを取得中...", "ダウンロードを準備中..."],
    clipboardUnavailable: "クリップボードを利用できません。リンクを手動で貼り付けてください。", clipboardEmpty: "クリップボードが空です。先にピンのリンクをコピーしてください。",
    clipboardDenied: "クリップボードへのアクセスが拒否されました。リンクを手動で貼り付けてください。", pasted: "クリップボードから貼り付けました。",
    emptyInput: "Pinterestリンクを貼り付けてください。", invalidUrl: "有効なPinterestピンのリンクを入力してください。", serviceUnavailable: "サービスは一時的に利用できません。", networkError: "ネットワークエラーです。接続を確認してもう一度お試しください。",
  },
  badges: { ssl: "SSLで保護", noLogin: "ログイン不要", noWatermark: "透かしなし", free: "完全無料" },
  howTo: { step: "ステップ", videoCrossLinkPrefix: "Pinterest動画を保存するには、", videoCrossLinkText: "Pinterest動画ダウンローダーをご利用ください" },
  faqHeading: "よくある質問", relatedHeading: "その他の無料Pinterestツール",
  whyChoose: { heading: "SavePinnerが選ばれる理由", items: [
    { title: "かんたん・高速", description: "複雑な操作なしで、Pinterest画像を数秒で保存できます。" },
    { title: "オリジナルHD画質", description: "圧縮されたサムネイルではなく、元の解像度の画像を取得します。" },
    { title: "登録不要", description: "メールアドレス、アカウント、ログインは不要です。リンクを貼るだけです。" },
  ] },
  result: {
    image: "画像・オリジナル画質", gif: "GIF・オリジナル画質・アニメーション", video: "動画・HD画質", download: "ダウンロード", open: "開く",
    thumbnail: "サムネイル（236px）", original: "オリジナル", another: "別のピンをダウンロード", cappedTitle: "本日のワンクリックダウンロード上限に達しました",
    cappedBody: "本日は無料サーバーの処理能力を超えるアクセスがあります。ワンクリックダウンロードは{eta}後に再開します。下のボタンでファイルを開き、パソコンでは右クリック、スマートフォンでは長押しして保存できます。",
    pagesTitle: "このIdea Pinのすべてのページ", pagesHint: "このピンはスライドショーです。ページごとに保存できます。", pageLabel: "ページ{n}", pageImage: "画像", pageVideo: "動画",
  },
  error: { tryAgain: "もう一度試す", checkAnother: "別のリンクを確認", hints: {
    INVALID_URL: "https://www.pinterest.com/pin/123456789/ または https://pin.it/abc123 の形式で入力してください。", UNSUPPORTED_URL: "公開されている個別のピンのみ対応しています。プロフィール、ボード、検索ページには対応していません。",
    REDIRECT_REJECTED: "短縮リンクの転送先が公開Pinterestピンではありません。", PIN_NOT_PUBLIC: "非公開、削除済み、またはログインが必要なピンにはアクセスできません。",
    MEDIA_NOT_FOUND: "ピンが削除されたか、ダウンロード可能な画像や動画がありません。", UNSUPPORTED_MEDIA: "このメディア形式にはまだ対応していません。",
    RATE_LIMITED: "数秒待ってからもう一度お試しください。", DAILY_CAP_REACHED: "ワンクリックダウンロードはUTC午前0時にリセットされます。直接リンクは引き続き利用できます。",
    UPSTREAM_BLOCKED: "Pinterestに一時的に接続できない可能性があります。しばらくしてからお試しください。", RESOLVE_TIMEOUT: "処理に時間がかかりすぎました。もう一度お試しください。", NETWORK: "インターネット接続を確認してください。",
  } },
  footer: { tagline: "Pinterestの画像、動画、GIF、サムネイルをHD画質で保存できる無料ツールです。", tools: "ツール", legal: "法的情報", languages: "言語", about: "運営情報", privacy: "プライバシー", terms: "利用規約", dmca: "DMCA", contact: "お問い合わせ",
    disclaimer: "SavePinner © 2026。SavePinnerはPinterestとは独立しており、提携または推奨を受けていません。ご自身が所有するコンテンツ、または使用許可を得たコンテンツのみダウンロードしてください。" },
};

const TR: UiMessages = {
  nav: { home: "Ana Sayfa", video: "Video İndir", gif: "GIF İndir", story: "Hikâye İndir" },
  form: {
    inputLabel: "Pinterest bağlantısı", paste: "Yapıştır", download: "İndir", working: "İşleniyor...",
    supports: "Desteklenenler: pinterest.com/pin/ · pin.it kısa bağlantıları · Tüm ülke alan adları",
    progress: ["Bağlantı inceleniyor...", "Medya alınıyor...", "İndirme hazırlanıyor..."],
    clipboardUnavailable: "Panoya erişilemiyor — bağlantıyı elle yapıştırın.", clipboardEmpty: "Pano boş — önce bir Pin bağlantısını kopyalayın.",
    clipboardDenied: "Pano izni reddedildi — bağlantıyı elle yapıştırın.", pasted: "Panodan yapıştırıldı.", emptyInput: "Bir Pinterest bağlantısı yapıştırın.",
    invalidUrl: "Geçerli bir Pinterest Pin bağlantısı girin.", serviceUnavailable: "Hizmet geçici olarak kullanılamıyor.", networkError: "Ağ hatası — bağlantınızı kontrol edip tekrar deneyin.",
  },
  badges: { ssl: "SSL korumalı", noLogin: "Giriş gerektirmez", noWatermark: "Filigransız", free: "%100 ücretsiz" },
  howTo: { step: "Adım", videoCrossLinkPrefix: "Pinterest videolarını indirmek için ", videoCrossLinkText: "Pinterest video indirme aracımızı kullanın" },
  faqHeading: "Sıkça sorulan sorular", relatedHeading: "Diğer ücretsiz Pinterest araçları",
  whyChoose: { heading: "Neden SavePinner kullanmalısınız?", items: [
    { title: "Hızlı ve kolay", description: "Pinterest görsellerini karmaşık adımlar olmadan saniyeler içinde indirin." },
    { title: "Orijinal HD kalite", description: "Sıkıştırılmış küçük resim yerine tam çözünürlüklü görseli alırız." },
    { title: "Kayıt gerekmez", description: "E-posta, hesap veya giriş gerekmez. Bağlantıyı yapıştırıp indirin." },
  ] },
  result: {
    image: "Görsel · Orijinal kalite", gif: "GIF · Orijinal kalite · Hareketli", video: "Video · HD kalite", download: "İndir", open: "Aç",
    thumbnail: "Küçük resim (236 px)", original: "Orijinal", another: "Başka bir Pin indir", cappedTitle: "Bugünkü tek tıkla indirme hakkı doldu",
    cappedBody: "SavePinner bugün ücretsiz sunucularımızın kaldırabileceğinden daha yoğun. Tek tıkla indirmeler {eta} içinde yenilenir. Dosyayı aşağıdan açıp bilgisayarda sağ tıklayarak veya telefonda basılı tutarak kaydedebilirsiniz.",
    pagesTitle: "Bu Idea Pin’deki tüm sayfalar", pagesHint: "Bu Pin bir slayt gösterisidir. Her sayfayı ayrı kaydedin:", pageLabel: "Sayfa {n}", pageImage: "Görsel", pageVideo: "Video",
  },
  error: { tryAgain: "Tekrar dene", checkAnother: "Başka bağlantı dene", hints: {
    INVALID_URL: "Bağlantı https://www.pinterest.com/pin/123456789/ veya https://pin.it/abc123 biçiminde olmalıdır.", UNSUPPORTED_URL: "Yalnızca herkese açık tekil Pin’ler desteklenir; profiller, panolar ve arama sayfaları desteklenmez.",
    REDIRECT_REJECTED: "Kısa bağlantı herkese açık bir Pinterest Pin’ine yönlenmedi.", PIN_NOT_PUBLIC: "Özel, silinmiş veya giriş gerektiren Pin’lere erişilemez.",
    MEDIA_NOT_FOUND: "Pin silinmiş olabilir veya indirilebilir görsel ya da video içermiyor.", UNSUPPORTED_MEDIA: "Bu medya biçimi henüz desteklenmiyor.",
    RATE_LIMITED: "Birkaç saniye bekleyip tekrar deneyin.", DAILY_CAP_REACHED: "Tek tıkla indirmeler UTC gece yarısında yenilenir; doğrudan bağlantılar çalışmaya devam eder.",
    UPSTREAM_BLOCKED: "Pinterest’e geçici olarak ulaşılamıyor olabilir — biraz sonra tekrar deneyin.", RESOLVE_TIMEOUT: "İstek çok uzun sürdü — tekrar deneyin.", NETWORK: "İnternet bağlantınızı kontrol edin.",
  } },
  footer: { tagline: "Pinterest görsellerini, videolarını, GIF’lerini ve küçük resimlerini HD kalitede indiren ücretsiz araç.", tools: "Araçlar", legal: "Yasal", languages: "Diller", about: "Hakkımızda", privacy: "Gizlilik", terms: "Kullanım Koşulları", dmca: "DMCA", contact: "İletişim",
    disclaimer: "SavePinner © 2026. SavePinner bağımsızdır; Pinterest ile bağlantılı değildir ve Pinterest tarafından desteklenmez. Yalnızca size ait veya kullanma izniniz bulunan içerikleri indirin." },
};

const PL: UiMessages = {
  nav: { home: "Strona główna", video: "Pobierz film", gif: "Pobierz GIF", story: "Pobierz Story" },
  form: {
    inputLabel: "Link z Pinterest", paste: "Wklej", download: "Pobierz", working: "Przetwarzanie...",
    supports: "Obsługuje: pinterest.com/pin/ · krótkie linki pin.it · Wszystkie domeny krajowe",
    progress: ["Sprawdzanie linku...", "Pobieranie multimediów...", "Przygotowywanie pliku..."],
    clipboardUnavailable: "Dostęp do schowka jest niedostępny — wklej link ręcznie.", clipboardEmpty: "Schowek jest pusty — najpierw skopiuj link do Pina.",
    clipboardDenied: "Odmówiono dostępu do schowka — wklej link ręcznie.", pasted: "Wklejono ze schowka.", emptyInput: "Wklej link z Pinterest.",
    invalidUrl: "Wpisz prawidłowy link do Pina na Pinterest.", serviceUnavailable: "Usługa jest chwilowo niedostępna.", networkError: "Błąd sieci — sprawdź połączenie i spróbuj ponownie.",
  },
  badges: { ssl: "Zabezpieczenie SSL", noLogin: "Bez logowania", noWatermark: "Bez znaku wodnego", free: "100% za darmo" },
  howTo: { step: "Krok", videoCrossLinkPrefix: "Chcesz pobrać film z Pinterest? Użyj naszego ", videoCrossLinkText: "narzędzia do pobierania filmów Pinterest" },
  faqHeading: "Najczęściej zadawane pytania", relatedHeading: "Więcej darmowych narzędzi Pinterest",
  whyChoose: { heading: "Dlaczego warto używać SavePinner?", items: [
    { title: "Szybko i prosto", description: "Pobieraj obrazy z Pinterest w kilka sekund, bez skomplikowanych czynności." },
    { title: "Oryginalna jakość HD", description: "Pobieramy pełną rozdzielczość zamiast skompresowanej miniatury." },
    { title: "Bez rejestracji", description: "Bez adresu e-mail, konta i logowania. Wklej link i pobierz." },
  ] },
  result: {
    image: "Obraz · Oryginalna jakość", gif: "GIF · Oryginalna jakość · Animowany", video: "Film · Jakość HD", download: "Pobierz", open: "Otwórz",
    thumbnail: "Miniatura (236 px)", original: "Oryginał", another: "Pobierz kolejny Pin", cappedTitle: "Dzisiejszy limit szybkich pobrań został wykorzystany",
    cappedBody: "SavePinner ma dziś więcej użytkowników, niż mogą obsłużyć nasze bezpłatne serwery. Pobieranie jednym kliknięciem wróci za {eta}. Nadal możesz otworzyć plik poniżej i zapisać go prawym przyciskiem myszy na komputerze lub przez przytrzymanie na telefonie.",
    pagesTitle: "Wszystkie strony tego Idea Pina", pagesHint: "Ten Pin jest pokazem slajdów. Zapisz każdą stronę osobno:", pageLabel: "Strona {n}", pageImage: "Obraz", pageVideo: "Film",
  },
  error: { tryAgain: "Spróbuj ponownie", checkAnother: "Sprawdź inny link", hints: {
    INVALID_URL: "Link powinien wyglądać jak https://www.pinterest.com/pin/123456789/ lub https://pin.it/abc123.", UNSUPPORTED_URL: "Obsługiwane są tylko pojedyncze publiczne Piny — nie profile, tablice ani strony wyszukiwania.",
    REDIRECT_REJECTED: "Krótki link nie prowadzi do publicznego Pina na Pinterest.", PIN_NOT_PUBLIC: "Piny prywatne, usunięte lub wymagające logowania są niedostępne.",
    MEDIA_NOT_FOUND: "Pin mógł zostać usunięty albo nie zawiera materiału do pobrania.", UNSUPPORTED_MEDIA: "Ten format nie jest jeszcze obsługiwany.",
    RATE_LIMITED: "Odczekaj kilka sekund i spróbuj ponownie.", DAILY_CAP_REACHED: "Limit pobrań jednym kliknięciem odnawia się o północy UTC; bezpośrednie linki nadal działają.",
    UPSTREAM_BLOCKED: "Pinterest może być chwilowo niedostępny — spróbuj ponownie za moment.", RESOLVE_TIMEOUT: "Żądanie trwało zbyt długo — spróbuj ponownie.", NETWORK: "Sprawdź połączenie z internetem.",
  } },
  footer: { tagline: "Darmowe narzędzie do pobierania obrazów, filmów, GIF-ów i miniatur z Pinterest w jakości HD.", tools: "Narzędzia", legal: "Informacje prawne", languages: "Języki", about: "O nas", privacy: "Prywatność", terms: "Warunki korzystania", dmca: "DMCA", contact: "Kontakt",
    disclaimer: "SavePinner © 2026. SavePinner jest niezależny i nie jest powiązany z Pinterest ani przez niego wspierany. Pobieraj wyłącznie treści, które należą do Ciebie lub na których użycie masz zgodę." },
};

export const ADDITIONAL_MESSAGES: Record<AdditionalLocale, UiMessages> = {
  fr: FR,
  de: DE,
  it: IT,
  nl: NL,
  ja: JA,
  tr: TR,
  pl: PL,
};
