import type { AdditionalLocale } from "@/lib/i18n-additional";
import type { LocalePageKey } from "@/lib/locale-content";
import type { RelatedTool, ToolPageContent } from "@/lib/page-content";

export const ADDITIONAL_LOCALE_PATHS: Record<AdditionalLocale, Record<LocalePageKey, string>> = {
  fr: { home: "/fr/", video: "/fr/telecharger-video-pinterest/" },
  de: { home: "/de/", video: "/de/pinterest-video-herunterladen/" },
  it: { home: "/it/", video: "/it/scaricare-video-pinterest/" },
  nl: { home: "/nl/", video: "/nl/pinterest-video-downloaden/" },
  ja: { home: "/ja/", video: "/ja/pinterest-video-download/" },
  tr: { home: "/tr/", video: "/tr/pinterest-video-indir/" },
  pl: { home: "/pl/", video: "/pl/pobierz-film-z-pinterest/" },
};

export const ADDITIONAL_VIDEO_SLUGS: Record<AdditionalLocale, string> = {
  fr: "telecharger-video-pinterest",
  de: "pinterest-video-herunterladen",
  it: "scaricare-video-pinterest",
  nl: "pinterest-video-downloaden",
  ja: "pinterest-video-download",
  tr: "pinterest-video-indir",
  pl: "pobierz-film-z-pinterest",
};

const RELATED_COPY: Record<AdditionalLocale, {
  home: [string, string];
  video: [string, string];
}> = {
  fr: {
    home: ["Télécharger des images Pinterest", "Enregistrez des images et miniatures Pinterest en HD"],
    video: ["Télécharger une vidéo Pinterest", "Enregistrez des vidéos Pinterest en qualité HD"],
  },
  de: {
    home: ["Pinterest-Bilder herunterladen", "Speichere Pinterest-Bilder und Vorschaubilder in HD"],
    video: ["Pinterest-Videos herunterladen", "Speichere Pinterest-Videos in HD-Qualität"],
  },
  it: {
    home: ["Scaricare immagini Pinterest", "Salva immagini e miniature Pinterest in HD"],
    video: ["Scaricare video Pinterest", "Salva video Pinterest in qualità HD"],
  },
  nl: {
    home: ["Pinterest-afbeeldingen downloaden", "Sla Pinterest-afbeeldingen en miniaturen op in HD"],
    video: ["Pinterest-video’s downloaden", "Sla Pinterest-video’s op in HD-kwaliteit"],
  },
  ja: {
    home: ["Pinterest画像ダウンロード", "Pinterestの画像とサムネイルをHD画質で保存"],
    video: ["Pinterest動画ダウンロード", "Pinterest動画をHD画質で保存"],
  },
  tr: {
    home: ["Pinterest görsel indir", "Pinterest görsellerini ve küçük resimlerini HD kaydedin"],
    video: ["Pinterest video indir", "Pinterest videolarını HD kalitede kaydedin"],
  },
  pl: {
    home: ["Pobierz obrazy z Pinterest", "Zapisuj obrazy i miniatury z Pinterest w jakości HD"],
    video: ["Pobierz film z Pinterest", "Zapisuj filmy z Pinterest w jakości HD"],
  },
};

function related(locale: AdditionalLocale, self: LocalePageKey): RelatedTool[] {
  const copy = RELATED_COPY[locale];
  const home: RelatedTool = {
    kind: "home",
    href: ADDITIONAL_LOCALE_PATHS[locale].home,
    title: copy.home[0],
    description: copy.home[1],
  };
  const video: RelatedTool = {
    kind: "video",
    href: ADDITIONAL_LOCALE_PATHS[locale].video,
    title: copy.video[0],
    description: copy.video[1],
  };
  return self === "home" ? [video] : [home];
}

const FR_HOME: ToolPageContent = {
  slug: "home", locale: "fr", path: ADDITIONAL_LOCALE_PATHS.fr.home, lastModified: "2026-08-02", videoPath: ADDITIONAL_LOCALE_PATHS.fr.video,
  seoTitle: "Télécharger des Images Pinterest en HD Gratuitement",
  metaDescription: "Téléchargez des images et épingles Pinterest en qualité HD originale, gratuitement et sans inscription. Compatible avec mobile et ordinateur.",
  keywords: ["télécharger image pinterest", "télécharger photo pinterest", "enregistrer image pinterest"],
  h1: "Télécharger des images Pinterest gratuitement",
  subtitle: "Enregistrez images, photos, miniatures et GIF Pinterest dans leur qualité HD originale. Sans inscription, sans filigrane et 100 % gratuit.",
  placeholder: "Collez votre lien Pinterest ici...",
  howToTitle: "Comment télécharger une image Pinterest en 3 étapes",
  steps: [
    { title: "Copiez le lien de l’épingle", description: "Ouvrez Pinterest, choisissez l’image à enregistrer, appuyez sur Partager puis sur Copier le lien." },
    { title: "Collez le lien dans SavePinner", description: "Revenez sur cette page, collez le lien dans le champ ci-dessus et appuyez sur Télécharger." },
    { title: "Enregistrez l’image originale", description: "Choisissez la taille disponible et téléchargez l’image HD sur votre téléphone ou ordinateur." },
  ],
  faq: [
    { question: "Comment télécharger une image Pinterest sans filigrane ?", answer: "Collez le lien public de l’épingle dans SavePinner. Nous récupérons le fichier publié par Pinterest sans ajouter de logo ni de filigrane." },
    { question: "Puis-je obtenir l’image Pinterest en pleine résolution ?", answer: "Oui. Lorsqu’elle est disponible, SavePinner propose l’image originale plutôt que la miniature compressée affichée dans le flux." },
    { question: "Le téléchargement fonctionne-t-il sur iPhone et Android ?", answer: "Oui. Le service fonctionne dans le navigateur sur iPhone, Android, tablette et ordinateur, sans application à installer." },
    { question: "Puis-je aussi télécharger des vidéos Pinterest ?", answer: "Oui. Utilisez notre outil vidéo pour enregistrer les vidéos Pinterest publiques au format MP4.", links: [{ text: "outil de téléchargement de vidéos Pinterest", href: ADDITIONAL_LOCALE_PATHS.fr.video }] },
    { question: "Quels liens Pinterest sont acceptés ?", answer: "Les liens pinterest.com/pin/, les liens courts pin.it et les domaines Pinterest régionaux sont pris en charge." },
    { question: "Faut-il créer un compte ou payer ?", answer: "Non. SavePinner est gratuit et ne demande ni compte, ni e-mail, ni connexion à Pinterest." },
  ], related: related("fr", "home"),
};

