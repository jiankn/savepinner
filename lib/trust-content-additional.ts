import type { AdditionalLocale } from "@/lib/i18n-additional";
import type {
  TrustPageContent,
  TrustPageKey,
  TrustSection,
} from "@/lib/trust-content";

export const ADDITIONAL_TRUST_PATHS: Record<
  AdditionalLocale,
  Record<TrustPageKey, string>
> = {
  fr: { privacy: "/fr/confidentialite/", about: "/fr/a-propos/" },
  de: { privacy: "/de/datenschutz/", about: "/de/ueber-uns/" },
  it: { privacy: "/it/privacy/", about: "/it/chi-siamo/" },
  nl: { privacy: "/nl/privacy/", about: "/nl/over-ons/" },
  ja: { privacy: "/ja/privacy/", about: "/ja/about/" },
  tr: { privacy: "/tr/gizlilik/", about: "/tr/hakkimizda/" },
  pl: { privacy: "/pl/prywatnosc/", about: "/pl/o-nas/" },
};

const GOOGLE_PARTNER_SITES = "https://policies.google.com/technologies/partner-sites";
const GOOGLE_AD_SETTINGS = "https://adssettings.google.com/";

interface PrivacyCopy {
  seoTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  informationHeading: string;
  headers: [string, string, string];
  rows: [string, string, string][];
  accountsHeading: string;
  accountsBeforeEmail: string;
  accountsAfterEmail: string;
  adsHeading: string;
  adsBeforeGoogle: string;
  googleLabel: string;
  adsAfterGoogle: string;
  consentBeforeSettings: string;
  settingsLabel: string;
  consentAfterSettings: string;
  providersHeading: string;
  providers: string;
  rightsHeading: string;
  rightsBeforeContact: string;
  contactLabel: string;
  rightsAfterContact: string;
  changesHeading: string;
  changes: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
}

interface AboutCopy {
  seoTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  serviceHeading: string;
  service: string;
  operatorHeading: string;
  operatorBeforeEmail: string;
  operatorAfterEmail: string;
  independenceHeading: string;
  independence: string;
  responsibleHeading: string;
  responsibleBeforeDmca: string;
  dmcaLabel: string;
  responsibleAfterDmca: string;
  maintenanceHeading: string;
  maintenance: [string, string, string];
  correctionsHeading: string;
  correctionsBeforeContact: string;
  contactLabel: string;
  correctionsAfterContact: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
}

function privacyPage(locale: AdditionalLocale, copy: PrivacyCopy): TrustPageContent {
  const sections: TrustSection[] = [
    {
      heading: copy.informationHeading,
      table: { headers: copy.headers, rows: copy.rows },
    },
    {
      heading: copy.accountsHeading,
      paragraphs: [[
        copy.accountsBeforeEmail,
        { text: "contact@savepinner.com", href: "mailto:contact@savepinner.com" },
        copy.accountsAfterEmail,
      ]],
    },
    {
      heading: copy.adsHeading,
      paragraphs: [
        [
          copy.adsBeforeGoogle,
          { text: copy.googleLabel, href: GOOGLE_PARTNER_SITES },
          copy.adsAfterGoogle,
        ],
        [
          copy.consentBeforeSettings,
          { text: copy.settingsLabel, href: GOOGLE_AD_SETTINGS },
          copy.consentAfterSettings,
        ],
      ],
    },
    {
      heading: copy.providersHeading,
      paragraphs: [[copy.providers]],
    },
    {
      heading: copy.rightsHeading,
      paragraphs: [[
        copy.rightsBeforeContact,
        { text: copy.contactLabel, href: "/contact/" },
        copy.rightsAfterContact,
      ]],
    },
    {
      heading: copy.changesHeading,
      paragraphs: [[copy.changes]],
    },
  ];

  return {
    key: "privacy",
    locale,
    path: ADDITIONAL_TRUST_PATHS[locale].privacy,
    seoTitle: copy.seoTitle,
    metaDescription: copy.metaDescription,
    title: copy.title,
    intro: copy.intro,
    sections,
    lastUpdatedLabel: copy.lastUpdatedLabel,
    lastUpdated: copy.lastUpdated,
    lastModified: "2026-08-02",
  };
}

function aboutPage(locale: AdditionalLocale, copy: AboutCopy): TrustPageContent {
  const sections: TrustSection[] = [
    { heading: copy.serviceHeading, paragraphs: [[copy.service]] },
    {
      heading: copy.operatorHeading,
      paragraphs: [[
        copy.operatorBeforeEmail,
        { text: "contact@savepinner.com", href: "mailto:contact@savepinner.com" },
        copy.operatorAfterEmail,
      ]],
    },
    { heading: copy.independenceHeading, paragraphs: [[copy.independence]] },
    {
      heading: copy.responsibleHeading,
      paragraphs: [[
        copy.responsibleBeforeDmca,
        { text: copy.dmcaLabel, href: "/dmca/" },
        copy.responsibleAfterDmca,
      ]],
    },
    {
      heading: copy.maintenanceHeading,
      bullets: copy.maintenance.map((item) => [item]),
    },
    {
      heading: copy.correctionsHeading,
      paragraphs: [[
        copy.correctionsBeforeContact,
        { text: copy.contactLabel, href: "/contact/" },
        copy.correctionsAfterContact,
      ]],
    },
  ];

  return {
    key: "about",
    locale,
    path: ADDITIONAL_TRUST_PATHS[locale].about,
    seoTitle: copy.seoTitle,
    metaDescription: copy.metaDescription,
    title: copy.title,
    intro: copy.intro,
    sections,
    lastUpdatedLabel: copy.lastUpdatedLabel,
    lastUpdated: copy.lastUpdated,
    lastModified: "2026-08-02",
  };
}

