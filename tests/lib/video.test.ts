import { describe, expect, it } from "vitest";
import { toVideoSource, videoPlatformName } from "../../src/lib/video";

describe("toVideoSource", () => {
  it("embeds a YouTube video through the privacy enhanced domain", () => {
    expect(
      toVideoSource("https://www.youtube.com/watch?v=iIkt2Ot478s"),
    ).toEqual({
      kind: "embed",
      embedUrl: "https://www.youtube-nocookie.com/embed/iIkt2Ot478s",
    });
  });

  it("keeps the start time of a YouTube link", () => {
    expect(
      toVideoSource("https://www.youtube.com/watch?v=Kj8172L8RzY&t=30s"),
    ).toEqual({
      kind: "embed",
      embedUrl: "https://www.youtube-nocookie.com/embed/Kj8172L8RzY?start=30",
    });
  });

  it("supports short YouTube links", () => {
    expect(toVideoSource("https://youtu.be/advQbzCb-VY")).toEqual({
      kind: "embed",
      embedUrl: "https://www.youtube-nocookie.com/embed/advQbzCb-VY",
    });
  });

  it("links to Facebook videos instead of embedding them", () => {
    const facebookUrl = "https://www.facebook.com/watch/?v=10154320389351759";
    expect(toVideoSource(facebookUrl)).toEqual({
      kind: "external",
      url: facebookUrl,
    });
  });

  it("rejects other video hosts", () => {
    expect(() => toVideoSource("https://vimeo.com/123")).toThrow(
      /Unsupported video URL/,
    );
  });
});

describe("videoPlatformName", () => {
  it("names the platform hosting the video", () => {
    expect(videoPlatformName("https://youtu.be/bKfmpMardhE")).toBe("YouTube");
    expect(
      videoPlatformName("https://www.facebook.com/watch/?v=1914871465243438"),
    ).toBe("Facebook");
  });

  it("rejects other hosts", () => {
    expect(() => videoPlatformName("https://vimeo.com/1")).toThrow(
      /Unsupported video URL/,
    );
  });
});
