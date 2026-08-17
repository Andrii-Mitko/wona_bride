"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Dress } from "@/types/dress";

import css from "./SearchBar.module.css";

export default function SearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 350);

  const [results, setResults] = useState<Dress[]>([]);
  const [isPending, startTransition] = useTransition();

  const closeDropdown = () => {
    setQuery("");
  };

  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (trimmed.length < 2) {
      startTransition(() => setResults([]));
      return;
    }

    fetch(`/api/dress/search?query=${encodeURIComponent(trimmed)}`)
      .then((res) => res.json())
      .then((data) => {
        startTransition(() => setResults(data.dresses ?? []));
      })
      .catch(() => {
        startTransition(() => setResults([]));
      });
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDropdown();
        inputRef.current?.blur();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) return;

    router.push(`/catalog?query=${encodeURIComponent(query.trim())}`);
    closeDropdown();
  };
  return (
    <div className={css.wrapper} ref={wrapperRef}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Пошук суконь..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={css.input}
        />

        <button type="submit" className={css.submitButton} aria-label="Шукати">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M21 21l-4.3-4.3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </form>

      {debouncedQuery.trim().length >= 2 && (
        <div className={css.dropdown}>
          {isPending && <p className={css.status}>Пошук...</p>}

          {!isPending && results.length === 0 && (
            <p className={css.status}>Нічого не знайдено</p>
          )}

          {!isPending &&
            results.map((dress) => (
              <Link
                key={dress._id}
                href={`/catalog/${dress.slug}`}
                className={css.resultItem}
                onClick={closeDropdown}
              >
                <div className={css.resultImage}>
                  <Image
                    src={dress.images[0]}
                    alt={dress.name}
                    fill
                    sizes="56px"
                  />
                </div>

                <div>
                  <p className={css.resultName}>{dress.name}</p>
                  <p className={css.resultPrice}>
                    {dress.price.toLocaleString("uk-UA")} ₴
                  </p>
                </div>
              </Link>
            ))}

          {!isPending && results.length > 0 && (
            <Link
              href={`/catalog?query=${encodeURIComponent(debouncedQuery)}`}
              className={css.seeAll}
              onClick={closeDropdown}
            >
              Показати всі результати →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