const FR_PRIVACY = privacyPage("fr", {
  seoTitle: "Politique de confidentialité — SavePinner",
  metaDescription: "Découvrez comment SavePinner traite les liens, demandes de médias, données techniques, cookies publicitaires et choix de confidentialité.",
  title: "Politique de confidentialité",
  intro: "SavePinner traite uniquement les informations nécessaires pour répondre à une demande, sécuriser le service et, lorsque la publicité est activée, contribuer à son financement.",
  informationHeading: "Informations que nous traitons",
  headers: ["Information", "Finalité", "Conservation"],
  rows: [
    ["L’URL Pinterest envoyée", "Valider et traiter cette demande précise", "Elle n’est pas conservée volontairement après la demande ; les journaux excluent les URL complètes"],
    ["Le média demandé", "Fournir un lien direct ou transmettre le fichier à votre appareil", "Il n’est pas stocké dans une bibliothèque ; les réseaux et hébergeurs peuvent conserver des copies temporaires en cache"],
    ["Adresse IP et métadonnées de la demande", "Limitation du débit, prévention des abus, sécurité et fourniture du service", "L’application les utilise brièvement ; les hébergeurs peuvent conserver des journaux de sécurité selon leurs politiques"],
    ["Données de diagnostic", "Analyser les erreurs et la fiabilité", "Les journaux utilisent des données générales d’erreur, de durée et de taille, sans URL complète, paramètres ni jetons de téléchargement"],
  ],
  accountsHeading: "Comptes, fichiers et contact",
  accountsBeforeEmail: "Aucun compte n’est requis et SavePinner ne demande jamais votre mot de passe Pinterest. Les médias sont récupérés à la demande et ne sont pas ajoutés à une bibliothèque permanente. Si vous écrivez à ",
  accountsAfterEmail: ", nous utilisons votre adresse et votre message afin de vous répondre et de conserver la correspondance nécessaire.",
  adsHeading: "Publicité, cookies et consentement",
  adsBeforeGoogle: "Lorsque la publicité est activée, des fournisseurs tiers, dont Google, peuvent utiliser des cookies, le stockage local, des balises web, des adresses IP ou d’autres identifiants pour diffuser, limiter, personnaliser et mesurer les annonces. Google explique ",
  googleLabel: "comment les informations provenant des sites partenaires sont utilisées",
  adsAfterGoogle: ".",
  consentBeforeSettings: "Lorsque la loi l’exige, une plateforme de gestion du consentement certifiée par Google recueille vos choix avant toute publicité personnalisée. Vous pouvez aussi modifier vos préférences dans les ",
  settingsLabel: "paramètres des annonces Google",
  consentAfterSettings: ". Refuser les annonces personnalisées ne supprime pas forcément toute publicité ; des annonces contextuelles ou non personnalisées peuvent rester visibles.",
  providersHeading: "Prestataires et traitement international",
  providers: "Les prestataires d’hébergement, de sécurité, de messagerie et de publicité traitent des données limitées pour fournir leurs services. Résoudre une épingle nécessite aussi que notre serveur demande la page Pinterest publique que vous avez indiquée. Ces prestataires peuvent traiter des données hors de votre pays selon leurs conditions et garanties applicables.",
  rightsHeading: "Vos droits",
  rightsBeforeContact: "Selon votre lieu de résidence, vous pouvez disposer de droits d’accès, de rectification, d’effacement, de limitation, d’opposition et de retrait du consentement. SavePinner ne vend pas de données personnelles contre rémunération. Envoyez votre demande depuis la ",
  contactLabel: "page de contact",
  rightsAfterContact: " ; nous pourrons demander les informations nécessaires pour la vérifier et y répondre.",
  changesHeading: "Modifications de cette politique",
  changes: "Nous pouvons mettre à jour cette politique lorsque le service, nos prestataires ou les obligations légales évoluent. Toute modification importante sera publiée ici avec une nouvelle date de révision.",
  lastUpdatedLabel: "Dernière mise à jour",
  lastUpdated: "2 août 2026",
});

const FR_ABOUT = aboutPage("fr", {
  seoTitle: "À propos de SavePinner",
  metaDescription: "Découvrez qui gère SavePinner, comment fonctionne le service, comment il est financé et comment signaler une erreur ou un problème de droits.",
  title: "À propos de SavePinner",
  intro: "SavePinner est un outil web indépendant maintenu par l’équipe SavePinner pour aider les utilisateurs à traiter les liens de médias Pinterest publics qu’ils sont autorisés à utiliser.",
  serviceHeading: "Fonctionnement du service",
  service: "Un utilisateur envoie l’URL d’une épingle publique. SavePinner valide cette URL, demande la page publique au moment de la requête et affiche les options de média techniquement disponibles. Aucun identifiant Pinterest n’est demandé et les épingles privées ou supprimées ne sont pas prises en charge.",
  operatorHeading: "Qui exploite SavePinner",
  operatorBeforeEmail: "Le service est exploité et maintenu par l’équipe SavePinner. Notre adresse publique pour l’assistance et les corrections est ",
  operatorAfterEmail: ". Nous répondons généralement sous 3 à 5 jours ouvrés.",
  independenceHeading: "Indépendance et financement",
  independence: "SavePinner n’est ni affilié à Pinterest, ni sponsorisé ou approuvé par Pinterest. Le service peut être financé par la publicité. Les annonces ne modifient ni l’ordre ni la sélection technique des résultats et restent visuellement séparées des commandes du produit.",
  responsibleHeading: "Utilisation responsable et droit d’auteur",
  responsibleBeforeDmca: "Une URL publique n’annule pas les droits d’auteur, de confidentialité, à l’image ou contractuels. Utilisez SavePinner uniquement pour vos propres contenus, ceux que vous êtes autorisé à télécharger ou les usages permis par la loi applicable. Les titulaires de droits peuvent suivre notre ",
  dmcaLabel: "procédure DMCA",
  responsibleAfterDmca: ".",
  maintenanceHeading: "Comment nous maintenons le service",
  maintenance: ["Les affirmations sur le produit sont vérifiées par rapport à son fonctionnement actuel et aux documents officiels pertinents.", "Les diagnostics de fiabilité excluent les URL complètes envoyées, les paramètres de requête et les jetons de téléchargement.", "Les changements importants du produit, de la confidentialité et des règles sont publiés sur les pages concernées."],
  correctionsHeading: "Corrections et commentaires",
  correctionsBeforeContact: "Si une page contient une erreur, si un téléchargement échoue ou si vous pensez qu’un contenu ne devrait pas être traité, envoyez l’URL, une brève explication et les éléments utiles depuis notre ",
  contactLabel: "page de contact",
  correctionsAfterContact: ". N’envoyez aucun mot de passe ni donnée privée de compte.",
  lastUpdatedLabel: "Dernière mise à jour",
  lastUpdated: "2 août 2026",
});

