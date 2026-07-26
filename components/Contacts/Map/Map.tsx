"use client";

import { useEffect, useRef, useState } from "react";
import css from "./Map.module.css";

export default function Map() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={css.wrapper}>
      {isVisible ? (
        <iframe
          src="https://www.google.com/maps?q=вулиця%20Соборна%2023%20Бар&output=embed"
          className={css.mapFrame}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="WONA Bride location"
        />
      ) : (
        <div className={css.placeholder}>Завантаження карти…</div>
      )}
    </div>
  );
}
