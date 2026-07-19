"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import css from "./DressGallery.module.css";

type Props = {
  name: string;
  images: string[];
};

export default function DressGallery({ name, images }: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className={css.gallery}>
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

      <div className={css.mainImage} onClick={() => setIsOpen(true)}>
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
          <button className={css.close} onClick={() => setIsOpen(false)}>
            ✕
          </button>

          <button
            className={css.prev}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>

          <Image
            src={images[currentImage]}
            alt={name}
            width={900}
            height={1200}
            className={css.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className={css.next}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