const DE_PRIVACY = privacyPage("de", {
  seoTitle: "Datenschutzerklärung — SavePinner",
  metaDescription: "So verarbeitet SavePinner Links, Medienanfragen, technische Daten, Werbe-Cookies und Datenschutzeinstellungen.",
  title: "Datenschutzerklärung",
  intro: "SavePinner verarbeitet nur die Informationen, die erforderlich sind, um eine Anfrage zu bearbeiten, den Dienst zu schützen und ihn bei aktivierter Werbung zu finanzieren.",
  informationHeading: "Verarbeitete Informationen",
  headers: ["Information", "Verarbeitungszweck", "Speicherdauer"],
  rows: [
    ["Die übermittelte Pinterest-URL", "Prüfung und Bearbeitung dieser einzelnen Anfrage", "Nach der Anfrage wird sie nicht absichtlich gespeichert; vollständige URLs werden nicht in Anwendungsprotokolle aufgenommen"],
    ["Das angeforderte Medium", "Bereitstellung eines direkten Links oder Übertragung der Datei an dein Gerät", "Keine Speicherung in einer Medienbibliothek; Netzwerke und Hosting-Anbieter können vorübergehende Cache-Kopien halten"],
    ["IP-Adresse und Anfrage-Metadaten", "Ratenbegrenzung, Missbrauchsschutz, Sicherheit und Bereitstellung des Dienstes", "Kurzzeitige Nutzung durch die Anwendung; Hosting-Anbieter können Sicherheits- und Zugriffsprotokolle nach ihren Richtlinien speichern"],
    ["Technische Diagnosedaten", "Untersuchung von Fehlern und Zuverlässigkeit", "Protokolle enthalten grobe Fehler-, Zeit- und Dateigrößendaten, aber keine vollständigen URLs, Abfrageparameter oder Download-Tokens"],
  ],
  accountsHeading: "Konten, Dateien und Kontakt",
  accountsBeforeEmail: "Du benötigst kein Konto und SavePinner fragt nicht nach deinem Pinterest-Passwort. Medien werden nur bei Bedarf abgerufen und nicht in eine dauerhafte SavePinner-Bibliothek hochgeladen. Wenn du an ",
  accountsAfterEmail: " schreibst, verarbeiten wir deine E-Mail-Adresse und Nachricht, um zu antworten und notwendige Korrespondenz aufzubewahren.",
  adsHeading: "Werbung, Cookies und Einwilligung",
  adsBeforeGoogle: "Wenn Werbung aktiviert ist, können Drittanbieter einschließlich Google Cookies, lokalen Speicher, Web-Beacons, IP-Adressen oder andere Kennungen verwenden, um Anzeigen auszuliefern, zu begrenzen, zu personalisieren und zu messen. Google erläutert, ",
  googleLabel: "wie Informationen von Partner-Websites verwendet werden",
  adsAfterGoogle: ".",
  consentBeforeSettings: "Wo gesetzlich erforderlich, werden deine Entscheidungen vor personalisierter Werbung über eine von Google zertifizierte Consent-Management-Plattform eingeholt und gespeichert. Du kannst deine Auswahl außerdem in den ",
  settingsLabel: "Google-Einstellungen für Werbung",
  consentAfterSettings: " prüfen oder ändern. Die Ablehnung personalisierter Anzeigen entfernt nicht zwingend alle Werbung; nicht personalisierte oder kontextbezogene Anzeigen können weiterhin erscheinen.",
  providersHeading: "Dienstleister und internationale Verarbeitung",
  providers: "Hosting-, Sicherheits-, E-Mail- und Werbedienstleister verarbeiten begrenzte Daten zur Erbringung ihrer Dienste. Zum Auflösen eines Pins muss unser Server außerdem die von dir angegebene öffentliche Pinterest-Seite anfragen. Diese Anbieter können Daten nach ihren Bedingungen und Datenschutzgarantien in anderen Ländern verarbeiten.",
  rightsHeading: "Deine Datenschutzrechte",
  rightsBeforeContact: "Je nach Wohnort kannst du Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Widerruf einer Einwilligung haben. SavePinner verkauft personenbezogene Daten nicht gegen Geld. Sende eine Anfrage über die ",
  contactLabel: "Kontaktseite",
  rightsAfterContact: ". Wir können ausreichende Angaben benötigen, um die Anfrage zu prüfen und zu beantworten.",
  changesHeading: "Änderungen dieser Erklärung",
  changes: "Wir können diese Erklärung aktualisieren, wenn sich der Dienst, Anbieter oder rechtliche Anforderungen ändern. Wesentliche Änderungen werden hier mit einem neuen Überarbeitungsdatum veröffentlicht.",
  lastUpdatedLabel: "Zuletzt aktualisiert",
  lastUpdated: "2. August 2026",
});

const DE_ABOUT = aboutPage("de", {
  seoTitle: "Über SavePinner",
  metaDescription: "Wer SavePinner betreibt, wie der Dienst funktioniert und finanziert wird und wie Fehler oder Rechteprobleme gemeldet werden können.",
  title: "Über SavePinner",
  intro: "SavePinner ist ein unabhängiges Webtool des SavePinner-Teams. Es hilft Menschen beim Umgang mit öffentlichen Pinterest-Medienlinks, die sie verwenden dürfen.",
  serviceHeading: "Was der Dienst macht",
  service: "Ein Besucher übermittelt die URL eines öffentlichen Pins. SavePinner prüft die URL, ruft die öffentliche Seite bei Bedarf ab und zeigt die technisch verfügbaren Medienoptionen. Es wird keine Pinterest-Anmeldung verlangt; private und gelöschte Pins werden nicht unterstützt.",
  operatorHeading: "Wer SavePinner betreibt",
  operatorBeforeEmail: "Der Dienst wird vom SavePinner-Team betrieben und gepflegt. Unsere öffentliche Adresse für Support und Korrekturen lautet ",
  operatorAfterEmail: ". Wir antworten normalerweise innerhalb von 3 bis 5 Werktagen.",
  independenceHeading: "Unabhängigkeit und Finanzierung",
  independence: "SavePinner ist nicht mit Pinterest verbunden und wird weder von Pinterest gesponsert noch unterstützt. Der Dienst kann durch Werbung finanziert werden. Werbung verändert weder die Reihenfolge noch die technische Auswahl der Download-Ergebnisse und wird optisch von den Produktfunktionen getrennt.",
  responsibleHeading: "Verantwortungsvolle Nutzung und Urheberrecht",
  responsibleBeforeDmca: "Eine öffentliche URL hebt Urheber-, Datenschutz-, Persönlichkeits- oder Vertragsrechte nicht auf. Nutze SavePinner nur für eigene Inhalte, mit Erlaubnis oder für eine nach geltendem Recht zulässige Verwendung. Rechteinhaber können unserem ",
  dmcaLabel: "DMCA-Verfahren",
  responsibleAfterDmca: " folgen.",
  maintenanceHeading: "So pflegen wir den Dienst",
  maintenance: ["Produktaussagen werden anhand des aktuellen Dienstverhaltens und einschlägiger offizieller Dokumentation geprüft.", "Zuverlässigkeitsdiagnosen vermeiden vollständige übermittelte URLs, Abfrageparameter und Download-Tokens.", "Wesentliche Produkt-, Datenschutz- und Richtlinienänderungen werden auf den entsprechenden öffentlichen Seiten aktualisiert."],
  correctionsHeading: "Korrekturen und Feedback",
  correctionsBeforeContact: "Wenn eine Seite fehlerhaft ist, ein Download nicht funktioniert oder ein Inhalt nicht verarbeitet werden sollte, sende die URL, eine kurze Erklärung und unterstützende Angaben über unsere ",
  contactLabel: "Kontaktseite",
  correctionsAfterContact: ". Sende keine Passwörter oder privaten Kontodaten.",
  lastUpdatedLabel: "Zuletzt aktualisiert",
  lastUpdated: "2. August 2026",
});