const FR_VIDEO: ToolPageContent = {
  slug: "video", locale: "fr", path: ADDITIONAL_LOCALE_PATHS.fr.video, lastModified: "2026-08-02", videoPath: ADDITIONAL_LOCALE_PATHS.fr.video,
  seoTitle: "Télécharger une Vidéo Pinterest en HD Gratuitement",
  metaDescription: "Téléchargez une vidéo Pinterest en qualité HD gratuitement, sans inscription ni filigrane. Fonctionne sur iPhone, Android et ordinateur.",
  keywords: ["télécharger vidéo pinterest", "telecharger video pinterest", "enregistrer vidéo pinterest"],
  h1: "Télécharger une vidéo Pinterest en HD",
  subtitle: "Collez le lien d’une vidéo Pinterest publique et enregistrez le fichier MP4 en qualité HD. Aucun compte ni logiciel requis.",
  placeholder: "Collez le lien de la vidéo Pinterest...",
  howToTitle: "Comment télécharger une vidéo Pinterest en 3 étapes",
  steps: [
    { title: "Copiez le lien de la vidéo", description: "Dans Pinterest, ouvrez la vidéo, appuyez sur Partager puis sélectionnez Copier le lien." },
    { title: "Collez le lien ici", description: "Collez le lien dans le champ ci-dessus et appuyez sur Télécharger pour analyser la vidéo." },
    { title: "Téléchargez le fichier MP4", description: "Choisissez la qualité proposée et enregistrez la vidéo sur votre téléphone ou ordinateur." },
  ],
  faq: [
    { question: "Comment télécharger une vidéo Pinterest sur mobile ?", answer: "Copiez le lien depuis l’application Pinterest, collez-le ici puis appuyez sur Télécharger. La méthode est identique sur iPhone et Android." },
    { question: "Dans quelle qualité la vidéo est-elle enregistrée ?", answer: "SavePinner propose le meilleur fichier MP4 publié par Pinterest pour cette épingle, généralement jusqu’en HD lorsque cette version existe." },
    { question: "La vidéo téléchargée contient-elle un filigrane ?", answer: "Non. SavePinner n’ajoute ni logo ni filigrane au fichier fourni par Pinterest." },
    { question: "Puis-je également enregistrer des images ?", answer: "Oui. Revenez à notre outil d’images pour télécharger photos, épingles et miniatures en résolution originale.", links: [{ text: "outil de téléchargement d’images Pinterest", href: ADDITIONAL_LOCALE_PATHS.fr.home }] },
    { question: "Le service nécessite-t-il une inscription ?", answer: "Non. Il n’y a aucun compte à créer, aucun e-mail à fournir et aucun logiciel à installer." },
    { question: "Quelles vidéos Pinterest sont compatibles ?", answer: "Les épingles vidéo publiques sont prises en charge. Les contenus privés, supprimés ou réservés aux utilisateurs connectés ne sont pas accessibles." },
  ], related: related("fr", "video"),
};

const DE_HOME: ToolPageContent = {
  slug: "home", locale: "de", path: ADDITIONAL_LOCALE_PATHS.de.home, lastModified: "2026-08-02", videoPath: ADDITIONAL_LOCALE_PATHS.de.video,
  seoTitle: "Pinterest Bilder kostenlos in HD herunterladen",
  metaDescription: "Lade Pinterest-Bilder und Pins kostenlos in originaler HD-Qualität herunter. Ohne Anmeldung, Wasserzeichen oder Installation – auf jedem Gerät.",
  keywords: ["pinterest bilder herunterladen", "bilder von pinterest herunterladen", "pinterest fotos downloaden"],
  h1: "Pinterest-Bilder kostenlos herunterladen",
  subtitle: "Speichere Bilder, Fotos, Vorschaubilder und GIFs von Pinterest in originaler HD-Qualität. Kostenlos und ohne Anmeldung.",
  placeholder: "Pinterest-Link hier einfügen...",
  howToTitle: "Pinterest-Bilder in 3 Schritten herunterladen",
  steps: [
    { title: "Pin-Link kopieren", description: "Öffne das gewünschte Bild bei Pinterest, tippe auf Teilen und wähle Link kopieren." },
    { title: "Link bei SavePinner einfügen", description: "Füge den kopierten Link oben ein und klicke auf Herunterladen." },
    { title: "Originalbild speichern", description: "Wähle die verfügbare Größe und speichere das Bild in HD auf deinem Gerät." },
  ],
  faq: [
    { question: "Wie kann ich Pinterest-Bilder ohne Wasserzeichen speichern?", answer: "Füge den öffentlichen Pin-Link ein. SavePinner lädt die von Pinterest bereitgestellte Datei und fügt kein Wasserzeichen hinzu." },
    { question: "Kann ich Pinterest-Bilder in voller Auflösung laden?", answer: "Ja. Wenn Pinterest das Original bereitstellt, erhältst du die hochauflösende Datei statt der komprimierten Vorschau." },
    { question: "Funktioniert SavePinner auf iPhone und Android?", answer: "Ja. Der Downloader funktioniert im Browser auf Smartphone, Tablet und Computer. Eine App ist nicht erforderlich." },
    { question: "Kann ich auch Pinterest-Videos herunterladen?", answer: "Ja. Mit unserem Video-Downloader kannst du öffentliche Pinterest-Videos als MP4 speichern.", links: [{ text: "Pinterest-Video-Downloader", href: ADDITIONAL_LOCALE_PATHS.de.video }] },
    { question: "Welche Pinterest-Links werden unterstützt?", answer: "Unterstützt werden pinterest.com/pin/-Links, pin.it-Kurzlinks und regionale Pinterest-Domains." },
    { question: "Muss ich mich registrieren oder bezahlen?", answer: "Nein. SavePinner ist kostenlos und verlangt weder Konto noch E-Mail oder Pinterest-Anmeldung." },
  ], related: related("de", "home"),
};

