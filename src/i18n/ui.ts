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
    menuToggle: "Menu",
    homeLinkLabel: "Accueil Slack'icîmes",
    association: "L'association",
    winterFestislack: "Winter Festislack",
    pastEditions: "Anciennes éditions",
    stages: "Stages",
    youthStages: "Stages jeunes",
    registrations: "Inscriptions",
    guestbook: "Livre d'or",
    services: "Prestations",
    contact: "Contact",
  },
  languageSwitcher: {
    label: "Langue",
  },
  footer: {
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
    menuToggle: "Menu",
    homeLinkLabel: "Slack'icîmes home",
    association: "The association",
    winterFestislack: "Winter Festislack",
    pastEditions: "Previous editions",
    stages: "Workshops",
    youthStages: "Young camp",
    registrations: "Registrations",
    guestbook: "Guestbook",
    services: "Shows and introductions",
    contact: "Contact",
  },
  languageSwitcher: {
    label: "Language",
  },
  footer: {
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
};

const UI_STRINGS: Record<Locale, UiStrings> = { fr, en };

export function uiStrings(locale: Locale): UiStrings {
  return UI_STRINGS[locale];
}
