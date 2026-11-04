export const FAQ_THEMES = [
  "choosing",
  "registration",
  "course",
  "access",
  "living",
  "companions",
] as const;

export type FaqTheme = (typeof FAQ_THEMES)[number];

export interface FaqThemeGroup<Question> {
  theme: FaqTheme;
  questions: Question[];
}

export function groupByFaqTheme<Question extends { theme: FaqTheme }>(
  questions: Question[],
): FaqThemeGroup<Question>[] {
  const themelessQuestion = questions.find(
    (question) => !FAQ_THEMES.includes(question.theme),
  );
  if (themelessQuestion) {
    throw new Error(
      `FAQ question without a known theme: ${JSON.stringify(themelessQuestion)}. Add a theme to its entry, or restart the dev server if the entry already has one.`,
    );
  }
  return FAQ_THEMES.map((theme) => ({
    theme,
    questions: questions.filter((question) => question.theme === theme),
  })).filter((group) => group.questions.length > 0);
}