const DE_VIDEO: ToolPageContent = {
  slug: "video", locale: "de", path: ADDITIONAL_LOCALE_PATHS.de.video, lastModified: "2026-08-02", videoPath: ADDITIONAL_LOCALE_PATHS.de.video,
  seoTitle: "Pinterest Video kostenlos in HD herunterladen",
  metaDescription: "Pinterest-Videos kostenlos in HD herunterladen. Ohne Anmeldung, Wasserzeichen oder Software. Funktioniert auf Handy, Tablet und Computer.",
  keywords: ["pinterest video herunterladen", "video von pinterest herunterladen", "pinterest video download"],
  h1: "Pinterest-Video in HD herunterladen",
  subtitle: "Füge den Link eines öffentlichen Pinterest-Videos ein und speichere die MP4-Datei in HD. Kostenlos und ohne Anmeldung.",
  placeholder: "Link zum Pinterest-Video einfügen...",
  howToTitle: "Pinterest-Video in 3 Schritten herunterladen",
  steps: [
    { title: "Video-Link kopieren", description: "Öffne das Video bei Pinterest, tippe auf Teilen und dann auf Link kopieren." },
    { title: "Link hier einfügen", description: "Füge den Link oben ein und klicke auf Herunterladen, um ihn zu verarbeiten." },
    { title: "MP4-Datei speichern", description: "Wähle die angebotene Qualität und speichere das Video auf Handy oder Computer." },
  ],
  faq: [
    { question: "Wie lade ich ein Pinterest-Video auf dem Handy herunter?", answer: "Kopiere den Videolink in der Pinterest-App, füge ihn hier ein und tippe auf Herunterladen. Das funktioniert auf Android und iPhone." },
    { question: "Welche Videoqualität kann ich herunterladen?", answer: "SavePinner bietet die beste MP4-Datei an, die Pinterest für den Pin veröffentlicht, häufig in HD, wenn diese Version vorhanden ist." },
    { question: "Enthält das Video ein Wasserzeichen?", answer: "Nein. SavePinner fügt der von Pinterest bereitgestellten Datei weder Logo noch Wasserzeichen hinzu." },
    { question: "Kann ich ebenfalls Pinterest-Bilder speichern?", answer: "Ja. Auf unserer Bildseite kannst du Fotos, Pins und Vorschaubilder in Originalauflösung herunterladen.", links: [{ text: "Pinterest-Bilder herunterladen", href: ADDITIONAL_LOCALE_PATHS.de.home }] },
    { question: "Ist eine Anmeldung notwendig?", answer: "Nein. Du brauchst weder Konto noch E-Mail, Browser-Erweiterung oder zusätzliche Software." },
    { question: "Welche Video-Pins werden unterstützt?", answer: "Öffentliche Video-Pins werden unterstützt. Private, gelöschte oder anmeldepflichtige Pins können nicht abgerufen werden." },
  ], related: related("de", "video"),
};

const IT_HOME: ToolPageContent = {
  slug: "home", locale: "it", path: ADDITIONAL_LOCALE_PATHS.it.home, lastModified: "2026-08-02", videoPath: ADDITIONAL_LOCALE_PATHS.it.video,
  seoTitle: "Scaricare Immagini Pinterest Gratis in Qualità HD",
  metaDescription: "Scarica immagini e Pin Pinterest nella qualità HD originale, gratis e senza registrazione. Funziona su iPhone, Android e computer.",
  keywords: ["scaricare immagini pinterest", "scaricare foto da pinterest", "download immagini pinterest"],
  h1: "Scaricare immagini Pinterest gratis",
  subtitle: "Salva immagini, foto, miniature e GIF Pinterest nella qualità HD originale. Senza registrazione, filigrana o installazione.",
  placeholder: "Incolla qui il link Pinterest...",
  howToTitle: "Come scaricare immagini Pinterest in 3 passaggi",
  steps: [
    { title: "Copia il link del Pin", description: "Apri l’immagine su Pinterest, tocca Condividi e scegli Copia link." },
    { title: "Incolla il link su SavePinner", description: "Incolla il link nel campo qui sopra e premi Scarica." },
    { title: "Salva l’immagine originale", description: "Scegli la dimensione disponibile e salva l’immagine HD sul tuo dispositivo." },
  ],
  faq: [
    { question: "Come scaricare immagini Pinterest senza filigrana?", answer: "Incolla il link pubblico del Pin. SavePinner recupera il file pubblicato da Pinterest senza aggiungere loghi o filigrane." },
    { question: "Posso scaricare l’immagine a piena risoluzione?", answer: "Sì. Quando Pinterest la rende disponibile, puoi scaricare l’immagine originale invece della miniatura compressa." },
    { question: "Funziona su iPhone e Android?", answer: "Sì. SavePinner funziona direttamente nel browser su telefono, tablet e computer, senza installare app." },
    { question: "Posso scaricare anche i video Pinterest?", answer: "Sì. Usa lo strumento video per salvare i Pin video pubblici in formato MP4.", links: [{ text: "strumento per scaricare video Pinterest", href: ADDITIONAL_LOCALE_PATHS.it.video }] },
    { question: "Quali link Pinterest sono supportati?", answer: "Sono supportati i link pinterest.com/pin/, i link brevi pin.it e i domini Pinterest dei diversi Paesi." },
    { question: "Devo registrarmi o pagare?", answer: "No. SavePinner è gratuito e non richiede account, e-mail o accesso a Pinterest." },
  ], related: related("it", "home"),
};

