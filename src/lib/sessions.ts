export interface CourseSession {
  start: Date;
  end: Date;
}

export interface MonthGroup<Item> {
  month: Date;
  items: Item[];
}

const ONE_DAY_IN_MILLISECONDS = 86_400_000;
const WEEKEND_LENGTH_IN_DAYS = 2;
const FIRST_DAY_OF_MONTH_SUFFIXES: Record<string, string> = { fr: "er" };
const TRAILING_PERIOD = /\.$/;
const ISO_DATE_LENGTH = "yyyy-mm-dd".length;

function primaryLanguage(languageTag: string): string {
  return new Intl.Locale(languageTag).language;
}

export function monthName(date: Date, languageTag: string): string {
  return new Intl.DateTimeFormat(languageTag, {
    month: "long",
    timeZone: "UTC",
  }).format(date);
}

function weekdayName(date: Date, languageTag: string): string {
  return new Intl.DateTimeFormat(languageTag, {
    weekday: "short",
    timeZone: "UTC",
  })
    .format(date)
    .replace(TRAILING_PERIOD, "");
}

function isMonthWrittenFirst(languageTag: string): boolean {
  const partTypes = new Intl.DateTimeFormat(languageTag, {
    day: "numeric",
    month: "long",
  })
    .formatToParts()
    .map((part) => part.type);
  return partTypes.indexOf("month") < partTypes.indexOf("day");
}

function dayOfMonth(date: Date, languageTag: string): string {
  const day = date.getUTCDate();
  const isFirstOfMonth = day === 1;
  const suffix = isFirstOfMonth
    ? (FIRST_DAY_OF_MONTH_SUFFIXES[primaryLanguage(languageTag)] ?? "")
    : "";
  return `${day}${suffix}`;
}

function formatDayAndMonth(date: Date, languageTag: string): string {
  const day = dayOfMonth(date, languageTag);
  const month = monthName(date, languageTag);
  return isMonthWrittenFirst(languageTag)
    ? `${month} ${day}`
    : `${day} ${month}`;
}

function isSameMonth(first: Date, second: Date): boolean {
  return (
    first.getUTCFullYear() === second.getUTCFullYear() &&
    first.getUTCMonth() === second.getUTCMonth()
  );
}

function isSingleDay(session: CourseSession): boolean {
  return session.start.getTime() === session.end.getTime();
}

export function sessionLengthInDays(session: CourseSession): number {
  const elapsedDays =
    (session.end.getTime() - session.start.getTime()) / ONE_DAY_IN_MILLISECONDS;
  return elapsedDays + 1;
}

export function formatSessionRange(
  session: CourseSession,
  languageTag: string,
): string {
  const { start, end } = session;
  if (isSingleDay(session)) return formatDayAndMonth(start, languageTag);
  if (!isSameMonth(start, end)) {
    return `${formatDayAndMonth(start, languageTag)}-${formatDayAndMonth(end, languageTag)}`;
  }
  const days = `${dayOfMonth(start, languageTag)}-${dayOfMonth(end, languageTag)}`;
  const month = monthName(start, languageTag);
  return isMonthWrittenFirst(languageTag)
    ? `${month} ${days}`
    : `${days} ${month}`;
}

export function formatSessionLines(
  sessions: CourseSession[],
  languageTag: string,
  separator: string,
): string[] {
  const ranges = sessions.map((session) =>
    formatSessionRange(session, languageTag),
  );
  const areAllWeekends = sessions.every(
    (session) => sessionLengthInDays(session) <= WEEKEND_LENGTH_IN_DAYS,
  );
  return areAllWeekends ? [ranges.join(separator)] : ranges;
}

export function formatSessionDays(session: CourseSession): string {
  const startDay = session.start.getUTCDate();
  if (isSingleDay(session)) return `${startDay}`;
  return `${startDay}-${session.end.getUTCDate()}`;
}

export function formatSessionWeekdays(
  session: CourseSession,
  languageTag: string,
): string {
  const startWeekday = weekdayName(session.start, languageTag);
  if (isSingleDay(session)) return startWeekday;
  return `${startWeekday}-${weekdayName(session.end, languageTag)}`;
}

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, ISO_DATE_LENGTH);
}

function firstDayOfMonth(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

export function groupByStartMonth<Item extends { session: CourseSession }>(
  items: Item[],
): MonthGroup<Item>[] {
  const chronologicalItems = [...items].sort(
    (first, second) =>
      first.session.start.getTime() - second.session.start.getTime(),
  );
  return chronologicalItems.reduce<MonthGroup<Item>[]>((groups, item) => {
    const currentGroup = groups.at(-1);
    const belongsToCurrentGroup =
      currentGroup && isSameMonth(currentGroup.month, item.session.start);
    if (belongsToCurrentGroup) {
      currentGroup.items.push(item);
      return groups;
    }
    return [
      ...groups,
      { month: firstDayOfMonth(item.session.start), items: [item] },
    ];
  }, []);
}

export function seasonYear(sessions: CourseSession[]): number {
  const firstSession = sessions[0];
  if (!firstSession) {
    throw new Error("A course needs at least one session to show its year.");
  }
  return firstSession.start.getUTCFullYear();
}