const IT_PRIVACY = privacyPage("it", {
  seoTitle: "Informativa sulla Privacy — SavePinner",
  metaDescription: "Come SavePinner tratta link, richieste di contenuti, dati tecnici, cookie pubblicitari e preferenze sulla privacy.",
  title: "Informativa sulla privacy",
  intro: "SavePinner tratta solo le informazioni necessarie per completare una richiesta, proteggere il servizio e, quando la pubblicità è attiva, contribuire al suo finanziamento.",
  informationHeading: "Informazioni trattate",
  headers: ["Informazione", "Finalità", "Conservazione"],
  rows: [
    ["L’URL Pinterest inviato", "Convalidare e completare quella specifica richiesta", "Non viene conservato intenzionalmente dopo la richiesta; i registri dell’applicazione escludono gli URL completi"],
    ["Il contenuto richiesto", "Restituire un link diretto o trasmettere il file al dispositivo", "Non viene archiviato in una raccolta; reti e hosting possono conservare copie temporanee nella cache"],
    ["Indirizzo IP e metadati della richiesta", "Limitazione delle richieste, prevenzione degli abusi, sicurezza ed erogazione del servizio", "Sono usati brevemente dall’applicazione; i fornitori di hosting possono conservare registri di sicurezza secondo le proprie politiche"],
    ["Diagnostica tecnica", "Analizzare errori e affidabilità", "I registri usano dati generali su errore, durata e dimensione, senza URL completi, parametri o token di download"],
  ],
  accountsHeading: "Account, file e contatti",
  accountsBeforeEmail: "Non è necessario un account e SavePinner non chiede la password di Pinterest. I contenuti vengono richiesti al momento e non caricati in una raccolta permanente. Scrivendo a ",
  accountsAfterEmail: ", tratteremo l’indirizzo e il messaggio per rispondere e conservare la corrispondenza necessaria.",
  adsHeading: "Pubblicità, cookie e consenso",
  adsBeforeGoogle: "Quando la pubblicità è attiva, fornitori terzi, incluso Google, possono usare cookie, memoria locale, web beacon, indirizzi IP o altri identificatori per mostrare, limitare, personalizzare e misurare gli annunci. Google spiega ",
  googleLabel: "come utilizza le informazioni provenienti dai siti partner",
  adsAfterGoogle: ".",
  consentBeforeSettings: "Dove richiesto, una piattaforma di gestione del consenso certificata da Google raccoglie e registra le preferenze prima della pubblicità personalizzata. Puoi inoltre modificare le scelte nelle ",
  settingsLabel: "Impostazioni annunci Google",
  consentAfterSettings: ". Il rifiuto degli annunci personalizzati non elimina necessariamente tutta la pubblicità: possono comparire annunci contestuali o non personalizzati.",
  providersHeading: "Fornitori e trattamento internazionale",
  providers: "I fornitori di hosting, sicurezza, posta elettronica e pubblicità trattano dati limitati per erogare i propri servizi. Per risolvere un Pin, il nostro server deve inoltre richiedere la pagina Pinterest pubblica indicata dall’utente. Questi fornitori possono trattare dati in altri Paesi secondo le proprie condizioni e garanzie.",
  rightsHeading: "I tuoi diritti",
  rightsBeforeContact: "A seconda del luogo in cui vivi, potresti avere diritti di accesso, rettifica, cancellazione, limitazione, opposizione e revoca del consenso. SavePinner non vende dati personali in cambio di denaro. Invia la richiesta dalla ",
  contactLabel: "pagina dei contatti",
  rightsAfterContact: "; potremmo chiedere informazioni sufficienti per verificarla e rispondere.",
  changesHeading: "Modifiche all’informativa",
  changes: "Possiamo aggiornare questa informativa quando cambiano il servizio, i fornitori o gli obblighi di legge. Le modifiche sostanziali saranno pubblicate qui con una nuova data di revisione.",
  lastUpdatedLabel: "Ultimo aggiornamento",
  lastUpdated: "2 agosto 2026",
});

const IT_ABOUT = aboutPage("it", {
  seoTitle: "Chi siamo — SavePinner",
  metaDescription: "Chi gestisce SavePinner, come funziona e si finanzia il servizio e come segnalare errori o problemi relativi ai diritti.",
  title: "Chi siamo",
  intro: "SavePinner è uno strumento web indipendente mantenuto dal team SavePinner per aiutare gli utenti a gestire link pubblici a contenuti Pinterest che sono autorizzati a utilizzare.",
  serviceHeading: "Cosa fa il servizio",
  service: "L’utente invia l’URL di un Pin pubblico. SavePinner convalida l’indirizzo, richiede la pagina pubblica in quel momento e mostra le opzioni tecnicamente disponibili. Non chiede credenziali Pinterest e non supporta Pin privati o eliminati.",
  operatorHeading: "Chi gestisce SavePinner",
  operatorBeforeEmail: "Il servizio è gestito e mantenuto dal team SavePinner. L’indirizzo pubblico per assistenza e correzioni è ",
  operatorAfterEmail: ". In genere rispondiamo entro 3–5 giorni lavorativi.",
  independenceHeading: "Indipendenza e finanziamento",
  independence: "SavePinner non è affiliato, sponsorizzato o approvato da Pinterest. Il servizio può essere finanziato dalla pubblicità. Gli annunci non modificano l’ordine o la selezione tecnica dei risultati e sono visivamente separati dai controlli del prodotto.",
  responsibleHeading: "Uso responsabile e diritto d’autore",
  responsibleBeforeDmca: "Un URL pubblico non annulla i diritti d’autore, di privacy, di immagine o contrattuali. Usa SavePinner solo per contenuti tuoi, autorizzati o per usi consentiti dalla legge applicabile. I titolari dei diritti possono seguire la nostra ",
  dmcaLabel: "procedura DMCA",
  responsibleAfterDmca: ".",
  maintenanceHeading: "Come manteniamo il servizio",
  maintenance: ["Le dichiarazioni sul prodotto vengono verificate rispetto al comportamento corrente del servizio e alla documentazione ufficiale pertinente.", "La diagnostica di affidabilità esclude URL completi, parametri di ricerca e token di download.", "Le modifiche rilevanti al prodotto, alla privacy e alle norme vengono riportate nelle pagine pubbliche interessate."],
  correctionsHeading: "Correzioni e commenti",
  correctionsBeforeContact: "Se una pagina è inesatta, un download non funziona o ritieni che un contenuto non debba essere trattato, invia l’URL, una breve spiegazione e gli elementi utili tramite la ",
  contactLabel: "pagina dei contatti",
  correctionsAfterContact: ". Non inviare password o dati privati dell’account.",
  lastUpdatedLabel: "Ultimo aggiornamento",
  lastUpdated: "2 agosto 2026",
});

