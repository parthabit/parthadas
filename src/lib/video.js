// Normalizes a project's `video` field into { type, embedUrl } so the
// VideoEmbed component can render YouTube / YouTube Shorts / Vimeo / MP4
// without any per-project special-casing.

export function resolveVideo(video) {
  if (!video) return null;

  // Support both the object form { type, url } and a bare URL string.
  const url = typeof video === "string" ? video : video.url;
  if (!url) return null;

  const explicitType = typeof video === "object" ? video.type : null;

  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/
  );
  if (explicitType === "youtube" || ytMatch) {
    const id = ytMatch ? ytMatch[1] : null;
    if (id) {
      return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${id}` };
    }
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (explicitType === "vimeo" || vimeoMatch) {
    const id = vimeoMatch ? vimeoMatch[1] : null;
    if (id) {
      return { type: "vimeo", embedUrl: `https://player.vimeo.com/video/${id}` };
    }
  }

  if (explicitType === "mp4" || /\.mp4($|\?)/.test(url)) {
    return { type: "mp4", embedUrl: url };
  }

  // Fallback: unrecognized URL, just link out instead of embedding.
  return { type: "link", embedUrl: url };
}

export default resolveVideo;
