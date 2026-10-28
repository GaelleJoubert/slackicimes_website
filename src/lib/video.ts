export type VideoSource =
  { kind: "embed"; embedUrl: string } | { kind: "external"; url: string };

const YOUTUBE_HOSTS = new Set(["www.youtube.com", "youtube.com", "youtu.be"]);
const FACEBOOK_HOSTS = new Set(["www.facebook.com", "facebook.com"]);
const YOUTUBE_PRIVACY_EMBED_ORIGIN = "https://www.youtube-nocookie.com/embed";
const START_TIME_PATTERN = /^(\d+)s?$/;

function youtubeVideoId(videoUrl: URL): string | null {
  if (videoUrl.hostname === "youtu.be") {
    return videoUrl.pathname.slice(1) || null;
  }
  return videoUrl.searchParams.get("v");
}

function startSeconds(videoUrl: URL): number | null {
  const startTime = videoUrl.searchParams.get("t");
  const match = startTime?.match(START_TIME_PATTERN);
  return match ? Number(match[1]) : null;
}

function youtubeEmbedUrl(videoUrl: URL): string {
  const videoId = youtubeVideoId(videoUrl);
  if (!videoId) {
    throw new Error(`YouTube URL "${videoUrl.href}" has no video id.`);
  }
  const start = startSeconds(videoUrl);
  const startQuery = start ? `?start=${start}` : "";
  return `${YOUTUBE_PRIVACY_EMBED_ORIGIN}/${videoId}${startQuery}`;
}

export function toVideoSource(videoUrl: string): VideoSource {
  const parsedUrl = new URL(videoUrl);
  if (YOUTUBE_HOSTS.has(parsedUrl.hostname)) {
    return { kind: "embed", embedUrl: youtubeEmbedUrl(parsedUrl) };
  }
  if (FACEBOOK_HOSTS.has(parsedUrl.hostname)) {
    return { kind: "external", url: videoUrl };
  }
  throw new Error(
    `Unsupported video URL "${videoUrl}": use a YouTube or Facebook link.`,
  );
}