const NL_PRIVACY = privacyPage("nl", {
  seoTitle: "Privacybeleid — SavePinner",
  metaDescription: "Hoe SavePinner links, mediaverzoeken, technische gegevens, advertentiecookies en privacykeuzes verwerkt.",
  title: "Privacybeleid",
  intro: "SavePinner verwerkt alleen de informatie die nodig is om een verzoek uit te voeren, de dienst te beveiligen en deze bij ingeschakelde advertenties te financieren.",
  informationHeading: "Gegevens die we verwerken",
  headers: ["Gegeven", "Doel", "Bewaartermijn"],
  rows: [
    ["De ingestuurde Pinterest-URL", "Dat ene verzoek controleren en uitvoeren", "Niet bewust bewaard na het verzoek; volledige URL’s worden niet in applicatielogboeken opgenomen"],
    ["De aangevraagde media", "Een rechtstreekse link geven of het bestand naar je apparaat sturen", "Niet opgeslagen in een mediabibliotheek; netwerk- en hostingcaches kunnen tijdelijke kopieën bewaren"],
    ["IP-adres en aanvraaggegevens", "Snelheidslimieten, misbruikpreventie, beveiliging en levering van de dienst", "Kort gebruikt door de applicatie; hostingproviders kunnen beveiligings- en toegangslogboeken volgens hun beleid bewaren"],
    ["Technische diagnosegegevens", "Fouten en betrouwbaarheid onderzoeken", "Logboeken bevatten globale fout-, tijd- en bestandsgroottegegevens, zonder volledige URL’s, queryparameters of downloadtokens"],
  ],
  accountsHeading: "Accounts, bestanden en contact",
  accountsBeforeEmail: "Je hebt geen account nodig en SavePinner vraagt niet om je Pinterest-wachtwoord. Media worden op verzoek opgehaald en niet naar een permanente bibliotheek geüpload. Als je mailt naar ",
  accountsAfterEmail: ", verwerken we je e-mailadres en bericht om te antwoorden en noodzakelijke correspondentie te bewaren.",
  adsHeading: "Advertenties, cookies en toestemming",
  adsBeforeGoogle: "Wanneer advertenties zijn ingeschakeld, kunnen externe leveranciers, waaronder Google, cookies, lokale opslag, webbakens, IP-adressen of andere identificatoren gebruiken om advertenties te tonen, beperken, personaliseren en meten. Google legt uit ",
  googleLabel: "hoe informatie van partnersites wordt gebruikt",
  adsAfterGoogle: ".",
  consentBeforeSettings: "Waar dit verplicht is, vragen en registreren we keuzes via een door Google gecertificeerd toestemmingsplatform voordat gepersonaliseerde advertenties worden getoond. Je kunt je keuzes ook aanpassen in ",
  settingsLabel: "Google Advertentie-instellingen",
  consentAfterSettings: ". Het weigeren van gepersonaliseerde advertenties verwijdert niet noodzakelijk alle advertenties; niet-gepersonaliseerde of contextuele advertenties kunnen nog worden getoond.",
  providersHeading: "Dienstverleners en internationale verwerking",
  providers: "Providers voor hosting, beveiliging, e-mail en advertenties verwerken beperkte gegevens om hun diensten te leveren. Voor het oplossen van een Pin vraagt onze server ook de door jou opgegeven openbare Pinterest-pagina op. Deze providers kunnen gegevens in andere landen verwerken volgens hun voorwaarden en privacywaarborgen.",
  rightsHeading: "Je privacyrechten",
  rightsBeforeContact: "Afhankelijk van je woonplaats kun je recht hebben op inzage, correctie, verwijdering, beperking, bezwaar en intrekking van toestemming. SavePinner verkoopt geen persoonsgegevens voor geld. Dien een verzoek in via de ",
  contactLabel: "contactpagina",
  rightsAfterContact: ". We kunnen voldoende informatie nodig hebben om het verzoek te controleren en te beantwoorden.",
  changesHeading: "Wijzigingen in dit beleid",
  changes: "We kunnen dit beleid aanpassen wanneer de dienst, leveranciers of wettelijke vereisten veranderen. Belangrijke wijzigingen worden hier met een nieuwe revisiedatum gepubliceerd.",
  lastUpdatedLabel: "Laatst bijgewerkt",
  lastUpdated: "2 augustus 2026",
});

const NL_ABOUT = aboutPage("nl", {
  seoTitle: "Over SavePinner",
  metaDescription: "Wie SavePinner beheert, hoe de dienst werkt en wordt gefinancierd en hoe je fouten of problemen met rechten meldt.",
  title: "Over SavePinner",
  intro: "SavePinner is een onafhankelijke webtool van het SavePinner-team voor mensen die openbare Pinterest-medialinks willen verwerken waarvoor zij gebruikstoestemming hebben.",
  serviceHeading: "Wat de dienst doet",
  service: "Een bezoeker voert de URL van een openbare Pin in. SavePinner controleert de URL, vraagt de openbare pagina op dat moment op en toont de technisch beschikbare mediaopties. Er wordt niet om een Pinterest-login gevraagd en privé- of verwijderde Pins worden niet ondersteund.",
  operatorHeading: "Wie SavePinner beheert",
  operatorBeforeEmail: "De dienst wordt beheerd en onderhouden door het SavePinner-team. Ons openbare adres voor ondersteuning en correcties is ",
  operatorAfterEmail: ". We antwoorden normaal gesproken binnen 3–5 werkdagen.",
  independenceHeading: "Onafhankelijkheid en financiering",
  independence: "SavePinner is niet verbonden met, gesponsord door of goedgekeurd door Pinterest. De dienst kan met advertenties worden gefinancierd. Advertenties veranderen de volgorde of technische selectie van downloadresultaten niet en worden visueel gescheiden van productbediening.",
  responsibleHeading: "Verantwoord gebruik en auteursrecht",
  responsibleBeforeDmca: "Een openbare URL heft auteursrecht, privacyrecht, portretrecht of contractuele rechten niet op. Gebruik SavePinner alleen voor eigen inhoud, inhoud waarvoor je toestemming hebt of gebruik dat wettelijk is toegestaan. Rechthebbenden kunnen onze ",
  dmcaLabel: "DMCA-procedure",
  responsibleAfterDmca: " volgen.",
  maintenanceHeading: "Hoe we de dienst onderhouden",
  maintenance: ["Productclaims worden gecontroleerd aan de hand van de actuele werking en relevante officiële documentatie.", "Diagnostiek voor betrouwbaarheid vermijdt volledige ingestuurde URL’s, queryparameters en downloadtokens.", "Belangrijke wijzigingen aan product, privacy en beleid worden op de betreffende openbare pagina’s verwerkt."],
  correctionsHeading: "Correcties en feedback",
  correctionsBeforeContact: "Als een pagina onjuist is, een download mislukt of je denkt dat inhoud niet verwerkt mag worden, stuur dan de URL, een korte uitleg en relevante informatie via onze ",
  contactLabel: "contactpagina",
  correctionsAfterContact: ". Stuur geen wachtwoorden of privégegevens van accounts.",
  lastUpdatedLabel: "Laatst bijgewerkt",
  lastUpdated: "2 augustus 2026",
});

