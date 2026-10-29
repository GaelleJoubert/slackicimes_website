import type { Locale } from "./locales";

const fr = {
  common: {
    learnMore: "En savoir plus",
  },
  accessibility: {
    skipToContent: "Aller au contenu",
  },
  navigation: {
    mainMenuLabel: "Menu principal",
    menuToggle: "Ouvrir le menu",
    registerButton: "S'inscrire",
    homeLinkLabel: "Accueil Slack'icîmes",
    association: "L'association",
    worldCup: "Coupe du monde",
    winterFestislack: "Winter Festislack",
    pastEditions: "Anciennes éditions",
    stages: "Stages",
    youthStages: "Stages jeunes",
    registrations: "Inscriptions",
    guestbook: "Livre d'or",
    contact: "Contact",
  },
  languageSwitcher: {
    label: "Langue",
  },
  footer: {
    tagline: "Highline & slackline aux Arcs, Savoie",
    siteHeading: "Le site",
    contactHeading: "Contact",
    followUsHeading: "Suivez-nous",
  },
  stages: {
    registrationsButton: "Inscriptions",
    formulasTitle: "Nos formules",
    formulasIntro:
      "Différentes formules pour explorer le monde des airs, faire le plein de sensations, d'émotions et (re)découvrir son corps et son esprit.",
    descriptionHeading: "Description",
    programHeading: "Programme",
    prerequisitesHeading: "Prérequis",
    datesHeading: "Dates",
    priceHeading: "Tarif",
    priceNote: "Ce tarif inclut toutes les activités et le matériel collectif.",
    registerButton: "S'inscrire",
    ticketOfficeButton: "Accéder à la billetterie HelloAsso",
  },
  festival: {
    pastEditionsButton: "Voir les anciennes éditions",
  },
  youthStages: {
    galleryTitle: "Le stage en images",
  },
  video: {
    watchOnFacebook: "Voir la vidéo sur Facebook",
    videoSuffix: "en vidéo",
  },
  faq: {
    title: "FAQ",
    stagesIntro: "Toutes les réponses à vos questions concernant les stages",
  },
  testimonials: {
    title: "Livre d'or",
    intro: "Témoignages de nos stagiaires",
  },
  contactBlock: {
    title: "Contactez-nous",
    phoneHeading: "Téléphone",
    emailHeading: "Email",
    addressHeading: "Adresse",
    writeUsButton: "Nous écrire",
  },
  notFound: {
    pageTitle: "Page introuvable | Slack'icîmes",
    pageDescription: "Cette page n'existe pas ou a été déplacée.",
    title: "Page introuvable",
    text: "La page que vous cherchez n'existe pas ou a été déplacée.",
    homeButton: "Retour à l'accueil",
  },
  contactPage: {
    detailsTitle: "Nos coordonnées",
    formTitle: "Envoyez-nous un message",
    backHomeButton: "Retour à l'accueil",
  },
  contactForm: {
    firstNameLabel: "Prénom",
    lastNameLabel: "Nom",
    emailLabel: "Email",
    topicLabel: "Sujet",
    messageLabel: "Message",
    requiredFieldsNote: "Les champs marqués d'un * sont obligatoires.",
    submitButton: "Envoyer",
    privacyNotice:
      "Vos coordonnées servent uniquement à vous répondre. Le message nous est transmis par le service Web3Forms et n'est pas conservé sur ce site.",
    notificationSubject: "Nouveau message depuis slackicimes.org",
  },
};

export type UiStrings = typeof fr;

const en: UiStrings = {
  common: {
    learnMore: "Learn more",
  },
  accessibility: {
    skipToContent: "Skip to content",
  },
  navigation: {
    mainMenuLabel: "Main menu",
    menuToggle: "Open the menu",
    registerButton: "Register",
    homeLinkLabel: "Slack'icîmes home",
    association: "The association",
    worldCup: "World Cup",
    winterFestislack: "Winter Festislack",
    pastEditions: "Previous editions",
    stages: "Courses",
    youthStages: "Youth course",
    registrations: "Registrations",
    guestbook: "Guestbook",
    contact: "Contact",
  },
  languageSwitcher: {
    label: "Language",
  },
  footer: {
    tagline: "Highline & slackline in Les Arcs, Savoie",
    siteHeading: "The site",
    contactHeading: "Contact",
    followUsHeading: "Follow us",
  },
  stages: {
    registrationsButton: "Registrations",
    formulasTitle: "Our courses",
    formulasIntro:
      "Different formulas to explore the world above, fill up on sensations and emotions, and (re)discover your body and mind.",
    descriptionHeading: "Description",
    programHeading: "Program",
    prerequisitesHeading: "Prerequisites",
    datesHeading: "Dates",
    priceHeading: "Price",
    priceNote: "This price includes all activities and collective equipment.",
    registerButton: "Register",
    ticketOfficeButton: "Go to the HelloAsso ticket office",
  },
  festival: {
    pastEditionsButton: "See previous editions",
  },
  youthStages: {
    galleryTitle: "The course in pictures",
  },
  video: {
    watchOnFacebook: "Watch the video on Facebook",
    videoSuffix: "on video",
  },
  faq: {
    title: "FAQ",
    stagesIntro: "All the answers to your questions about our courses",
  },
  testimonials: {
    title: "Guestbook",
    intro: "Feedback from our trainees",
  },
  contactBlock: {
    title: "Contact us",
    phoneHeading: "Phone",
    emailHeading: "Email",
    addressHeading: "Address",
    writeUsButton: "Write to us",
  },
  notFound: {
    pageTitle: "Page not found | Slack'icîmes",
    pageDescription: "This page does not exist or has moved.",
    title: "Page not found",
    text: "The page you are looking for does not exist or has moved.",
    homeButton: "Back to the home page",
  },
  contactPage: {
    detailsTitle: "Our details",
    formTitle: "Send us a message",
    backHomeButton: "Back to the home page",
  },
  contactForm: {
    firstNameLabel: "First name",
    lastNameLabel: "Last name",
    emailLabel: "Email",
    topicLabel: "Subject",
    messageLabel: "Message",
    requiredFieldsNote: "Fields marked with * are required.",
    submitButton: "Send",
    privacyNotice:
      "Your details are only used to reply to you. The message reaches us through the Web3Forms service and is not stored on this site.",
    notificationSubject: "New message from slackicimes.org (English)",
  },
};

const UI_STRINGS: Record<Locale, UiStrings> = { fr, en };

export function uiStrings(locale: Locale): UiStrings {
  return UI_STRINGS[locale];
}
