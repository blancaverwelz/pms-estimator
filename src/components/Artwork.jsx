import { useState } from "react";
import { Car } from "lucide-react";

// Responsive <picture> with a graceful fallback if the image fails to load.
export default function Artwork({
  desktop, mobile, width, height, alt = "", priority = false,
  mobileQuery = "(max-width: 639px)", className = "",
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={`flex w-full items-center justify-center bg-gradient-to-br from-ink-700 to-ink-900 ${className}`}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Car size={40} className="text-dim" aria-hidden="true" />
      </div>
    );
  }

  return (
    <picture>
      <source media={mobileQuery} srcSet={mobile.src} width={mobile.width} height={mobile.height} />
      <img
        src={desktop}
        width={width}
        height={height}
        alt={alt}
        aria-hidden={alt ? undefined : true}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" } : {})}
        onError={() => setFailed(true)}
        className={`block h-auto w-full ${className}`}
      />
    </picture>
  );
}