const JA_PRIVACY = privacyPage("ja", {
  seoTitle: "プライバシーポリシー — SavePinner",
  metaDescription: "SavePinnerがリンク、メディア取得リクエスト、技術情報、広告Cookie、プライバシー設定をどのように取り扱うか説明します。",
  title: "プライバシーポリシー",
  intro: "SavePinnerは、リクエストの処理、サービスの安全性確保、および広告が有効な場合の運営に必要な情報のみを取り扱います。",
  informationHeading: "取り扱う情報",
  headers: ["情報", "利用目的", "保存期間"],
  rows: [
    ["送信されたPinterest URL", "そのリクエストの確認と処理", "処理後に意図的に保存しません。アプリケーションログにも完全なURLは記録しません"],
    ["取得対象のメディア", "直接リンクの表示または端末へのファイル転送", "メディアライブラリとして保存しません。ネットワークやホスティングのキャッシュに一時的なコピーが残る場合があります"],
    ["IPアドレスとリクエスト情報", "アクセス制限、不正利用防止、セキュリティ、サービス提供", "アプリケーションで短時間利用します。ホスティング事業者が独自の方針に基づきセキュリティログを保存する場合があります"],
    ["技術的な診断情報", "エラーと信頼性の調査", "エラー種別、処理時間、ファイルサイズなどの概略情報を使用し、完全なURL、クエリ文字列、ダウンロードトークンは記録しません"],
  ],
  accountsHeading: "アカウント、ファイル、お問い合わせ",
  accountsBeforeEmail: "アカウント登録は不要で、Pinterestのパスワードを求めることもありません。メディアはリクエスト時に取得され、SavePinnerの恒久的なライブラリには保存されません。",
  accountsAfterEmail: "へご連絡いただいた場合、返信と必要な連絡記録のためにメールアドレスと本文を取り扱います。",
  adsHeading: "広告、Cookie、同意",
  adsBeforeGoogle: "広告が有効な場合、Googleを含む第三者事業者が、広告の配信、回数制限、パーソナライズ、効果測定のため、Cookie、ローカルストレージ、ウェブビーコン、IPアドレスなどを使用する場合があります。Googleによる",
  googleLabel: "パートナーサイト情報の利用方法",
  adsAfterGoogle: "もご確認ください。",
  consentBeforeSettings: "法令上必要な地域では、パーソナライズ広告の表示前にGoogle認定の同意管理プラットフォームで選択内容を確認・記録します。また、",
  settingsLabel: "Google広告設定",
  consentAfterSettings: "から設定を確認または変更できます。パーソナライズ広告を拒否しても、非パーソナライズ広告やコンテンツ連動広告が表示される場合があります。",
  providersHeading: "サービス事業者と国外での処理",
  providers: "ホスティング、セキュリティ、メール、広告の各事業者は、サービス提供に必要な範囲で情報を取り扱います。ピンを解析するため、入力された公開Pinterestページへのサーバーリクエストも必要です。各事業者は、それぞれの規約と保護措置に基づき、利用者の国以外で情報を処理する場合があります。",
  rightsHeading: "プライバシーに関する権利",
  rightsBeforeContact: "居住地域によっては、開示、訂正、削除、処理制限、異議申立て、同意撤回などを請求できる場合があります。SavePinnerは個人情報を金銭で販売しません。請求は",
  contactLabel: "お問い合わせページ",
  rightsAfterContact: "からお送りください。本人確認と回答に必要な情報をお願いする場合があります。",
  changesHeading: "ポリシーの変更",
  changes: "サービス、委託先、法的要件の変更に応じて本ポリシーを更新する場合があります。重要な変更は、新しい改定日とともにこのページでお知らせします。",
  lastUpdatedLabel: "最終更新日",
  lastUpdated: "2026年8月2日",
});

const JA_ABOUT = aboutPage("ja", {
  seoTitle: "SavePinnerについて",
  metaDescription: "SavePinnerの運営者、サービスの仕組み、運営方法、誤りや権利上の問題を報告する方法について説明します。",
  title: "SavePinnerについて",
  intro: "SavePinnerは、利用許可のある公開Pinterestメディアリンクを扱うためにSavePinnerチームが運営する独立したウェブツールです。",
  serviceHeading: "サービスの仕組み",
  service: "利用者が公開ピンのURLを入力すると、SavePinnerはURLを確認し、その時点で公開ページを取得して、技術的に利用可能なメディアを表示します。Pinterestへのログインは求めず、非公開または削除済みのピンには対応していません。",
  operatorHeading: "運営者について",
  operatorBeforeEmail: "本サービスはSavePinnerチームが運営・保守しています。サポートおよび訂正の連絡先は",
  operatorAfterEmail: "です。通常3〜5営業日以内に返信します。",
  independenceHeading: "独立性と運営資金",
  independence: "SavePinnerはPinterestとは提携しておらず、Pinterestによる支援や承認を受けていません。本サービスは広告収益で運営される場合があります。広告がダウンロード結果の順序や技術的な選択を変更することはなく、操作部分とは視覚的に分離されます。",
  responsibleHeading: "適切な利用と著作権",
  responsibleBeforeDmca: "URLが公開されていても、著作権、プライバシー権、肖像権、契約上の権利が失われるわけではありません。ご自身が所有するコンテンツ、許可を得たコンテンツ、または法令で認められた用途にのみ使用してください。権利者は",
  dmcaLabel: "DMCA手続き",
  responsibleAfterDmca: "をご利用いただけます。",
  maintenanceHeading: "サービス品質の維持",
  maintenance: ["製品に関する説明は、現在の動作と関連する公式資料に照らして確認します。", "信頼性診断では、送信された完全なURL、クエリ文字列、ダウンロードトークンを記録しません。", "製品、プライバシー、方針の重要な変更は、該当する公開ページに反映します。"],
  correctionsHeading: "訂正とフィードバック",
  correctionsBeforeContact: "ページに誤りがある、ダウンロードに失敗する、または特定のコンテンツを処理すべきでないと思われる場合は、URL、簡単な説明、参考情報を",
  contactLabel: "お問い合わせページ",
  correctionsAfterContact: "からお送りください。パスワードや非公開のアカウント情報は送信しないでください。",
  lastUpdatedLabel: "最終更新日",
  lastUpdated: "2026年8月2日",
});