const IT_VIDEO: ToolPageContent = {
  slug: "video", locale: "it", path: ADDITIONAL_LOCALE_PATHS.it.video, lastModified: "2026-08-15", videoPath: ADDITIONAL_LOCALE_PATHS.it.video,
  seoTitle: "Scaricare Video Pinterest Gratis in Qualità HD",
  metaDescription: "Scarica video Pinterest in qualità HD gratis, senza registrazione, filigrana o programmi. Compatibile con iPhone, Android e computer.",
  keywords: ["scaricare video pinterest", "scaricare video da pinterest", "download video pinterest"],
  h1: "Scaricare video Pinterest in HD",
  subtitle: "Incolla il link di un video Pinterest pubblico e salva il file MP4 in qualità HD. Gratis, senza account e senza software.",
  placeholder: "Incolla il link del video Pinterest...",
  howToTitle: "Come scaricare video Pinterest in 3 passaggi",
  steps: [
    { title: "Copia il link del video", description: "Apri il video su Pinterest, tocca Condividi e seleziona Copia link." },
    { title: "Incolla il link qui", description: "Incolla il link nel campo qui sopra e premi Scarica per elaborarlo." },
    { title: "Salva il video MP4", description: "Scegli la qualità proposta e salva il file sul telefono o sul computer." },
  ],
  sections: [
    {
      heading: "Scaricare un video Pinterest senza filigrana",
      body: [
        "SavePinner restituisce il file video pubblicato per il Pin senza aggiungere loghi o filigrane proprie. Se il creatore ha inserito testo, un marchio o una firma direttamente nel video originale, questi elementi restano nel file: il servizio non modifica l'opera e non rimuove attribuzioni già presenti.",
        "Prima di scaricare, controlla l'anteprima e la qualità indicata. In questo modo sai quale file Pinterest rende disponibile e non confondi l'assenza di una filigrana aggiunta da SavePinner con la rimozione di un marchio del creatore.",
      ],
    },
    {
      heading: "Qualità e formato del video",
      body: [
        "La pagina mostra i file video completi che Pinterest espone per quel Pin, normalmente in formato MP4. Un risultato può offrire più risoluzioni oppure una sola. La qualità dipende dal file caricato dal creatore e dalle versioni pubblicate da Pinterest; SavePinner non ingrandisce artificialmente un video e non trasforma una sorgente a bassa risoluzione in vero HD o 4K.",
        "Pinterest può riprodurre anche flussi HLS o DASH composti da molti segmenti. Se non esiste un file progressivo completo e verificabile, il Pin può essere visibile su Pinterest ma non mostrare un pulsante per un singolo video scaricabile.",
      ],
      bullets: [
        "Scegli la risoluzione più alta disponibile quando vuoi conservare più dettaglio.",
        "Una qualità compare solo se Pinterest pubblica quel file per il Pin.",
        "Il formato e l'eventuale traccia audio restano quelli del file sorgente.",
      ],
    },
    {
      heading: "Copiare il link corretto da iPhone o Android",
      body: [
        "Nell'app Pinterest apri il singolo video, tocca Condividi e scegli Copia link. Puoi incollare direttamente un link breve pin.it: SavePinner lo segue solo verso un Pin pubblico Pinterest. Anche i link completi pinterest.com/pin/ e i domini Pinterest nazionali sono supportati.",
        "Un link a una bacheca, a un profilo, ai risultati di ricerca o al feed non identifica un solo video. Apri prima il Pin desiderato e copia il suo link dalla schermata di condivisione. La procedura è la stessa su iPhone e Android e non richiede un'app aggiuntiva.",
      ],
    },
    {
      heading: "Perché un video può non essere disponibile",
      body: [
        "I Pin eliminati, privati, salvati in bacheche segrete o accessibili solo dopo il login non espongono un file pubblico. In altri casi Pinterest mostra un'anteprima animata ma rende disponibile soltanto l'immagine di copertina, oppure riproduce uno stream segmentato senza un file video completo.",
        "Se il risultato atteso non appare, copia di nuovo il link dal menu Condividi e prova ad aprirlo in una finestra privata senza account Pinterest. Se lì il Pin non si apre o richiede l'accesso, il problema è la disponibilità pubblica del contenuto e ripetere il download non può aggirarla.",
      ],
      bullets: [
        "Usa il link di un singolo Pin pubblico.",
        "Controlla che il video venga riprodotto anche senza login.",
        "Un'immagine di copertina non viene presentata come un video inventato.",
      ],
    },
  ],
  faq: [
    { question: "Come scaricare un video Pinterest sul telefono?", answer: "Copia il link dall’app Pinterest, incollalo qui e tocca Scarica. La procedura funziona su Android e iPhone." },
    { question: "In quale qualità viene scaricato il video?", answer: "SavePinner propone il miglior file MP4 pubblicato da Pinterest per quel Pin, spesso in HD quando la versione è disponibile." },
    { question: "Il video contiene una filigrana?", answer: "No. SavePinner non aggiunge loghi o filigrane al file fornito da Pinterest." },
    { question: "Posso salvare anche immagini Pinterest?", answer: "Sì. Usa la pagina immagini per scaricare foto, Pin e miniature nella risoluzione originale.", links: [{ text: "scaricare immagini Pinterest", href: ADDITIONAL_LOCALE_PATHS.it.home }] },
    { question: "Serve un account o un programma?", answer: "No. Non servono registrazione, e-mail, estensioni del browser o programmi aggiuntivi." },
    { question: "Quali Pin video sono compatibili?", answer: "Sono supportati i Pin video pubblici. I contenuti privati, eliminati o accessibili solo dopo il login non possono essere recuperati." },
  ], related: related("it", "video"),
};

