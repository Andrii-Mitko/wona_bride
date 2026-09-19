"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import css from "./DressGallery.module.css";

type Props = {
  name: string;
  images: string[];
};

export default function DressGallery({ name, images }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    const minSwipeDistance = 50;

    // Не реагируем на вертикальный свайп.
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    // Слишком короткое движение — это не свайп.
    if (Math.abs(deltaX) < minSwipeDistance) {
      return;
    }

    if (deltaX < 0) {
      nextImage();
    } else {
      prevImage();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        prevImage();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, nextImage, prevImage]);

  return (
    <div className={`${css.gallery} ${images.length <= 1 ? css.single : ""}`}>
      {images.length > 1 && (
        <div className={css.thumbnails}>
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setCurrentImage(index)}
              className={`${css.thumbnail} ${
                currentImage === index ? css.active : ""
              }`}
            >
              <Image
                src={image}
                alt={`${name} ${index + 1}`}
                width={90}
                height={120}
                className={css.thumbnailImage}
              />
            </button>
          ))}
        </div>
      )}

      <div
        className={css.mainImage}
        onClick={() => setIsOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[currentImage]}
          alt={name}
          width={700}
          height={950}
          className={css.image}
          priority
        />
      </div>

      {isOpen && (
        <div
          className={css.lightbox}
          onClick={() => setIsOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className={css.close}
            onClick={() => setIsOpen(false)}
            aria-label="Закрити"
          >
            ✕
          </button>

          {images.length > 1 && (
            <button
              type="button"
              className={css.prev}
              onClick={(event) => {
                event.stopPropagation();
                prevImage();
              }}
              aria-label="Попередня фотографія"
            >
              ‹
            </button>
          )}

          <Image
            src={images[currentImage]}
            alt={`${name} ${currentImage + 1}`}
            width={1200}
            height={1600}
            className={css.lightboxImage}
            onClick={(event) => event.stopPropagation()}
            priority
          />

          {images.length > 1 && (
            <button
              type="button"
              className={css.next}
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              aria-label="Наступна фотографія"
            >
              ›
            </button>
          )}

          {images.length > 1 && (
            <div className={css.counter}>
              {currentImage + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
