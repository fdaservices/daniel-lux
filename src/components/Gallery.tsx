"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CloseIcon, ArrowRightIcon, ZoomIcon } from "./icons";

export interface GalleryImage {
  src: string;
  alt: string;
}

/**
 * Réalisations gallery with an accessible lightbox.
 * Tiles carry no captions; clicking opens the full image in an overlay with
 * keyboard support (Escape to close, ←/→ to navigate) and focus management.
 */
export function Gallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((i) =>
        i === null ? i : (i + dir + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, step]);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Agrandir l'image : ${img.alt}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-paper-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className="absolute inset-0 bg-night/0 transition-colors duration-300 group-hover:bg-night/30"
                aria-hidden="true"
              />
              <span
                className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white/95 text-night opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                aria-hidden="true"
              >
                <ZoomIcon className="h-5 w-5" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galerie des réalisations Daniel-Lux"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-night/95 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Fermer la galerie"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-night-600 bg-night-800/70 text-white transition-colors hover:border-accent hover:text-accent"
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-night-600 bg-night-800/70 text-white transition-colors hover:border-accent hover:text-accent sm:left-6"
          >
            <ArrowRightIcon className="h-6 w-6 rotate-180" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-night-600 bg-night-800/70 text-white transition-colors hover:border-accent hover:text-accent sm:right-6"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>

          <figure
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              width={1536}
              height={1024}
              className="mx-auto h-auto max-h-[82vh] w-auto rounded-xl object-contain shadow-2xl"
            />
          </figure>
        </div>
      )}
    </>
  );
}
