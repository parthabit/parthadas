import { resolveVideo } from "../lib/video";
import { ExternalLink } from "lucide-react";

export default function VideoEmbed({ video }) {
  const resolved = resolveVideo(video);
  if (!resolved) return null;

  if (resolved.type === "youtube" || resolved.type === "vimeo") {
    return (
      <div className="aspect-video rounded-xl overflow-hidden hairline">
        <iframe
          src={resolved.embedUrl}
          title="Project demo video"
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (resolved.type === "mp4") {
    return (
      <div className="aspect-video rounded-xl overflow-hidden hairline bg-black">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video src={resolved.embedUrl} controls className="h-full w-full" />
      </div>
    );
  }

  return (
    <a
      href={resolved.embedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 font-mono text-sm text-signal-400 hover:underline"
    >
      Watch demo video <ExternalLink size={14} />
    </a>
  );
}
