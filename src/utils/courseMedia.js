function createSvgDataUrl(title = "Course") {
  const safeTitle = String(title || "Course").trim().slice(0, 32) || "Course";
  const seed = safeTitle
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);

  const palettes = [
    ["#0f766e", "#14b8a6"],
    ["#1d4ed8", "#60a5fa"],
    ["#7c3aed", "#c084fc"],
    ["#be123c", "#fb7185"],
    ["#b45309", "#f59e0b"],
  ];

  const [start, end] = palettes[seed % palettes.length];
  const encodedTitle = safeTitle.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
      <defs>
        <linearGradient id="g" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#g)" rx="32" />
      <circle cx="1030" cy="125" r="170" fill="rgba(255,255,255,0.14)" />
      <circle cx="160" cy="580" r="220" fill="rgba(255,255,255,0.08)" />
      <text x="72" y="560" fill="white" font-size="72" font-family="Arial, sans-serif" font-weight="700">${encodedTitle}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function getYouTubeThumbnail(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "");
      return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
    }

    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        const videoId = parsed.searchParams.get("v");
        return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
      }

      if (parsed.pathname.startsWith("/embed/")) {
        const videoId = parsed.pathname.split("/")[2];
        return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        const videoId = parsed.pathname.split("/")[2];
        return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
      }
    }
  } catch {
    return "";
  }

  return "";
}

export function getCourseCoverUrl(course) {
  if (course?.imageUrl) return course.imageUrl;

  const youtubeThumbnail = getYouTubeThumbnail(course?.videoUrl);
  if (youtubeThumbnail) return youtubeThumbnail;

  return createSvgDataUrl(course?.title);
}
