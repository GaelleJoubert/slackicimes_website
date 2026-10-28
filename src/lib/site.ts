export const SITE_ORIGIN = "https://www.slackicimes.org";

export const SITE_NAME = "Slack'icîmes";

export const CONTACT_EMAIL = "slackicimes@gmail.com";

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