const TR_PRIVACY = privacyPage("tr", {
  seoTitle: "Gizlilik Politikası — SavePinner",
  metaDescription: "SavePinner’ın bağlantıları, medya isteklerini, teknik verileri, reklam çerezlerini ve gizlilik tercihlerini nasıl işlediğini öğrenin.",
  title: "Gizlilik Politikası",
  intro: "SavePinner yalnızca bir isteği sonuçlandırmak, hizmeti güvenli tutmak ve reklam etkinse hizmeti desteklemek için gereken bilgileri işler.",
  informationHeading: "İşlediğimiz bilgiler",
  headers: ["Bilgi", "İşleme amacı", "Saklama"],
  rows: [
    ["Gönderdiğiniz Pinterest URL’si", "Yalnızca o isteği doğrulamak ve sonuçlandırmak", "İstekten sonra bilinçli olarak saklanmaz; tam URL’ler uygulama günlüklerine alınmaz"],
    ["İstenen medya", "Doğrudan bağlantı sunmak veya dosyayı cihazınıza aktarmak", "Bir medya arşivinde saklanmaz; ağ ve barındırma önbelleklerinde geçici kopyalar bulunabilir"],
    ["IP adresi ve istek üst verileri", "Hız sınırı, kötüye kullanım önleme, güvenlik ve hizmet sunumu", "Uygulama tarafından kısa süre kullanılır; barındırma sağlayıcıları kendi politikalarına göre güvenlik günlükleri tutabilir"],
    ["Teknik tanılama verileri", "Hataları ve güvenilirliği incelemek", "Günlükler genel hata, süre ve dosya boyutu bilgilerini içerir; tam URL, sorgu dizesi ve indirme jetonu içermez"],
  ],
  accountsHeading: "Hesaplar, dosyalar ve iletişim",
  accountsBeforeEmail: "Hesap gerekmez ve SavePinner Pinterest parolanızı istemez. Medya talep üzerine alınır ve kalıcı bir SavePinner arşivine yüklenmez. ",
  accountsAfterEmail: " adresine yazarsanız, yanıt vermek ve gerekli yazışmaları saklamak için e-posta adresinizi ve mesajınızı işleriz.",
  adsHeading: "Reklam, çerezler ve onay",
  adsBeforeGoogle: "Reklam etkin olduğunda Google dahil üçüncü taraf sağlayıcılar; reklam sunmak, sınırlamak, kişiselleştirmek ve ölçmek için çerez, yerel depolama, web işaretçisi, IP adresi veya başka tanımlayıcılar kullanabilir. Google, ",
  googleLabel: "iş ortağı sitelerinden gelen bilgileri nasıl kullandığını",
  adsAfterGoogle: " açıklar.",
  consentBeforeSettings: "Gerekli bölgelerde kişiselleştirilmiş reklamdan önce tercihleri istemek ve kaydetmek için Google onaylı bir rıza yönetim platformu kullanılır. Tercihlerinizi ",
  settingsLabel: "Google Reklam Ayarları",
  consentAfterSettings: " üzerinden de değiştirebilirsiniz. Kişiselleştirilmiş reklamları reddetmek tüm reklamları kaldırmayabilir; kişiselleştirilmemiş veya bağlamsal reklamlar gösterilebilir.",
  providersHeading: "Hizmet sağlayıcılar ve uluslararası işleme",
  providers: "Barındırma, güvenlik, e-posta ve reklam sağlayıcıları hizmetlerini sunmak için sınırlı veri işler. Bir Pin’i çözümlemek, girdiğiniz herkese açık Pinterest sayfasına sunucu isteği göndermeyi de gerektirir. Bu sağlayıcılar verileri kendi koşulları ve gizlilik güvenceleri kapsamında başka ülkelerde işleyebilir.",
  rightsHeading: "Gizlilik haklarınız",
  rightsBeforeContact: "Yaşadığınız yere bağlı olarak erişim, düzeltme, silme, kısıtlama, itiraz ve onayı geri çekme haklarına sahip olabilirsiniz. SavePinner kişisel bilgileri para karşılığında satmaz. Talebinizi ",
  contactLabel: "iletişim sayfasından",
  rightsAfterContact: " gönderin. Talebi doğrulamak ve yanıtlamak için yeterli bilgi isteyebiliriz.",
  changesHeading: "Politikadaki değişiklikler",
  changes: "Hizmet, sağlayıcılar veya yasal gereklilikler değiştiğinde bu politikayı güncelleyebiliriz. Önemli değişiklikler yeni bir revizyon tarihiyle burada yayımlanır.",
  lastUpdatedLabel: "Son güncelleme",
  lastUpdated: "2 Ağustos 2026",
});

const TR_ABOUT = aboutPage("tr", {
  seoTitle: "SavePinner Hakkında",
  metaDescription: "SavePinner’ı kimin işlettiğini, hizmetin nasıl çalıştığını ve finanse edildiğini, hata veya hak sorunlarının nasıl bildirileceğini öğrenin.",
  title: "SavePinner Hakkında",
  intro: "SavePinner, kullanma izniniz bulunan herkese açık Pinterest medya bağlantılarını işlemenize yardımcı olmak için SavePinner ekibinin geliştirdiği bağımsız bir web aracıdır.",
  serviceHeading: "Hizmet ne yapar?",
  service: "Ziyaretçi herkese açık bir Pin URL’si gönderir. SavePinner URL’yi doğrular, herkese açık sayfayı istek anında alır ve teknik olarak kullanılabilen medya seçeneklerini gösterir. Pinterest girişi istenmez; özel veya silinmiş Pin’ler desteklenmez.",
  operatorHeading: "SavePinner’ı kim işletiyor?",
  operatorBeforeEmail: "Hizmet SavePinner ekibi tarafından işletilir ve sürdürülür. Destek ve düzeltmeler için herkese açık adresimiz ",
  operatorAfterEmail: ". Normalde 3–5 iş günü içinde yanıt veririz.",
  independenceHeading: "Bağımsızlık ve finansman",
  independence: "SavePinner Pinterest ile bağlantılı, Pinterest tarafından desteklenen veya onaylanan bir hizmet değildir. Hizmet reklamlarla finanse edilebilir. Reklamlar indirme sonuçlarının sırasını veya teknik seçimini değiştirmez ve ürün kontrollerinden görsel olarak ayrılır.",
  responsibleHeading: "Sorumlu kullanım ve telif hakkı",
  responsibleBeforeDmca: "Bir URL’nin herkese açık olması telif, gizlilik, kişilik veya sözleşme haklarını ortadan kaldırmaz. SavePinner’ı yalnızca size ait, indirme izniniz bulunan ya da yürürlükteki yasaların izin verdiği içerikler için kullanın. Hak sahipleri ",
  dmcaLabel: "DMCA sürecimizi",
  responsibleAfterDmca: " izleyebilir.",
  maintenanceHeading: "Hizmeti nasıl sürdürüyoruz?",
  maintenance: ["Ürün açıklamaları mevcut hizmet davranışı ve ilgili resmî belgelerle karşılaştırılarak kontrol edilir.", "Güvenilirlik tanılamaları tam gönderilen URL’leri, sorgu dizelerini ve indirme jetonlarını içermez.", "Önemli ürün, gizlilik ve politika değişiklikleri ilgili herkese açık sayfalara yansıtılır."],
  correctionsHeading: "Düzeltmeler ve geri bildirim",
  correctionsBeforeContact: "Bir sayfa hatalıysa, indirme başarısız oluyorsa veya bir içeriğin işlenmemesi gerektiğini düşünüyorsanız URL’yi, kısa açıklamayı ve destekleyici bilgileri ",
  contactLabel: "iletişim sayfamızdan",
  correctionsAfterContact: " gönderin. Parola veya özel hesap bilgisi göndermeyin.",
  lastUpdatedLabel: "Son güncelleme",
  lastUpdated: "2 Ağustos 2026",
});

