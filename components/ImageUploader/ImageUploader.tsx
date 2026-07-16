"use client";

import { useState } from "react";
import Image from "next/image";
import css from "./ImageUploader.module.css";

type Props = {
  images: string[];
  onChange: (images: string[]) => void;
};

export default function ImageUploader({ images, onChange }: Props) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || !files.length) return;

    try {
      setLoading(true);

      const uploaded: string[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();

        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();

          console.log("UPLOAD ERROR:", error);

          throw new Error(error.error || "Помилка завантаження фото");
        }

        const data = await response.json();
        console.log("UPLOAD RESPONSE:", data);

        uploaded.push(data.url);
      }

      onChange([...images, ...uploaded]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (url: string) => {
    onChange(images.filter((image) => image !== url));
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Фото сукні</h3>

      <input type="file" multiple accept="image/*" onChange={handleUpload} />

      {loading && <p>Завантаження...</p>}

      <div className={css.preview}>
        {images.filter(Boolean).map((image) => (
          <div key={image} className={css.item}>
            <Image src={image} alt="dress" width={150} height={200} />

            <button type="button" onClick={() => removeImage(image)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