const NL_HOME: ToolPageContent = {
  slug: "home", locale: "nl", path: ADDITIONAL_LOCALE_PATHS.nl.home, lastModified: "2026-08-02", videoPath: ADDITIONAL_LOCALE_PATHS.nl.video,
  seoTitle: "Pinterest Afbeeldingen Gratis Downloaden in HD",
  metaDescription: "Download Pinterest-afbeeldingen en Pins gratis in originele HD-kwaliteit. Geen account, watermerk of installatie nodig. Werkt op elk apparaat.",
  keywords: ["pinterest afbeeldingen downloaden", "afbeelding van pinterest downloaden", "pinterest foto downloaden"],
  h1: "Pinterest-afbeeldingen gratis downloaden",
  subtitle: "Sla afbeeldingen, foto’s, miniaturen en GIF’s van Pinterest op in originele HD-kwaliteit. Gratis en zonder registratie.",
  placeholder: "Plak je Pinterest-link hier...",
  howToTitle: "Pinterest-afbeeldingen downloaden in 3 stappen",
  steps: [
    { title: "Kopieer de link van de Pin", description: "Open de afbeelding op Pinterest, tik op Delen en kies Link kopiëren." },
    { title: "Plak de link in SavePinner", description: "Plak de gekopieerde link in het veld hierboven en klik op Downloaden." },
    { title: "Sla de originele afbeelding op", description: "Kies de beschikbare grootte en bewaar de HD-afbeelding op je apparaat." },
  ],
  faq: [
    { question: "Hoe download ik Pinterest-afbeeldingen zonder watermerk?", answer: "Plak de openbare Pin-link. SavePinner haalt het door Pinterest aangeboden bestand op en voegt geen logo of watermerk toe." },
    { question: "Kan ik Pinterest-afbeeldingen in volledige resolutie opslaan?", answer: "Ja. Als Pinterest het origineel beschikbaar stelt, krijg je de volledige afbeelding in plaats van de gecomprimeerde miniatuur." },
    { question: "Werkt de downloader op iPhone en Android?", answer: "Ja. SavePinner werkt in de browser op telefoon, tablet en computer. Je hoeft geen app te installeren." },
    { question: "Kan ik ook Pinterest-video’s downloaden?", answer: "Ja. Gebruik onze videodownloader om openbare Pinterest-video’s als MP4 op te slaan.", links: [{ text: "Pinterest-video’s downloaden", href: ADDITIONAL_LOCALE_PATHS.nl.video }] },
    { question: "Welke Pinterest-links worden ondersteund?", answer: "pinterest.com/pin/-links, korte pin.it-links en regionale Pinterest-domeinen worden ondersteund." },
    { question: "Moet ik een account aanmaken of betalen?", answer: "Nee. SavePinner is gratis en vraagt niet om een account, e-mailadres of Pinterest-login." },
  ], related: related("nl", "home"),
};

const NL_VIDEO: ToolPageContent = {
  slug: "video", locale: "nl", path: ADDITIONAL_LOCALE_PATHS.nl.video, lastModified: "2026-08-02", videoPath: ADDITIONAL_LOCALE_PATHS.nl.video,
  seoTitle: "Pinterest Video Gratis Downloaden in HD",
  metaDescription: "Download Pinterest-video’s gratis in HD, zonder account, watermerk of software. Werkt rechtstreeks op iPhone, Android, tablet en computer.",
  keywords: ["pinterest video downloaden", "video van pinterest downloaden", "pinterest video download"],
  h1: "Pinterest-video downloaden in HD",
  subtitle: "Plak de link van een openbare Pinterest-video en sla het MP4-bestand op in HD. Gratis, zonder login of software.",
  placeholder: "Plak de link van de Pinterest-video...",
  howToTitle: "Pinterest-video downloaden in 3 stappen",
  steps: [
    { title: "Kopieer de videolink", description: "Open de video in Pinterest, tik op Delen en kies Link kopiëren." },
    { title: "Plak de link hier", description: "Plak de link in het veld hierboven en klik op Downloaden om hem te verwerken." },
    { title: "Sla het MP4-bestand op", description: "Kies de aangeboden kwaliteit en bewaar de video op je telefoon of computer." },
  ],
  faq: [
    { question: "Hoe download ik een Pinterest-video op mijn telefoon?", answer: "Kopieer de videolink in de Pinterest-app, plak hem hier en tik op Downloaden. Dit werkt op Android en iPhone." },
    { question: "Welke videokwaliteit kan ik downloaden?", answer: "SavePinner biedt het beste MP4-bestand dat Pinterest voor de Pin publiceert, vaak in HD wanneer die versie beschikbaar is." },
    { question: "Bevat de gedownloade video een watermerk?", answer: "Nee. SavePinner voegt geen logo of watermerk toe aan het bestand dat Pinterest levert." },
    { question: "Kan ik ook Pinterest-afbeeldingen opslaan?", answer: "Ja. Gebruik de afbeeldingspagina om foto’s, Pins en miniaturen in originele resolutie te downloaden.", links: [{ text: "Pinterest-afbeeldingen downloaden", href: ADDITIONAL_LOCALE_PATHS.nl.home }] },
    { question: "Heb ik een account of programma nodig?", answer: "Nee. Registratie, e-mail, browserextensie en extra software zijn niet nodig." },
    { question: "Welke video-Pins worden ondersteund?", answer: "Openbare video-Pins worden ondersteund. Privé-, verwijderde of afgeschermde Pins kunnen niet worden opgehaald." },
  ], related: related("nl", "video"),
};