const PL_PRIVACY = privacyPage("pl", {
  seoTitle: "Polityka Prywatności — SavePinner",
  metaDescription: "Jak SavePinner przetwarza linki, żądania multimediów, dane techniczne, pliki cookie reklam i ustawienia prywatności.",
  title: "Polityka prywatności",
  intro: "SavePinner przetwarza tylko informacje potrzebne do obsługi żądania, ochrony usługi oraz — gdy reklamy są włączone — finansowania jej działania.",
  informationHeading: "Przetwarzane informacje",
  headers: ["Informacja", "Cel przetwarzania", "Przechowywanie"],
  rows: [
    ["Przesłany adres URL Pinterest", "Sprawdzenie i obsługa tego konkretnego żądania", "Nie jest celowo przechowywany po zakończeniu żądania; pełne adresy URL są wyłączone z dzienników aplikacji"],
    ["Żądane multimedia", "Udostępnienie bezpośredniego linku lub przesłanie pliku na urządzenie", "Nie są przechowywane w bibliotece; sieć i hosting mogą tymczasowo zapisać kopie w pamięci podręcznej"],
    ["Adres IP i metadane żądania", "Ograniczanie liczby żądań, zapobieganie nadużyciom, bezpieczeństwo i dostarczanie usługi", "Krótko używane przez aplikację; dostawcy hostingu mogą przechowywać dzienniki bezpieczeństwa zgodnie ze swoimi zasadami"],
    ["Dane diagnostyczne", "Badanie błędów i niezawodności", "Dzienniki zawierają ogólne dane o błędach, czasie i rozmiarze pliku, bez pełnych URL-i, parametrów i tokenów pobierania"],
  ],
  accountsHeading: "Konta, pliki i kontakt",
  accountsBeforeEmail: "Konto nie jest potrzebne, a SavePinner nie prosi o hasło do Pinterest. Multimedia są pobierane na żądanie i nie trafiają do stałej biblioteki. Jeśli napiszesz na ",
  accountsAfterEmail: ", przetworzymy adres e-mail i wiadomość, aby odpowiedzieć i zachować niezbędną korespondencję.",
  adsHeading: "Reklamy, pliki cookie i zgoda",
  adsBeforeGoogle: "Gdy reklamy są włączone, zewnętrzni dostawcy, w tym Google, mogą używać plików cookie, pamięci lokalnej, znaczników internetowych, adresów IP lub innych identyfikatorów do wyświetlania, ograniczania, personalizacji i pomiaru reklam. Google wyjaśnia, ",
  googleLabel: "jak wykorzystuje informacje z witryn partnerów",
  adsAfterGoogle: ".",
  consentBeforeSettings: "Tam, gdzie jest to wymagane, przed reklamami spersonalizowanymi używamy certyfikowanej przez Google platformy do zebrania i zapisania wyborów. Preferencje można też zmienić w ",
  settingsLabel: "Ustawieniach reklam Google",
  consentAfterSettings: ". Odrzucenie reklam spersonalizowanych nie musi usunąć wszystkich reklam; nadal mogą pojawiać się reklamy kontekstowe lub niespersonalizowane.",
  providersHeading: "Dostawcy usług i przetwarzanie międzynarodowe",
  providers: "Dostawcy hostingu, bezpieczeństwa, poczty i reklam przetwarzają ograniczone dane w celu świadczenia usług. Rozpoznanie Pina wymaga także wysłania przez nasz serwer żądania do podanej publicznej strony Pinterest. Dostawcy mogą przetwarzać dane w innych krajach zgodnie ze swoimi warunkami i zabezpieczeniami prywatności.",
  rightsHeading: "Twoje prawa",
  rightsBeforeContact: "W zależności od miejsca zamieszkania możesz mieć prawo do dostępu, sprostowania, usunięcia, ograniczenia przetwarzania, sprzeciwu i wycofania zgody. SavePinner nie sprzedaje danych osobowych za pieniądze. Wyślij żądanie przez ",
  contactLabel: "stronę kontaktową",
  rightsAfterContact: ". Możemy potrzebować informacji wystarczających do weryfikacji i udzielenia odpowiedzi.",
  changesHeading: "Zmiany w polityce",
  changes: "Możemy aktualizować tę politykę, gdy zmieniają się usługa, dostawcy lub wymogi prawne. Istotne zmiany zostaną opublikowane tutaj z nową datą aktualizacji.",
  lastUpdatedLabel: "Ostatnia aktualizacja",
  lastUpdated: "2 sierpnia 2026",
});

const PL_ABOUT = aboutPage("pl", {
  seoTitle: "O SavePinner",
  metaDescription: "Kto prowadzi SavePinner, jak działa i jest finansowana usługa oraz jak zgłosić błąd lub problem dotyczący praw.",
  title: "O SavePinner",
  intro: "SavePinner to niezależne narzędzie internetowe prowadzone przez zespół SavePinner, które pomaga obsługiwać publiczne linki do multimediów Pinterest, gdy użytkownik ma prawo z nich korzystać.",
  serviceHeading: "Jak działa usługa",
  service: "Użytkownik przesyła adres URL publicznego Pina. SavePinner sprawdza adres, na żądanie pobiera publiczną stronę i pokazuje technicznie dostępne multimedia. Nie prosi o logowanie do Pinterest i nie obsługuje Pinów prywatnych ani usuniętych.",
  operatorHeading: "Kto prowadzi SavePinner",
  operatorBeforeEmail: "Usługę prowadzi i utrzymuje zespół SavePinner. Publiczny adres do pomocy i zgłaszania poprawek to ",
  operatorAfterEmail: ". Zwykle odpowiadamy w ciągu 3–5 dni roboczych.",
  independenceHeading: "Niezależność i finansowanie",
  independence: "SavePinner nie jest powiązany, sponsorowany ani wspierany przez Pinterest. Usługa może być finansowana z reklam. Reklamy nie zmieniają kolejności ani technicznego wyboru wyników pobierania i są wizualnie oddzielone od elementów obsługi narzędzia.",
  responsibleHeading: "Odpowiedzialne korzystanie i prawa autorskie",
  responsibleBeforeDmca: "Publiczny adres URL nie znosi praw autorskich, prawa do prywatności, wizerunku ani praw umownych. Używaj SavePinner tylko do własnych treści, treści pobieranych za zgodą lub zastosowań dozwolonych przez prawo. Właściciele praw mogą skorzystać z naszej ",
  dmcaLabel: "procedury DMCA",
  responsibleAfterDmca: ".",
  maintenanceHeading: "Jak dbamy o usługę",
  maintenance: ["Informacje o produkcie są sprawdzane względem aktualnego działania usługi i odpowiedniej dokumentacji oficjalnej.", "Dane diagnostyczne nie zawierają pełnych przesłanych URL-i, parametrów zapytania ani tokenów pobierania.", "Istotne zmiany produktu, prywatności i zasad są odzwierciedlane na odpowiednich stronach publicznych."],
  correctionsHeading: "Poprawki i opinie",
  correctionsBeforeContact: "Jeśli strona zawiera błąd, pobieranie nie działa lub uważasz, że dana treść nie powinna być przetwarzana, wyślij URL, krótkie wyjaśnienie i informacje pomocnicze przez ",
  contactLabel: "stronę kontaktową",
  correctionsAfterContact: ". Nie wysyłaj haseł ani prywatnych danych konta.",
  lastUpdatedLabel: "Ostatnia aktualizacja",
  lastUpdated: "2 sierpnia 2026",
});

export const ADDITIONAL_TRUST_PAGES: Record<
  AdditionalLocale,
  Record<TrustPageKey, TrustPageContent>
> = {
  fr: { privacy: FR_PRIVACY, about: FR_ABOUT },
  de: { privacy: DE_PRIVACY, about: DE_ABOUT },
  it: { privacy: IT_PRIVACY, about: IT_ABOUT },
  nl: { privacy: NL_PRIVACY, about: NL_ABOUT },
  ja: { privacy: JA_PRIVACY, about: JA_ABOUT },
  tr: { privacy: TR_PRIVACY, about: TR_ABOUT },
  pl: { privacy: PL_PRIVACY, about: PL_ABOUT },
};
