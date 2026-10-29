export const SITE_ORIGIN = "https://www.slackicimes.org";

export const SITE_NAME = "Slack'icîmes";

export const FESTIVAL_NAME_HIGHLIGHT = "Festi";

export const FESTIVAL_FULL_NAME_HIGHLIGHT = "Winter FestiSlack";

export const CONTACT_EMAIL = "slackicimes@gmail.com";

export interface ContactPerson {
  firstName: string;
  displayPhone: string;
  internationalPhone: string;
}

export const CONTACT_PEOPLE: ContactPerson[] = [
  {
    firstName: "Gaëlle",
    displayPhone: "06 35 36 61 80",
    internationalPhone: "+33635366180",
  },
  {
    firstName: "Chloë",
    displayPhone: "06 26 96 55 08",
    internationalPhone: "+33626965508",
  },
];

export const POSTAL_ADDRESS_LINES = [
  "Association Slack'icîmes",
  "Chalet de la Croizette",
  "Arc 1800",
  "73700 Bourg Saint Maurice",
];

export const CONTACT_FORM_ENDPOINT = "https://api.web3forms.com/submit";

export const WEB3FORMS_ACCESS_KEY = "5ae66538-452d-4f43-a177-b69d6666129e";

export const STAGES_REGISTRATION_URL =
  "https://www.helloasso.com/associations/slackicimes/evenements/stages-highlines-2026";

export interface SocialProfile {
  name: string;
  url: string;
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  { name: "Facebook", url: "https://www.facebook.com/slackicimes" },
  { name: "Instagram", url: "https://www.instagram.com/slackicimes/" },
  {
    name: "HelloAsso",
    url: "https://www.helloasso.com/associations/slackicimes/",
  },
];
