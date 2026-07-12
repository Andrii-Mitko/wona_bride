"use client";
"use client";

import { useState } from "react";
import Image from "next/image";
import css from "./DressGallery.module.css";

type Props = {
  name: string;
  images: string[];
};

export default function DressGallery({ name, images }: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className={css.gallery}>
      <div className={css.mainImage}>
        <Image
          src={images[currentImage]}
          alt={name}
          width={600}
          height={800}
          className={css.image}
          priority
        />
      </div>

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
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
