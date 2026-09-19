// components/DressGallery/DressGallery.tsx

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

    const minSwipeDistance = 50;

    touchStartX.current = null;
    touchStartY.current = null;

    // Вертикальный свайп оставляем браузеру для прокрутки страницы.
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

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
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
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
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </div>

      {isOpen && (
        <div className={css.lightbox} onClick={() => setIsOpen(false)}>
          <button
            type="button"
            className={css.close}
            onClick={() => setIsOpen(false)}
            aria-label="Закрити"
          >
            ✕
          </button>

          <button
            type="button"
            className={css.prev}
            onClick={(event) => {
              event.stopPropagation();
              prevImage();
            }}
            aria-label="Попереднє фото"
          >
            ‹
          </button>

          <Image
            src={images[currentImage]}
            alt={name}
            width={900}
            height={1200}
            className={css.lightboxImage}
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            className={css.next}
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            aria-label="Наступне фото"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
