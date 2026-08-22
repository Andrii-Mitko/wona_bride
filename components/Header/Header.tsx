"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import css from "./Header.module.css";
import { useCartStore } from "@/store/cartStore";
import { navigation } from "@/constants/navigation";
import { useWishlistStore } from "@/store/wishlistStore";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const catalogRef = useRef<HTMLDivElement>(null);

  const items = useCartStore((state) => state.items);

  const cartCount = items.length;

  const hasHydrated = useWishlistStore((state) => state.hasHydrated);

  const wishlistItems = useWishlistStore((state) => state.items);

  const wishlistCount = hasHydrated ? wishlistItems.length : 0;

  const closeMenu = () => setIsOpen(false);

  const closeCatalog = () => setIsCatalogOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        catalogRef.current &&
        !catalogRef.current.contains(event.target as Node)
      ) {
        setIsCatalogOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCatalogOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsCatalogOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={css.header}>
      <div className={css.topRow}>
        <Link href="/" className={css.logo} onClick={closeMenu}>
          <Image
            src="/images/logo.png"
            alt="WONA Bride"
            width={140}
            height={64}
            priority
          />
        </Link>

        <nav className={css.desktopNav}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/catalog" className={css.button}>
          Переглянути сукні
        </Link>

        <button
          className={`${css.burger} ${isOpen ? css.active : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={css.secondRow}>
        <div
          ref={catalogRef}
          className={`${css.catalogWrapper} ${
            isCatalogOpen ? css.catalogWrapperOpen : ""
          }`}
        >
          <button
            type="button"
            className={css.catalogLink}
            onClick={() => {
              setIsCatalogOpen((prev) => !prev);
              setIsOpen(false);
            }}
            aria-expanded={isCatalogOpen}
            aria-haspopup="menu"
          >
            Каталог
            <span
              className={`${css.catalogArrow} ${
                isCatalogOpen ? css.catalogArrowOpen : ""
              }`}
            >
              ▾
            </span>
          </button>

          {isCatalogOpen && (
            <div className={css.catalogDropdown}>
              <Link
                href="/catalog"
                className={css.catalogItem}
                onClick={closeCatalog}
              >
                Всі сукні
              </Link>

              <Link
                href="/catalog?category=wedding"
                className={css.catalogItem}
                onClick={closeCatalog}
              >
                Весільні
              </Link>

              <Link
                href="/catalog?category=evening"
                className={css.catalogItem}
                onClick={closeCatalog}
              >
                Вечірні
              </Link>

              <Link
                href="/catalog?category=cocktail"
                className={css.catalogItem}
                onClick={closeCatalog}
              >
                Коктейльні
              </Link>

              <Link
                href="/catalog?category=holiday"
                className={css.catalogItem}
                onClick={closeCatalog}
              >
                Святкові
              </Link>

              <Link
                href="/catalog?category=graduation"
                className={css.catalogItem}
                onClick={closeCatalog}
              >
                Випускні
              </Link>

              <Link
                href="/catalog?category=kids"
                className={css.catalogItem}
                onClick={closeCatalog}
              >
                Дитячі
              </Link>
            </div>
          )}
        </div>

        <SearchBar />

        <Link href="/wishlist" className={css.cart} onClick={closeMenu}>
          ❤️
          {wishlistCount > 0 && (
            <span className={css.cartCount}>{wishlistCount}</span>
          )}
        </Link>

        <Link href="/cart" className={css.cart} onClick={closeMenu}>
          🛒
          {cartCount > 0 && <span className={css.cartCount}>{cartCount}</span>}
        </Link>
      </div>

      <div
        id="mobile-menu"
        className={`${css.mobileMenu} ${isOpen ? css.show : ""}`}
      >
        <nav className={css.mobileNav}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}

          <Link
            href="/catalog"
            className={css.mobileButton}
            onClick={closeMenu}
          >
            Переглянути сукні
          </Link>
        </nav>
      </div>
    </header>
  );
}