const JA_HOME: ToolPageContent = {
  slug: "home", locale: "ja", path: ADDITIONAL_LOCALE_PATHS.ja.home, lastModified: "2026-08-02", videoPath: ADDITIONAL_LOCALE_PATHS.ja.video,
  seoTitle: "Pinterest画像を高画質で無料ダウンロード",
  metaDescription: "Pinterestの画像やピンをオリジナルの高画質で無料保存。ログイン、アプリ、透かしは不要。iPhone、Android、パソコンに対応しています。",
  keywords: ["pinterest 画像 ダウンロード", "pinterest 写真 保存", "ピンタレスト 画像 ダウンロード"],
  h1: "Pinterest画像を高画質でダウンロード",
  subtitle: "Pinterestの画像、写真、サムネイル、GIFをオリジナル画質で保存できます。登録不要、透かしなし、完全無料です。",
  placeholder: "Pinterestのリンクを貼り付けてください...",
  howToTitle: "Pinterest画像を保存する3つの手順",
  steps: [
    { title: "ピンのリンクをコピー", description: "Pinterestで保存したい画像を開き、共有ボタンから「リンクをコピー」を選びます。" },
    { title: "SavePinnerに貼り付け", description: "コピーしたリンクを上の入力欄に貼り付け、「ダウンロード」を押します。" },
    { title: "元画像を保存", description: "表示されたサイズを選び、スマートフォンやパソコンに高画質画像を保存します。" },
  ],
  faq: [
    { question: "Pinterest画像を透かしなしで保存できますか？", answer: "はい。公開ピンのリンクを貼ると、Pinterestが提供するファイルを取得します。SavePinnerがロゴや透かしを追加することはありません。" },
    { question: "Pinterest画像を元の解像度でダウンロードできますか？", answer: "Pinterestが元画像を公開している場合は、圧縮されたサムネイルではなくオリジナル解像度の画像を保存できます。" },
    { question: "iPhoneやAndroidでも使えますか？", answer: "はい。スマートフォン、タブレット、パソコンのブラウザから利用でき、アプリのインストールは不要です。" },
    { question: "Pinterest動画もダウンロードできますか？", answer: "はい。動画ダウンロードページで公開されているPinterest動画をMP4形式で保存できます。", links: [{ text: "Pinterest動画ダウンローダー", href: ADDITIONAL_LOCALE_PATHS.ja.video }] },
    { question: "どのPinterestリンクに対応していますか？", answer: "pinterest.com/pin/形式、pin.it短縮リンク、各国のPinterestドメインに対応しています。" },
    { question: "アカウント登録や料金は必要ですか？", answer: "いいえ。SavePinnerは無料で、メールアドレス、アカウント、Pinterestへのログインは必要ありません。" },
  ], related: related("ja", "home"),
};

const JA_VIDEO: ToolPageContent = {
  slug: "video", locale: "ja", path: ADDITIONAL_LOCALE_PATHS.ja.video, lastModified: "2026-08-02", videoPath: ADDITIONAL_LOCALE_PATHS.ja.video,
  seoTitle: "Pinterest動画を高画質で無料ダウンロード",
  metaDescription: "Pinterest動画をHD画質のMP4で無料保存。ログイン、アプリ、透かしは不要です。iPhone、Android、パソコンから利用できます。",
  keywords: ["pinterest 動画 ダウンロード", "pinterest 動画 保存", "ピンタレスト 動画 ダウンロード"],
  h1: "Pinterest動画をHD画質でダウンロード",
  subtitle: "公開Pinterest動画のリンクを貼り付けるだけで、MP4ファイルを高画質で保存できます。登録やソフトは不要です。",
  placeholder: "Pinterest動画のリンクを貼り付けてください...",
  howToTitle: "Pinterest動画を保存する3つの手順",
  steps: [
    { title: "動画リンクをコピー", description: "Pinterestで動画を開き、共有ボタンから「リンクをコピー」を選びます。" },
    { title: "リンクを貼り付け", description: "上の入力欄にリンクを貼り付け、「ダウンロード」を押して解析します。" },
    { title: "MP4動画を保存", description: "表示された画質を選び、スマートフォンやパソコンに動画を保存します。" },
  ],
  faq: [
    { question: "スマートフォンでPinterest動画を保存する方法は？", answer: "Pinterestアプリで動画リンクをコピーし、このページに貼り付けて「ダウンロード」を押します。iPhoneとAndroidの両方で使えます。" },
    { question: "どの画質でダウンロードできますか？", answer: "Pinterestがそのピンに公開している最も高画質なMP4を表示します。提供されている場合はHD版を保存できます。" },
    { question: "ダウンロードした動画に透かしは入りますか？", answer: "いいえ。SavePinnerはPinterestから取得したファイルにロゴや透かしを追加しません。" },
    { question: "Pinterest画像も保存できますか？", answer: "はい。画像ページでは写真、ピン、サムネイルをオリジナル解像度で保存できます。", links: [{ text: "Pinterest画像ダウンローダー", href: ADDITIONAL_LOCALE_PATHS.ja.home }] },
    { question: "アカウントやアプリは必要ですか？", answer: "いいえ。登録、メールアドレス、ブラウザ拡張機能、追加アプリは必要ありません。" },
    { question: "どのPinterest動画に対応していますか？", answer: "公開されている動画ピンに対応しています。非公開、削除済み、ログインが必要なピンは取得できません。" },
  ], related: related("ja", "video"),
};

