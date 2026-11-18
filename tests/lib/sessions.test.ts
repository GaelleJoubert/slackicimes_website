import { describe, expect, it } from "vitest";
import {
  formatSessionDays,
  formatSessionLines,
  formatSessionRange,
  formatSessionWeekdays,
  groupByStartMonth,
  monthName,
  seasonYear,
  sessionLengthInDays,
  toIsoDate,
  type CourseSession,
} from "../../src/lib/sessions";

const FRENCH_SEPARATOR = " ; ";
const ENGLISH_SEPARATOR = "; ";

function session(start: string, end: string): CourseSession {
  return { start: new Date(start), end: new Date(end) };
}

const juneWeekend = session("2027-06-26", "2027-06-27");
const julyWeekend = session("2027-07-03", "2027-07-04");
const monthCrossingWeekend = session("2027-07-31", "2027-08-01");
const julyWeek = session("2027-07-26", "2027-07-30");
const augustWeek = session("2027-08-16", "2027-08-20");

describe("sessionLengthInDays", () => {
  it("counts both the first and the last day", () => {
    expect(sessionLengthInDays(juneWeekend)).toBe(2);
    expect(sessionLengthInDays(julyWeek)).toBe(5);
  });
});

describe("formatSessionRange", () => {
  it("writes the days before the month in French", () => {
    expect(formatSessionRange(juneWeekend, "fr")).toBe("26-27 juin");
  });

  it("writes the month before the days in English", () => {
    expect(formatSessionRange(juneWeekend, "en")).toBe("June 26-27");
  });

  it("names both months when a session crosses months", () => {
    expect(formatSessionRange(monthCrossingWeekend, "fr")).toBe(
      "31 juillet-1er août",
    );
    expect(formatSessionRange(monthCrossingWeekend, "en")).toBe(
      "July 31-August 1",
    );
  });

  it("writes a single day without a range", () => {
    expect(formatSessionRange(session("2027-07-14", "2027-07-14"), "fr")).toBe(
      "14 juillet",
    );
  });
});

describe("formatSessionLines", () => {
  it("puts weekends on one line", () => {
    expect(
      formatSessionLines([juneWeekend, julyWeekend], "fr", FRENCH_SEPARATOR),
    ).toEqual(["26-27 juin ; 3-4 juillet"]);
  });

  it("gives each longer session its own line", () => {
    expect(
      formatSessionLines([julyWeek, augustWeek], "en", ENGLISH_SEPARATOR),
    ).toEqual(["July 26-30", "August 16-20"]);
  });
});

describe("formatSessionDays", () => {
  it("shows the first and last day numbers", () => {
    expect(formatSessionDays(julyWeek)).toBe("26-30");
    expect(formatSessionDays(monthCrossingWeekend)).toBe("31-1");
  });
});

describe("formatSessionWeekdays", () => {
  it("names the first and last weekday without abbreviation dots", () => {
    expect(formatSessionWeekdays(juneWeekend, "fr")).toBe("sam-dim");
    expect(formatSessionWeekdays(julyWeek, "en")).toBe("Mon-Fri");
  });
});

describe("groupByStartMonth", () => {
  it("sorts sessions and groups them by the month they start in", () => {
    const items = [augustWeek, monthCrossingWeekend, juneWeekend, julyWeek].map(
      (courseSession) => ({ session: courseSession }),
    );

    const groups = groupByStartMonth(items);

    expect(groups.map((group) => monthName(group.month, "en"))).toEqual([
      "June",
      "July",
      "August",
    ]);
    expect(groups[1]?.items.map((item) => item.session)).toEqual([
      julyWeek,
      monthCrossingWeekend,
    ]);
  });
});

describe("toIsoDate", () => {
  it("keeps only the calendar date", () => {
    expect(toIsoDate(juneWeekend.start)).toBe("2027-06-26");
  });
});

describe("seasonYear", () => {
  it("reads the year of the first session", () => {
    expect(seasonYear([julyWeek])).toBe(2027);
  });

  it("refuses a course without sessions", () => {
    expect(() => seasonYear([])).toThrow(/at least one session/);
  });
});
