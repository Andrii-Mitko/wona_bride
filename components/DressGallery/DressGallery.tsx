"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import Image from "next/image";
import css from "./DressGallery.module.css";

type Props = {
  name: string;
  images: string[];
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const SWIPE_DISTANCE = 50;

export default function DressGallery({ name, images }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const touchStart = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const lastTouch = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const initialPinchDistance = useRef<number | null>(null);
  const initialZoom = useRef(MIN_ZOOM);

  const lastTapTime = useRef(0);

  const resetZoom = useCallback(() => {
    setZoom(MIN_ZOOM);
    setPosition({ x: 0, y: 0 });
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    resetZoom();
  }, [images.length, resetZoom]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetZoom();
  }, [images.length, resetZoom]);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    resetZoom();
  }, [resetZoom]);

  const getPinchDistance = (touches: TouchEvent<HTMLDivElement>["touches"]) => {
    const first = touches[0];
    const second = touches[1];

    return Math.hypot(
      second.clientX - first.clientX,
      second.clientY - first.clientY,
    );
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      initialPinchDistance.current = getPinchDistance(event.touches);
      initialZoom.current = zoom;

      touchStart.current = null;
      lastTouch.current = null;

      return;
    }

    if (event.touches.length === 1) {
      const { clientX, clientY } = event.touches[0];

      touchStart.current = {
        x: clientX,
        y: clientY,
      };

      lastTouch.current = {
        x: clientX,
        y: clientY,
      };
    }
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2 && initialPinchDistance.current !== null) {
      const currentDistance = getPinchDistance(event.touches);

      const scale = currentDistance / initialPinchDistance.current;

      const nextZoom = Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, initialZoom.current * scale),
      );

      setZoom(nextZoom);

      if (nextZoom === MIN_ZOOM) {
        setPosition({ x: 0, y: 0 });
      }

      return;
    }

    if (event.touches.length === 1 && zoom > MIN_ZOOM && lastTouch.current) {
      const { clientX, clientY } = event.touches[0];

      const deltaX = clientX - lastTouch.current.x;
      const deltaY = clientY - lastTouch.current.y;

      lastTouch.current = {
        x: clientX,
        y: clientY,
      };

      setPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (initialPinchDistance.current !== null) {
      initialPinchDistance.current = null;

      if (zoom < 1.05) {
        resetZoom();
      }

      return;
    }

    if (!touchStart.current) {
      return;
    }

    const touch = event.changedTouches[0];

    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;

    touchStart.current = null;
    lastTouch.current = null;

    // Якщо фото збільшене — рухаємо фото,
    // а не перемикаємо фотографію.
    if (zoom > MIN_ZOOM) {
      return;
    }

    // Вертикальний рух не є свайпом.
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    if (Math.abs(deltaX) < SWIPE_DISTANCE) {
      return;
    }

    if (deltaX < 0) {
      nextImage();
    } else {
      prevImage();
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();

    if (now - lastTapTime.current < 300) {
      if (zoom > MIN_ZOOM) {
        resetZoom();
      } else {
        setZoom(2);
      }
    }

    lastTapTime.current = now;
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight" && zoom === MIN_ZOOM) {
        nextImage();
      }

      if (event.key === "ArrowLeft" && zoom === MIN_ZOOM) {
        prevImage();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, zoom, closeLightbox, nextImage, prevImage]);

  return (
    <div className={css.gallery}>
      {images.length > 1 && (
        <div className={css.thumbnails}>
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => {
                setCurrentImage(index);
                resetZoom();
              }}
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

      <div className={css.mainImage} onClick={() => setIsOpen(true)}>
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
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className={css.close}
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            aria-label="Закрити"
          >
            ✕
          </button>

          {images.length > 1 && zoom === MIN_ZOOM && (
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

          <div
            className={css.imageContainer}
            onClick={(event) => {
              event.stopPropagation();
              handleDoubleTap();
            }}
          >
            <Image
              src={images[currentImage]}
              alt={`${name} ${currentImage + 1}`}
              width={1200}
              height={1600}
              className={css.lightboxImage}
              style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoom})`,
              }}
              priority
              draggable={false}
            />
          </div>

          {images.length > 1 && zoom === MIN_ZOOM && (
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

          {zoom > MIN_ZOOM && (
            <div className={css.zoomIndicator}>{Math.round(zoom * 100)}%</div>
          )}
        </div>
      )}
    </div>
  );
}