const TR_HOME: ToolPageContent = {
  slug: "home", locale: "tr", path: ADDITIONAL_LOCALE_PATHS.tr.home, lastModified: "2026-08-02", videoPath: ADDITIONAL_LOCALE_PATHS.tr.video,
  seoTitle: "Pinterest Görsel İndir — Ücretsiz ve HD Kalite",
  metaDescription: "Pinterest görsellerini ve Pin’leri orijinal HD kalitede ücretsiz indirin. Kayıt, filigran veya uygulama gerekmez. Tüm cihazlarda çalışır.",
  keywords: ["pinterest görsel indir", "pinterest resim indir", "pinterest fotoğraf indir"],
  h1: "Pinterest görsellerini ücretsiz indir",
  subtitle: "Pinterest görsellerini, fotoğraflarını, küçük resimlerini ve GIF’lerini orijinal HD kalitede kaydedin. Üyelik gerektirmez.",
  placeholder: "Pinterest bağlantısını buraya yapıştırın...",
  howToTitle: "Pinterest görseli 3 adımda nasıl indirilir?",
  steps: [
    { title: "Pin bağlantısını kopyalayın", description: "Pinterest’te kaydetmek istediğiniz görseli açın, Paylaş’a dokunun ve Bağlantıyı kopyala’yı seçin." },
    { title: "Bağlantıyı SavePinner’a yapıştırın", description: "Kopyaladığınız bağlantıyı yukarıdaki alana yapıştırıp İndir’e basın." },
    { title: "Orijinal görseli kaydedin", description: "Sunulan boyutu seçip HD görseli telefonunuza veya bilgisayarınıza kaydedin." },
  ],
  faq: [
    { question: "Pinterest görselleri filigransız nasıl indirilir?", answer: "Herkese açık Pin bağlantısını yapıştırın. SavePinner, Pinterest’in sunduğu dosyayı getirir ve logo ya da filigran eklemez." },
    { question: "Pinterest görselini tam çözünürlükte indirebilir miyim?", answer: "Evet. Pinterest orijinal dosyayı sunuyorsa sıkıştırılmış küçük resim yerine tam çözünürlüklü görseli alırsınız." },
    { question: "iPhone ve Android’de çalışır mı?", answer: "Evet. SavePinner telefon, tablet ve bilgisayar tarayıcısında çalışır. Uygulama yüklemeniz gerekmez." },
    { question: "Pinterest videosu da indirebilir miyim?", answer: "Evet. Video aracımızla herkese açık Pinterest videolarını MP4 olarak kaydedebilirsiniz.", links: [{ text: "Pinterest video indir", href: ADDITIONAL_LOCALE_PATHS.tr.video }] },
    { question: "Hangi Pinterest bağlantıları desteklenir?", answer: "pinterest.com/pin/ bağlantıları, pin.it kısa bağlantıları ve bölgesel Pinterest alan adları desteklenir." },
    { question: "Üyelik veya ödeme gerekiyor mu?", answer: "Hayır. SavePinner ücretsizdir; hesap, e-posta veya Pinterest girişi istemez." },
  ], related: related("tr", "home"),
};

const TR_VIDEO: ToolPageContent = {
  slug: "video", locale: "tr", path: ADDITIONAL_LOCALE_PATHS.tr.video, lastModified: "2026-08-02", videoPath: ADDITIONAL_LOCALE_PATHS.tr.video,
  seoTitle: "Pinterest Video İndir — Ücretsiz HD Downloader",
  metaDescription: "Pinterest videolarını HD kalitede ücretsiz indirin. Kayıt, filigran veya program gerekmez. iPhone, Android ve bilgisayarda çalışır.",
  keywords: ["pinterest video indir", "pinterest video indirme", "pinterest video downloader"],
  h1: "Pinterest video indir — ücretsiz ve HD",
  subtitle: "Herkese açık bir Pinterest videosunun bağlantısını yapıştırın ve MP4 dosyasını HD kalitede kaydedin. Hesap veya yazılım gerekmez.",
  placeholder: "Pinterest video bağlantısını yapıştırın...",
  howToTitle: "Pinterest videosu 3 adımda nasıl indirilir?",
  steps: [
    { title: "Video bağlantısını kopyalayın", description: "Pinterest’te videoyu açın, Paylaş’a dokunun ve Bağlantıyı kopyala’yı seçin." },
    { title: "Bağlantıyı buraya yapıştırın", description: "Bağlantıyı yukarıdaki alana yapıştırıp işlemek için İndir’e basın." },
    { title: "MP4 videoyu kaydedin", description: "Sunulan kaliteyi seçip videoyu telefonunuza veya bilgisayarınıza kaydedin." },
  ],
  faq: [
    { question: "Telefonda Pinterest videosu nasıl indirilir?", answer: "Pinterest uygulamasında video bağlantısını kopyalayın, buraya yapıştırın ve İndir’e dokunun. Android ve iPhone’da aynı şekilde çalışır." },
    { question: "Videoyu hangi kalitede indirebilirim?", answer: "SavePinner, Pinterest’in ilgili Pin için yayınladığı en iyi MP4 dosyasını sunar; mevcut olduğunda HD sürümü indirebilirsiniz." },
    { question: "İndirilen videoda filigran var mı?", answer: "Hayır. SavePinner, Pinterest’in sağladığı dosyaya logo veya filigran eklemez." },
    { question: "Pinterest görselleri de indirilebilir mi?", answer: "Evet. Görsel sayfamızdan fotoğrafları, Pin’leri ve küçük resimleri orijinal çözünürlükte kaydedebilirsiniz.", links: [{ text: "Pinterest görsel indir", href: ADDITIONAL_LOCALE_PATHS.tr.home }] },
    { question: "Hesap veya program gerekiyor mu?", answer: "Hayır. Kayıt, e-posta, tarayıcı eklentisi veya ek yazılım gerekmez." },
    { question: "Hangi Pinterest videoları desteklenir?", answer: "Herkese açık video Pin’leri desteklenir. Özel, silinmiş veya giriş gerektiren Pin’ler alınamaz." },
  ], related: related("tr", "video"),
};

