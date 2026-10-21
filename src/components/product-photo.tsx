import { useState } from "react";

export function ProductPhoto({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`grid place-items-center bg-foam px-4 ${className ?? ""}`}>
        <span className="text-center font-display text-xl text-balance text-forest">{alt}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}
