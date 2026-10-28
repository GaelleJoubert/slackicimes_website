import type { Locale } from "./locales";

const fr = {
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
};

export type UiStrings = typeof fr;

const en: UiStrings = {
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
};

const UI_STRINGS: Record<Locale, UiStrings> = { fr, en };

export function uiStrings(locale: Locale): UiStrings {
  return UI_STRINGS[locale];
}