const PL_HOME: ToolPageContent = {
  slug: "home", locale: "pl", path: ADDITIONAL_LOCALE_PATHS.pl.home, lastModified: "2026-08-02", videoPath: ADDITIONAL_LOCALE_PATHS.pl.video,
  seoTitle: "Pobierz Obrazy z Pinterest za Darmo w HD",
  metaDescription: "Pobieraj obrazy i Piny z Pinterest w oryginalnej jakości HD. Bez logowania, znaku wodnego i instalowania aplikacji. Działa na każdym urządzeniu.",
  keywords: ["pobierz obraz z pinterest", "pobieranie zdjęć z pinterest", "pinterest zdjęcia pobierz"],
  h1: "Pobierz obrazy z Pinterest za darmo",
  subtitle: "Zapisuj obrazy, zdjęcia, miniatury i GIF-y z Pinterest w oryginalnej jakości HD. Bez rejestracji i znaku wodnego.",
  placeholder: "Wklej tutaj link z Pinterest...",
  howToTitle: "Jak pobrać obraz z Pinterest w 3 krokach?",
  steps: [
    { title: "Skopiuj link do Pina", description: "Otwórz obraz na Pinterest, wybierz Udostępnij, a następnie Kopiuj link." },
    { title: "Wklej link w SavePinner", description: "Wklej skopiowany link w polu powyżej i naciśnij Pobierz." },
    { title: "Zapisz oryginalny obraz", description: "Wybierz dostępną wielkość i zapisz obraz HD na telefonie lub komputerze." },
  ],
  faq: [
    { question: "Jak pobrać obraz z Pinterest bez znaku wodnego?", answer: "Wklej link do publicznego Pina. SavePinner pobiera plik udostępniony przez Pinterest i nie dodaje logo ani znaku wodnego." },
    { question: "Czy mogę pobrać obraz w pełnej rozdzielczości?", answer: "Tak. Gdy Pinterest udostępnia oryginał, otrzymasz obraz w pełnej rozdzielczości zamiast skompresowanej miniatury." },
    { question: "Czy narzędzie działa na iPhone i Androidzie?", answer: "Tak. SavePinner działa w przeglądarce na telefonie, tablecie i komputerze. Nie trzeba instalować aplikacji." },
    { question: "Czy mogę także pobrać film z Pinterest?", answer: "Tak. Użyj strony wideo, aby zapisać publiczne filmy z Pinterest jako pliki MP4.", links: [{ text: "pobierz film z Pinterest", href: ADDITIONAL_LOCALE_PATHS.pl.video }] },
    { question: "Jakie linki Pinterest są obsługiwane?", answer: "Obsługiwane są linki pinterest.com/pin/, krótkie linki pin.it oraz regionalne domeny Pinterest." },
    { question: "Czy muszę zakładać konto lub płacić?", answer: "Nie. SavePinner jest bezpłatny i nie wymaga konta, adresu e-mail ani logowania do Pinterest." },
  ], related: related("pl", "home"),
};

const PL_VIDEO: ToolPageContent = {
  slug: "video", locale: "pl", path: ADDITIONAL_LOCALE_PATHS.pl.video, lastModified: "2026-08-02", videoPath: ADDITIONAL_LOCALE_PATHS.pl.video,
  seoTitle: "Pobierz Film z Pinterest za Darmo w Jakości HD",
  metaDescription: "Pobieraj filmy z Pinterest za darmo w jakości HD. Bez logowania, znaku wodnego i dodatkowych programów. Działa na telefonie i komputerze.",
  keywords: ["pobierz film z pinterest", "pobieranie filmów z pinterest", "pinterest video download"],
  h1: "Pobierz film z Pinterest w jakości HD",
  subtitle: "Wklej link do publicznego filmu z Pinterest i zapisz plik MP4 w jakości HD. Bez konta, aplikacji i dodatkowych opłat.",
  placeholder: "Wklej link do filmu z Pinterest...",
  howToTitle: "Jak pobrać film z Pinterest w 3 krokach?",
  steps: [
    { title: "Skopiuj link do filmu", description: "Otwórz film na Pinterest, wybierz Udostępnij, a następnie Kopiuj link." },
    { title: "Wklej link tutaj", description: "Wklej link w polu powyżej i naciśnij Pobierz, aby go przetworzyć." },
    { title: "Zapisz plik MP4", description: "Wybierz dostępną jakość i zapisz film na telefonie lub komputerze." },
  ],
  faq: [
    { question: "Jak pobrać film z Pinterest na telefon?", answer: "Skopiuj link w aplikacji Pinterest, wklej go tutaj i wybierz Pobierz. Sposób działa na Androidzie i iPhonie." },
    { question: "W jakiej jakości zostanie pobrany film?", answer: "SavePinner oferuje najlepszy plik MP4 opublikowany przez Pinterest dla danego Pina, często w jakości HD, jeśli taka wersja jest dostępna." },
    { question: "Czy pobrany film zawiera znak wodny?", answer: "Nie. SavePinner nie dodaje logo ani znaku wodnego do pliku udostępnionego przez Pinterest." },
    { question: "Czy mogę też zapisywać obrazy Pinterest?", answer: "Tak. Na stronie obrazów pobierzesz zdjęcia, Piny i miniatury w oryginalnej rozdzielczości.", links: [{ text: "pobierz obrazy z Pinterest", href: ADDITIONAL_LOCALE_PATHS.pl.home }] },
    { question: "Czy potrzebuję konta albo programu?", answer: "Nie. Rejestracja, e-mail, rozszerzenie przeglądarki i dodatkowe oprogramowanie nie są potrzebne." },
    { question: "Jakie filmy z Pinterest są obsługiwane?", answer: "Obsługiwane są publiczne Piny wideo. Materiałów prywatnych, usuniętych lub wymagających logowania nie można pobrać." },
  ], related: related("pl", "video"),
};

export const ADDITIONAL_LOCALE_PAGES: Record<AdditionalLocale, Record<LocalePageKey, ToolPageContent>> = {
  fr: { home: FR_HOME, video: FR_VIDEO },
  de: { home: DE_HOME, video: DE_VIDEO },
  it: { home: IT_HOME, video: IT_VIDEO },
  nl: { home: NL_HOME, video: NL_VIDEO },
  ja: { home: JA_HOME, video: JA_VIDEO },
  tr: { home: TR_HOME, video: TR_VIDEO },
  pl: { home: PL_HOME, video: PL_VIDEO },
};
